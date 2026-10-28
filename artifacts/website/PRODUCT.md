# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site is the company website of Neurobit Technologies, a software development company. Its visitors are prospective clients deciding whether to start a conversation. Four audiences are confirmed, none ranked above the others:

- **Bulgarian SMEs** with manual processes: data copied between spreadsheets, inquiries handled by hand, work still on paper.
- **Startups and product teams** with an idea that needs a first working version (MVP) to test key assumptions.
- **International clients** outside Bulgaria hiring a Bulgarian team. English is the default language for this reason.
- **Larger companies** that need integrations, automation or AI built on top of existing systems.

The visitor's job is to judge whether Neurobit understands their business problem and can be trusted with it, then send an inquiry. Most are not technical, and the contact form says they don't need to know the technical details.

## Product Purpose

Neurobit builds web platforms and business websites, mobile apps, and AI solutions or automations around how a client's team actually works. The site exists to turn a visitor with a problem into an inquiry, which leads to a free first call and a written estimate.

Success means qualified inquiries through the contact form or email (office@neurobit.bg, developers@neurobit.bg). The site promises a reply within one business day.

## Positioning

- **Direct access.** Clients talk to the people who build the product, from defining the problem to launch. The team is small: one core developer working with trusted partners when needed, so the claim is literal.
- **Problem first, features second.** Work starts from the problem that costs the client the most time. Neurobit says honestly when something isn't worth building and decides what can wait before the client pays for it.
- **Code someone else can pick up.** The code is clean, secure and documented, so another team can maintain it. The client owns the code once the final payment is made.
- **Few projects at a time,** by choice.

## Operating Context

The engagement flow, as the site states it:

1. **Discovery:** a free first call that ends with an estimate.
2. **Design:** visual direction and key screens.
3. **Development:** built in stages.
4. **Launch.**
5. **Support:** within an agreed scope, or full handover to the client's team.

Three ways to engage are offered:

- **Website:** fixed scope and fixed price.
- **Product / MVP.**
- **AI automation:** measured by the time it saves, with human oversight defined up front.

Estimates are written: a fixed price when the scope is agreed, or price ranges while parts are undefined. Neurobit will sign an NDA before the client shares any details.

## Capabilities and Constraints

- **Pages:** one long homepage plus a Privacy Policy and a Cookie Policy, in English (default, at `/`) and Bulgarian (at `/bg/`). Both languages must carry the same content. Copy lives in `content/en.ts` and `content/bg.ts`.
- **Hosting:** a static export (Next.js, `output: "export"`), so nothing runs on a server at request time. Security headers and redirects are set at the host, not in the Next.js config.
- **Contact form:** submissions go to Formspree. Without a Formspree ID, the form falls back to opening the visitor's email app. The form has a honeypot field and length limits.
- **Themes:** dark is the default; light is available through a toggle.
- **Company identity:**
  - Legal name: Нюробит Технолоджис ООД. In English it is Neurobit Technologies Ltd.
  - UIC: 208942173. Based in Sofia, Bulgaria. Founded in 2026.
  - The English pages use the English legal name. Search-engine metadata (JSON-LD) keeps the registered Bulgarian name.
- **GDPR:** the privacy policy names Neurobit as the data controller.

## Brand Commitments

- **Name:** Neurobit Technologies, with a neuron and network motif in the logo and site graphics.
- **Voice:**
  - Plain, direct and honest.
  - No hype, no claims about results nobody has measured.
  - Speaks to business owners about their problem rather than about technology.
  - Uses "we" and "you", for example "We'll tell you if it's not worth building."

## Evidence on Hand

- **No client work yet.** Neurobit was founded in 2026 and has no published case studies, client logos, testimonials, metrics or press. Never invent any.
- **First app in progress.** Neurobit is building its first app. When it is finished, it can be added to the site as the first real project. Its name, client and details are not yet recorded here.
- **Testimonials block is ready but hidden.** The site has a block in `content/*.ts` (`whyUs.testimonials`) that stays hidden until real quotes are added.

## Product Principles

1. **Honesty over persuasion.** Every claim on the site must be true today. Wherever proof is missing, the site's honesty has to carry the trust.
2. **The problem leads.** Content and flows start from the visitor's business problem, not from technology or service lists.
3. **Direct and personal.** The site should feel like talking to the people who will do the work, not to an agency.
4. **Bilingual parity.** Bulgarian and English are equal citizens. Neither is a partial translation of the other.
5. **One clear next step.** Every path leads to a low-commitment inquiry: a free call and a written estimate.

## Accessibility & Inclusion

The site already targets WCAG AA:

- Text contrast is checked against both themes.
- There is a skip link.
- Animations have a reduced-motion fallback.
- Every element shows a visible keyboard focus ring.
- `<html lang>` is set correctly for each language.

Keep these in place.
