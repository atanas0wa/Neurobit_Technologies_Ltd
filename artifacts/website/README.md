# Neurobit Technologies website

Company site for Нюробит Технолоджис ООД (Neurobit Technologies), a software development company. One long homepage plus Privacy and Cookie Policy pages, in English (default, at `/`) and Bulgarian (at `/bg/`). Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4.

## Structure

```
artifacts/website/
├── app/
│   ├── globals.css           Design tokens (@theme), light theme, base styles
│   ├── (en)/                 English root layout: /, /privacy/, /cookies/
│   ├── (bg)/bg/              Bulgarian root layout: /bg/, /bg/privacy/, /bg/cookies/
│   ├── global-not-found.tsx  404 page (needed because there are two root layouts)
│   ├── opengraph-image.tsx   1200×630 OG image (English), rendered at build time
│   ├── icon.svg              Favicon
│   ├── sitemap.ts            /sitemap.xml with hreflang alternates
│   └── robots.ts             /robots.txt
├── components/
│   ├── SiteLayout.tsx        Shared <html>: fonts, metadata, JSON-LD, nav + footer
│   ├── HomePage.tsx          Homepage section order
│   ├── Nav.tsx               Transparent → blurred on scroll; language and theme switches; mobile menu
│   ├── Hero.tsx              Type-led headline, subline, CTA
│   ├── HeroNetwork.tsx       Neuron network beside the hero headline (client component)
│   ├── NeuronBackground.tsx  Site-wide drifting neuron field behind every page (client component)
│   ├── Problem.tsx           Centered problem statement
│   ├── Services.tsx          Three services as editorial rows
│   ├── ServiceArt.tsx        Animated line illustration for each service (client component)
│   ├── WhyUs.tsx             Three reasons; testimonials (hidden until content has entries)
│   ├── About.tsx             Company story beside a short code panel
│   ├── Approach.tsx          How we work: five steps whose dots light up as you scroll
│   ├── Options.tsx           Ways to work with us: three option cards + CTA
│   ├── Faq.tsx               <details> accordion, first item open
│   ├── Contact.tsx           Contact details + form
│   ├── ContactForm.tsx       Formspree form (client component)
│   ├── LegalPage.tsx         Privacy and Cookie Policy layout
│   ├── ThemeToggle.tsx       Light/dark switch
│   ├── Footer.tsx
│   ├── Section.tsx           Shared section layouts (headline → body)
│   ├── RichText.tsx          Renders [text](url) and **bold** from content
│   ├── Logo.tsx
│   └── ui.tsx                Button, arrow link, label, container
├── content/
│   ├── company.ts            Company name, legal name, ЕИК, emails, domain
│   ├── en.ts                 English copy (defines the Content type)
│   ├── bg.ts                 Bulgarian copy (same shape, type-checked against en.ts)
│   └── site.ts               Locales, site(locale), localePath(), switchPath()
├── lib/fonts.ts              TTF loader for the OG image
├── next.config.ts            output: "export"
└── vercel.json               Serves the OG image as image/png
```

## Setup

This package lives in a pnpm workspace. From the repository root:

```sh
pnpm install
cp artifacts/website/.env.example artifacts/website/.env.local   # then fill in the Formspree ID
pnpm --filter @workspace/website run dev        # http://localhost:3000 (or $PORT)
```

Other scripts:

| Command | What it does |
| --- | --- |
| `pnpm --filter @workspace/website run build` | Static export to `artifacts/website/out/` |
| `pnpm --filter @workspace/website run start` | Serve `out/` locally |
| `pnpm --filter @workspace/website run typecheck` | TypeScript check |

The build downloads Inter and JetBrains Mono from Google Fonts once and self-hosts them, so visitors make no requests to Google. If the build machine is offline, the OG image falls back to a default font.

## Run in Replit

The site is registered as a Replit artifact in `.replit-artifact/artifact.toml`, served at `/` on port 3000.

1. Click **Run**, or start the workflow **artifacts/website: web** from the Workflows pane.
2. Open the **Preview** tab. The site loads at the root of the dev URL (`https://<repl>.replit.dev/`).
3. To publish, use **Publish**. Replit runs `next build` and serves the static `out/` folder.

`next.config.ts` lists `**.replit.dev` in `allowedDevOrigins`, so hot reload works through Replit's preview proxy. To set the Formspree ID on Replit, add `NEXT_PUBLIC_FORMSPREE_ID` under **Secrets**.

## Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io) and send it to the inbox that should receive enquiries.
2. Copy the form ID, the part after `/f/` in the endpoint `https://formspree.io/f/abcdwxyz`.
3. Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local` for development and in Vercel → Project → Settings → Environment Variables for production.
4. In Formspree, restrict the form to your production domain.

Spam protection uses Formspree's `_gotcha` honeypot field, which is hidden off-screen. Formspree silently drops submissions where it's filled in. If the ID is missing (local dev, Replit preview), submitting opens the visitor's email app with the message filled in, addressed to `company.email`. If the request to Formspree fails, the form shows an error message that includes the email address.

## Editing content

Company details shared by both languages (name, legal name, ЕИК, emails, domain) are in `content/company.ts`. All copy is in `content/bg.ts` and `content/en.ts`, including the problem block, services, why us, process steps, ways to work, FAQ, contact details, footer text, and the privacy and cookie policies. Components only render it. `bg.ts` is typed as `Content`, the shape of `en.ts`, so a key missing from either file fails the typecheck.

Write site paths without the language prefix (`"/#contact"`, `"/privacy/"`); components add `/bg` for Bulgarian. Inline links inside legal text use `[text](url)` with the full path for that language, and bold uses `**text**`.

### Languages

Each language has its own root layout in a route group: `app/(bg)` and `app/(en)`. That gives every page the right `<html lang>`, and each page carries `hreflang` alternates for the other language. The BG/EN switch in the header points to the same page in the other language. To add a page, create it in both groups.

## Design tokens

`app/globals.css` holds the `@theme` tokens: colours, fonts, the type scale, 6px spacing, radii and container width. Under the `@theme` block, a `@layer base` rule makes headings fluid below desktop, so the display size scales from 104px down to about 52–56px on phones.

**Light and dark themes.** Dark is the default. The toggle at the right of the header (`components/ThemeToggle.tsx`) sets `<html data-theme="light">` and saves the choice in `localStorage`. An inline script in `app/layout.tsx` applies it before first paint. The light values live under `:root[data-theme="light"]` in `globals.css`, with the same token names, so components use `bg-void`, `text-snow` and so on in both themes. Use the `light:` variant only when something must differ beyond the tokens. Don't hard-code colours: SVGs use `fill-*`/`stroke-*` classes.

Rules the components follow:

- One filled (`bg-signal`) button per view. Every filled in-page button carries `data-primary-cta`, and the nav pill stays outlined while one is on screen.
- `slate` (#6B7280) is only for decorative marks such as the line numbers in the About code panel. It fails AA for readable text, so readable secondary text uses `mist`.
- Headlines use weight 400, never bold. No gradients or shadows.

## Deploy (Vercel)

1. Push the repository to GitHub, GitLab or Bitbucket and import it in Vercel.
2. Set **Root Directory** to `artifacts/website`. Vercel detects Next.js and the pnpm workspace. Leave the build and output settings at their defaults; `output: "export"` makes Vercel serve the static files.
3. Add the `NEXT_PUBLIC_FORMSPREE_ID` environment variable.
4. Add your domain, then set `company.url` in `content/company.ts` to the same origin. The canonical URLs, sitemap, robots.txt, OG image URLs and JSON-LD are all derived from it.

Any static host can serve `out/` as an alternative. If you use another host, make sure `/opengraph-image` is served with `Content-Type: image/png`. `vercel.json` does this on Vercel.

## Pre-launch checklist

- [ ] Confirm the company details in `content/company.ts`. The domain `neurobit.bg` is inferred from the email addresses.
- [x] Set `NEXT_PUBLIC_FORMSPREE_ID` for production builds (`[services.production.build.env]` in `.replit-artifact/artifact.toml`).
- [ ] Send a test submission from the production domain and confirm it arrives.
- [ ] Both legal pages are marked "Draft, review with a lawyer" (`legal.draft` in `content/*.ts`). Remove that label once they are approved.
- [ ] Have the privacy and cookie policies reviewed by counsel. In particular:
  - [ ] Name the hosting provider once it's settled. The policy currently says "our hosting provider".
  - [ ] Confirm the cookie policy's reliance on Art. 4a of the Electronic Communications Act for the theme preference in local storage.
  - [ ] Confirm the EU→US transfer mechanism (SCCs or the Data Privacy Framework) for Formspree and the hosting provider against their DPAs. The policy currently words this generally.
  - [ ] Confirm the retention commitments: 24 months for enquiries, and deleting Formspree submissions once they reach the inbox. Set up the process that makes them true.
  - [ ] Name the business email provider if counsel wants it named.
  - [ ] Confirm the supervisory authority link (www.cpdp.bg) and address.
- [ ] Update `privacy.updated` and `cookies.updated` in both languages whenever a policy changes.
- [ ] Run Lighthouse against the deployed URL. Pre-launch results with gzip were 96–100 on mobile and desktop. `--color-signal` is `#2E6AFF` so white button text clears AA (4.54:1).
