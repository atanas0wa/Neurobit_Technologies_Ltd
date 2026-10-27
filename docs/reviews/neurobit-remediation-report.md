# Neurobit remediation report (F01–F14)

This is my own verification of the fixes, not an independent review.

| | |
|---|---|
| Branch | `fix/neurobit-remediation` (from `feat/website`) |
| Baseline commit | `140ad32` Replace em dashes with hyphens in site text |
| Final verified code commit | `43d387f` ci: add GitHub Actions for builds, unit and end-to-end tests (F10) |
| Report commit | the commit that adds this file (documentation only, on top of `43d387f`) |
| Environment | Linux x64 (Replit workspace), Node 24.22.1, pnpm 10.26.1, Chromium 152 |
| Evidence | `docs/reviews/evidence/` |

Nothing was pushed, merged, deployed or published. No GitHub settings were changed. Form tests used synthetic data and intercepted every request to formspree.io; the real endpoint and inbox were never contacted.

## Summary

| ID | Finding | Status |
|---|---|---|
| F01 | Vulnerable body-parser | FIXED AND VERIFIED (runtime crash not reproduced locally, see below) |
| F02 | Contact form exposes data in URLs without JavaScript | FIXED AND VERIFIED |
| F03 | Focus escapes behind the mobile menu | FIXED AND VERIFIED |
| F04 | Edits made during submission are discarded | FIXED AND VERIFIED |
| F05 | A stalled submission leaves the form stuck | FIXED AND VERIFIED |
| F06 | Root build requires runtime preview variables | FIXED AND VERIFIED |
| F07 | Draft policies and unverified operational promises | BLOCKED (technical statements verified and guarded by tests) |
| F08 | SVG animation ignores reduced-motion changes | FIXED AND VERIFIED |
| F09 | Bulgarian privacy heading overflows | FIXED AND VERIFIED |
| F10 | Missing automated regression and review gates | PARTIALLY FIXED (workflow implemented and simulated locally; not yet run on GitHub; branch protection not enabled) |
| F11 | API helper attaches bearer tokens to arbitrary origins | FIXED AND VERIFIED (latent; no caller in the repo) |
| F12 | Zod advisory | FIXED AND VERIFIED (installed exposure; not reachable from current routes) |
| F13 | Platform-specific native dependency exclusions | PARTIALLY FIXED (fixed and verified on Linux; macOS/Windows only checked once CI runs) |
| F14 | Unpinned local static server | FIXED AND VERIFIED |

Extra item found during the audit: GHSA-6pq8-jhm2-2vcw (qs, published 2026-10-27 16:10 UTC, after the baseline audit). Fixed in `a5050ef`; not reachable (see "Dependency audit").

## Findings

### F01: Vulnerable API body parser — FIXED AND VERIFIED

- **Reproduction.** `pnpm audit --prod` on the baseline reported GHSA-27r3-jxmh-p828 for body-parser 2.3.0 (affected `>=2.0.0 <2.4.0`, patched `2.4.0`; `evidence/baseline-pnpm-audit-prod.txt`, advisory text in `evidence/F01-advisory-GHSA-27r3-jxmh-p828.txt`). I then tried to crash a local build of the API (child process on a random local port) with the advisory's payload: one valid gzip, deflate or brotli frame followed by trailing bytes, sent in one chunk and as a delayed second chunk. In all attempts the server answered 400 or 404 and stayed up. **The crash was not reproduced at runtime in this environment**; the vulnerable version was installed.
- **Implementation (`aec552f`).**
  - `pnpm-workspace.yaml:84` override `"body-parser@^2": "^2.4.0"`. The lockfile now resolves body-parser 2.4.0, which brings `qs` 6.16.1.
  - Defense in depth: `artifacts/api-server/src/app.ts:31-32` sets `inflate: false` on the JSON and urlencoded parsers, because no client sends compressed bodies. The API's only route is `GET /api/healthz`; it is a live Replit artifact (`artifacts/api-server/.replit-artifact/artifact.toml`), so it was kept.
  - `artifacts/api-server/test/api.test.mjs` adds node:test tests against the built server.
- **Verification.** `pnpm --filter @workspace/api-server run build && pnpm --filter @workspace/api-server test` → 5/5 pass: health 200 `{status:"ok"}`; well-formed JSON and form bodies parsed (unknown route answers 404, not 400); malformed JSON 400; gzip, deflate and brotli bodies 415; the advisory payload for all three encodings leaves the process running and healthy (`evidence/F01-api-tests.txt`). `pnpm why body-parser` → 2.4.0. Production audit afterwards: no known vulnerabilities.

### F02: Contact form exposes data in URLs without JavaScript — FIXED AND VERIFIED

- **Reproduction.** Playwright with JavaScript disabled: the form had no `method` or `action`, so submitting sent a GET to the current page with name, email, company and message in the query string (`evidence/website-e2e-before-fixes.txt`, `contact-native.spec.ts`).
- **Implementation (`219ac9f`).** In `artifacts/website/components/ContactForm.tsx:81-88` the form carries native attributes:
  - with a Formspree ID: `method="post" action="https://formspree.io/f/<id>"`;
  - without one: `method="post" enctype="text/plain" action="mailto:office@neurobit.bg?subject=…"`, an honest hand-off to the email app. The button already reads "Open email app" in that mode, and nothing claims the enquiry was sent.
  - JavaScript handling, the honeypot and `_subject` are unchanged.
- **Verification.** `pnpm --filter @workspace/website run test:e2e:build && pnpm --filter @workspace/website run test:e2e` (`evidence/F02-F04-F05-e2e-after.txt`):
  - JS off, configured: exactly one POST to the endpoint carrying every field, and no personal data in the page or request URL.
  - JS off, unconfigured: the form is `mailto` + POST, and the page URL stays clean.
  - JS on, both builds: the page URL stays clean, and the email mode shows no success message.
  - The Replit-equivalent production build has `form action="https://formspree.io/f/xdeegpdg"` (`evidence/final-static-export.txt`).

### F03: Focus escapes behind the mobile menu — FIXED AND VERIFIED

- **Reproduction.** At 390 px, opening the menu left focus on the toggle; Tab and Shift+Tab reached links in the covered page; Escape did not return focus; growing to desktop width left the overlay state behind (`evidence/website-e2e-before-fixes.txt`).
- **Implementation (`3deebbc`, `artifacts/website/components/Nav.tsx:73-103`).**
  - While open, every `body` child except the header gets `inert`, the root stops scrolling, and focus moves to the first menu item.
  - Escape closes the menu and focuses the toggle.
  - A route change, following a link, or the `min-width: 80rem` (xl) breakpoint closes the menu.
  - The effect cleanup always removes `inert` and restores `overflow`.
- **Verification.** `e2e/mobile-menu.spec.ts`, 12/12 on both builds (`evidence/F03-e2e-after.txt`):
  - focus moves into the menu;
  - 25 × Tab and 25 × Shift+Tab never reach covered content;
  - Escape restores focus to the toggle;
  - link navigation and resize to 1440 px leave no `inert`, no `overflow:hidden`, and the page focusable.

### F04: Edits made during submission are discarded — FIXED AND VERIFIED

- **Reproduction.** With a delayed mocked response, the fields stayed editable while sending, and success then reset the form.
- **Implementation (`219ac9f`).** `ContactForm.tsx:41` takes the `FormData` snapshot before anything else. `ContactForm.tsx:88` wraps the controls in `<fieldset disabled={status === "sending"}>`, so they are locked while sending. Disabled fields would be left out of a later `FormData`, which is why the snapshot comes first.
- **Verification.** `contact-submit.spec.ts` "F04": all four fields are disabled while sending; typing during the request does not change anything; the single request carries exactly the submitted values plus `_subject` and `_gotcha`; nothing typed during sending existed to be lost.

### F05: A stalled submission leaves the form stuck — FIXED AND VERIFIED

- **Reproduction.** A request that never answered left the form disabled indefinitely; two quick submissions sent two requests.
- **Implementation (`219ac9f`).**
  - `ContactForm.tsx:11` sets `SUBMIT_TIMEOUT_MS = 20_000`, enforced with an `AbortController`.
  - `:37` allows one request at a time.
  - A `useEffect` cleanup aborts the request on unmount.
  - `:72` adds a separate `timeout` status, with new localized copy (`content/en.ts:189`, `content/bg.ts:186`) saying the enquiry may or may not have arrived and asking the visitor not to resend straight away. There is no automatic retry.
  - HTTP errors and network failures keep the existing error message.
- **Verification.** `contact-submit.spec.ts`:
  - HTTP 500 and network abort: localized error, controls re-enabled, data kept.
  - A stalled request (Playwright clock, 25 s): timeout message, controls re-enabled, data kept, exactly one request even after another 60 s.
  - `requestSubmit()` twice: one request.
  - Navigating to /privacy/ while sending: no page errors.
  - Three consecutive runs passed. An earlier version of the timeout test was close to Playwright's 30 s limit because `runFor` fired every animation frame; it was changed to `fastForward`.

### F06: Root build requires runtime preview variables — FIXED AND VERIFIED

- **Reproduction.** `env -u PORT -u BASE_PATH pnpm run build` stopped in the mockup sandbox with "PORT environment variable is required" (`evidence/F06-before.txt`).
- **Implementation (`d6c0df8`, `artifacts/mockup-sandbox/vite.config.ts:10-30`).** The config is a function of the Vite command. PORT is validated only for `command === "serve"` (dev and preview), and `BASE_PATH` defaults to `/__mockup/`, the value `artifact.toml` sets.
- **Verification** (`evidence/F06-after.txt`):
  - `pnpm run typecheck` exit 0.
  - `env -u PORT -u BASE_PATH pnpm run build` exit 0, building the mockup sandbox, the website (12 pages) and the API.
  - Built assets use `/__mockup/assets/…`.
  - The website build on its own passes.
  - `PORT=8092 BASE_PATH=/__mockup pnpm --filter @workspace/mockup-sandbox run dev` serves `/__mockup/` with 200; without PORT the dev server still fails with the clear message.

### F07: Draft policies and unverified operational promises — BLOCKED

What could be verified was verified (`8225a2b`, `artifacts/website/e2e/privacy-claims.spec.ts`, `evidence/F07-privacy-claims-e2e.txt`):

- The six routes make no requests to other hosts while loading and scrolling (no analytics, ads, trackers or third-party fonts).
- No cookies are set.
- `localStorage` only ever holds `theme`.

These checks now fail if a change breaks those statements. The README checklist item for the Formspree ID was updated: the ID is set for production builds (`artifact.toml`), and the live test submission is still open.

The draft label was **not** removed, and no legal text was changed, because these statements have no supporting evidence in the repository:

| # | Statement (EN `content/en.ts`; BG counterpart in `content/bg.ts`) | Line | What the owner/counsel must confirm |
|---|---|---|---|
| 1 | "We use a small number of service providers, each bound by a data processing agreement" | 251 | That a signed DPA exists with Formspree, the hosting provider and the email provider. |
| 2 | "Our hosting provider serves this website and processes server logs" | 237, 254 | Which provider serves the production domain. The repo deploys to Replit, but `neurobit.bg` showed a JetHost placeholder page earlier in this project, and the README also documents Vercel. |
| 3 | "Our business email provider stores the messages we receive" | 255 | The provider's name, if counsel wants it named. |
| 4 | EU→US transfer "relies on … Standard Contractual Clauses or the EU–US Data Privacy Framework, as applicable" | 258 | The actual mechanism in each provider's DPA. |
| 5 | "Enquiries are kept for up to 24 months … then deleted" | 264 | That this retention period is real and someone carries it out. |
| 6 | "Form submissions in Formspree are deleted from our Formspree account once they have reached our inbox" | 265 | Whether Formspree is set to auto-delete or someone deletes manually; otherwise the sentence is untrue. |
| 7 | Server logs "kept … for a short period under its own retention rules" | 266 | The provider's actual log retention. |
| 8 | Cookie policy reliance on Art. 4a of the Electronic Communications Act for `theme` in local storage | 301 | Legal confirmation. |
| 9 | CPDP address and link | 273 | Counsel's confirmation. |

Proposed corrections, to apply only after confirmation:

- **Items 1, 4.** If DPAs are confirmed, name the mechanism per provider.
  - EN: "Formspree, Inc. (United States), under its Data Processing Addendum and [SCCs | the EU–US Data Privacy Framework]."
  - BG: „Formspree, Inc. (САЩ), съгласно Допълнението за обработване на данни и [стандартните договорни клаузи | Рамката за поверителност на данните ЕС–САЩ].“
- **Item 2.** Replace "our hosting provider" with the named host, e.g. "Replit, Inc. (United States)" / „Replit, Inc. (САЩ)“, only if that is the production host.
- **Item 6.** If there is no automatic deletion:
  - EN: "Form submissions are kept in our Formspree account until we delete them manually, at most [N] days after they reach our inbox."
  - BG: „Съобщенията се пазят в акаунта ни във Formspree, докато не ги изтрием ръчно, най-много [N] дни след като стигнат до пощата ни.“
- **Item 5.** Keep "24 months" only if a deletion routine exists; otherwise state the real period.
- After any change: update `privacy.updated` / `cookies.updated` in both languages, then remove `legal.draft` only after counsel approves.

### F08: SVG animation ignores reduced-motion changes — FIXED AND VERIFIED

- **Reproduction.** Turning reduced motion on while the page was open did not stop the animation, and the server-rendered HTML contained 6 SMIL elements (`<animate>`, `<animateMotion>`), which animate without JavaScript regardless of the preference (`evidence/website-e2e-before-fixes.txt`).
- **Implementation (`70582b1`, `artifacts/website/components/ServiceArt.tsx:21-53`).**
  - `motionAllowed` starts false, so the server render is still.
  - A `matchMedia` change listener (with cleanup) keeps it current.
  - The SMIL elements are rendered only when motion is allowed.
  - The observer effect runs only when allowed and its cleanup pauses SMIL and deletes `data-play`, which stops the CSS animations. Off-screen pausing is unchanged.
- **Verification.** `e2e/reduced-motion.spec.ts`, 8/8 (`evidence/F08-e2e-after.txt`):
  - reduced motion before load: no running SMIL or CSS animation;
  - preference switched on while open: everything stops;
  - JavaScript off with reduced motion: 0 SMIL elements and no CSS animation;
  - normal motion: plays on screen and pauses off screen.
  - The static HTML now has 0 SMIL elements.

### F09: Bulgarian privacy heading overflows — FIXED AND VERIFIED

- **Reproduction.** At 320 px, `/privacy/` was 331 px wide in both themes; with 200% text it was 550 px. All other routes and widths were fine.
- **Implementation (`01ef478`, `artifacts/website/components/LegalPage.tsx:25`).** Below 420 px the legal heading uses `clamp(2rem, 10.5vw, 2.75rem)` (33.6 px at 320 px instead of 44 px). It also has `overflow-wrap: break-word` as a safety net for enlarged text. Nothing is hidden or clipped.
- **Verification.** `e2e/layout.spec.ts`: all six routes at 320, 390, 768, 1280 and 1440 px in dark and light have document width ≤ viewport, and the four legal pages pass at 320 px with 200% text, with the heading not wider than its box (11/11, `evidence/F09-e2e-after.txt`).
- **Visual inspection.** At 320 px the heading sits cleanly on two lines in both themes. At 200% it wraps to four lines and breaks words mid-word ("Политик/а"): readable and not overflowing, but not pretty. That is the accepted trade-off at that size.

### F10: Missing automated regression and review gates — PARTIALLY FIXED

- **Implemented (`56b18d9`, `43d387f`).**
  - Playwright harness `artifacts/website/playwright.config.ts` and `scripts/build-e2e.sh`. They serve two static builds (fake Formspree ID / none); helpers block all external hosts and answer formspree.io in-test.
  - Specs in `artifacts/website/e2e/*.spec.ts`.
  - node:test suites for the API (`artifacts/api-server/test/`) and api-client (`lib/api-client-react/test/`).
  - Root `pnpm run test`.
- **Workflow `.github/workflows/ci.yml`.**
  - Settings: `permissions: contents: read`, `persist-credentials: false`, actions pinned by SHA (checkout v7.0.1, pnpm/action-setup v6.1.0, setup-node v7.1.0, upload-artifact v7.0.2), pnpm 10.26.1, Node 24.
  - **"Typecheck, build and unit tests"** runs the frozen install, `pnpm run build` without PORT/BASE_PATH, `pnpm run test`, and `pnpm audit --prod --audit-level high`.
  - **"Website end-to-end tests"** runs Playwright against both builds and uploads the report on failure.
  - **"Install and build (ubuntu-24.04 / macos-14 / windows-2022)"** runs the frozen install and the website, API and mockup builds.
- **Verified locally** (`evidence/F10-*`):
  - YAML parses, all actions are SHA-pinned, permissions are read-only.
  - Simulated checks job: build exit 0, 19/19 unit tests, audit clean.
  - Simulated e2e job: 43 passed, 21 skipped by design (each test targets one build), exit 0.
- **Not done.**
  - **CI run passed:** no. The workflow has not run on GitHub; nothing was pushed.
  - **Branch protection enabled:** no. Not changed, as instructed.

### F11: API helper attaches bearer tokens to arbitrary origins — FIXED AND VERIFIED

- **Reproduction.** `lib/api-client-react/test/custom-fetch.test.ts` (mocked `fetch`, synthetic token) against the original code: 6/14 pass. The token leaked to a different origin, a lookalike host, a different scheme, a different port, protocol-relative URLs without a base, and absolute URLs with neither a base URL nor a page origin (`evidence/F11-tests-before-fix.txt`).
- **Implementation (`a02f1d9`, `lib/api-client-react/src/custom-fetch.ts:82-104, 387`).** The token is attached automatically only when the request origin equals the trusted API origin: the `setBaseUrl` origin, else the page origin; plain relative paths if neither is known. Explicit `Authorization` headers pass through unchanged, and nothing outside this check attaches the token.
- **Verification.** `pnpm --filter @workspace/api-client-react test` → 14/14 (`evidence/F11-tests-after-fix.txt`). It covers:
  - trusted origin;
  - different origin;
  - lookalike;
  - userinfo URL (fetch refuses `Request` objects for such URLs; string and `URL` inputs get no token);
  - different scheme and port;
  - relative and protocol-relative paths;
  - string, `URL` and `Request` inputs;
  - no token getter.
- **Context.** This was a latent helper issue: nothing in the repository calls `setAuthTokenGetter` or imports `@workspace/api-client-react`. **It is not evidence of an existing production token leak.**

### F12: Zod advisory — FIXED AND VERIFIED

- **Reproduction.** The baseline audit reported GHSA-mrhx-c7xc-m3w5 (affected `<4.6.6`, patched `>=4.6.6`) on the path `lib/api-zod > zod` (3.25.76); Orval also carried zod 4.6.5.
- **Exposure vs reachability.**
  - **Installed:** yes.
  - **Reachable from current routes:** no. The only runtime schema, `HealthCheckResponse`, validates the fixed `{ status: "ok" }` object, with no collections. `lib/db` has no schemas yet.
- **Compatibility.** drizzle-zod 0.8.3 peers `zod ^3.25.0 || ^4.0.0`. Orval's zod output was pinned to v3 syntax and is now v4.
- **Implementation (`5145a38`).**
  - The catalog is `zod: ^4.6.6` (`pnpm-workspace.yaml:68`), with an override `"zod@^4": "^4.6.6"` (`:86`); the lockfile has only `zod@4.6.7`.
  - `lib/api-spec/orval.config.ts:62` uses `version: 4`.
  - `lib/api-zod` was regenerated with `pnpm --filter @workspace/api-spec run codegen` and Prettier. The schema is semantically unchanged; only the header comment differs.
  - No size limits were added, because no collection schemas exist. Add `.max()` limits when the first array or record schema for untrusted input appears.
- **Verification** (`evidence/F12-*`): workspace typecheck, API build, 5/5 API tests (the health route validates through the regenerated schema), and a production audit with no known vulnerabilities.
- **Separate drift (not changed).** The codegen run also regenerated the React Query client with newer Orval output (8.41 vs the committed 8.5.3 files: a `withQueryKey` helper and a different `options` type). That is unrelated to zod, so it was reverted and left for a separate change.

### F13: Platform-specific native dependency exclusions — PARTIALLY FIXED

- **Reproduction.** 79 overrides in `pnpm-workspace.yaml` mapped esbuild, lightningcss, Tailwind oxide, rollup and ngrok platform packages to `"-"`. The lockfile had no macOS, Windows or ARM binaries (`evidence/F13-before.txt`).
- **Implementation (`140559f`).** Only the 79 `"-"` entries and their comment were removed. The security overrides (esbuild `0.28.2`, `js-yaml`, `@esbuild-kit/esm-loader`, `proxy-addr`, `source-map-js`, `fast-uri`, `brace-expansion`) and `minimumReleaseAge` remain. The lockfile was regenerated with pnpm 10.26.1.
- **Verification on Linux** (`evidence/F13-after.txt`, `F13-linux-verify.txt`):
  - the lockfile now lists darwin, win32 and linux-arm64 variants;
  - this host installs only linux-x64;
  - `pnpm install --frozen-lockfile`, typecheck, and the website and API builds pass.
- **Not verified.** Windows and macOS are **not** claimed working from this Linux test. The "Install and build" CI matrix covers them once it runs.

### F14: Unpinned local static server — FIXED AND VERIFIED

- **Reproduction.** `start` ran `npx serve` with `serve` undeclared. It resolved here only from the npx cache filled by earlier ad-hoc runs; a clean machine would download the current version at runtime (`evidence/F14-before.txt`).
- **Implementation (`4230b87`).** `artifacts/website/package.json:24` declares devDependency `serve` 14.2.6 (published 2026-03-03), and `:8` runs the installed binary with `serve out -l ${PORT:-3000}`.
- **Verification.** `PORT=4401 npm_config_offline=true pnpm start` served `/` and `/en/` with 200 from the installed binary (`evidence/F14-after.txt`). A run without PORT moved to a free port because 3000 is held by the Replit dev server; that run's 200 on :3000 came from the dev server and is not counted.

## Dependency audit

- **Baseline:** 2 high (body-parser, zod).
- **Final:** `pnpm audit --prod` → no known vulnerabilities.
- **During the review**, GHSA-6pq8-jhm2-2vcw (qs ≤ 6.16.0, `qs.stringify` with `arrayFormat: 'comma'`, moderate) was published. Express 5.3.0 only calls `qs.parse` (`express/lib/utils.js:268`), so it was not reachable. qs is pinned to 6.16.1 anyway (`a5050ef`, `pnpm-workspace.yaml:88`).

## Final acceptance checks (on `43d387f`)

| Check | Command / method | Result |
|---|---|---|
| Typecheck | `pnpm run typecheck` | pass |
| Root build without PORT/BASE_PATH | `env -u PORT -u BASE_PATH pnpm run build` | pass |
| Unit tests | `pnpm run test` | 19/19 pass |
| End-to-end tests | `test:e2e:build` + `test:e2e` (local Chromium 152) | 43 passed, 21 skipped by design, 0 failed |
| Production audit | `pnpm audit --prod --audit-level high` | no known vulnerabilities |
| Replit-equivalent website build | env from `artifact.toml` + `pnpm run build` | 12 pages, all routes, 404, OG image, sitemap and robots present; canonical, `og:url` and 4 hreflang per page; form posts to `formspree.io/f/xdeegpdg` (`evidence/final-static-export.txt`) |
| Localized navigation, theme persistence | Playwright on the production build | BG↔EN switch, privacy page switch, light theme survives reload, all EN menu anchors resolve (`evidence/final-browser-checks.txt`) |
| Replit configuration | `git diff 140ad32..HEAD -- .replit '*/.replit-artifact/*' replit.md` | unchanged |
| Secrets and personal data | scan of added lines and evidence | none found; evidence uses synthetic data only |

Not run here: the GitHub Actions workflow itself, macOS and Windows installs, a live Formspree submission, and Replit's own publish pipeline.

## Owner actions outside the repository

1. **Push and run CI.** Push `fix/neurobit-remediation` and open a pull request into `feat/website`. Confirm the three workflow jobs pass, including the macOS and Windows matrix (this closes the remaining parts of F10 and F13).
2. **Branch protection** (GitHub → Settings → Rules → Rulesets, or Branches → branch protection) for `feat/website` (and `main` if used):
   - require a pull request before merging, with at least 1 approval, and dismiss stale approvals on new commits;
   - require status checks to pass, with the branch up to date, and select these exact check names:
     - `Typecheck, build and unit tests`
     - `Website end-to-end tests`
     - `Install and build (ubuntu-24.04)`
     - `Install and build (macos-14)`
     - `Install and build (windows-2022)`
   - block force pushes and deletions.
3. **Formspree.** After publishing, send one real test enquiry from the production domain. In Formspree, confirm the form is active and that reCAPTCHA and the allowed-domain settings accept AJAX posts from the site.
4. **Legal (F07).** Confirm items 1–9 in the F07 table with counsel, then apply the corrections in both languages, update the `updated` dates, and only then remove the draft label.
5. **Publishing.** Publish from Replit once the pull request is merged. Nothing in this branch is live yet.
