/*
 * English copy. content/bg.ts mirrors this shape (typed as Content).
 * Site paths are written without the locale prefix ("/#contact");
 * components add it. Inline links in legal text use [text](url) with the
 * full localized path, and bold uses **text**.
 */
import { company } from "./company";
import type { IconName } from "@/components/Icon";

export const en = {
  meta: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: `${company.name} — Software development in Sofia`,
    description: "We turn your idea or your slowest manual process into a working product, with a small senior team you talk to directly from day one to launch.",
    skip: "Skip to content",
  },

  ui: {
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: { short: "BG", label: "Български", aria: "Превключи на български" },
    home: `${company.name} home`,
  },

  nav: {
    links: [
      { label: "Services", href: "/#services" },
      { label: "Why us", href: "/#why-us" },
      { label: "About", href: "/#about" },
      { label: "How we work", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
    cta: { label: "Tell us about your project", href: "/#contact" },
  },

  hero: {
    headline: "Web, mobile and AI software for businesses that need it to actually work",
    subline:
      "We turn your idea or your slowest manual process into a working product, with a small senior team you talk to directly from day one to launch.",
    primary: { label: "Tell us about your project", href: "/#contact" },
    diagramTiers: ["Client", "Edge", "Services", "Data"],
  },

  problem: {
    lead: "You know what you need built. The hard part is finding someone who understands the business behind it.",
    paragraphs: [
      "Big agencies hand you to a junior team after the sales call. Freelancers disappear after launch. And you end up paying for features nobody uses.",
      "We started Neurobit to work differently: fewer projects, direct communication, and software built around how your business really runs.",
    ],
  },

  services: {
    label: "Services",
    title: "What we build",
    items: [
      {
        icon: "web",
        label: "Web development",
        body: "A website or platform that loads fast, takes payments securely and doesn't need rebuilding in a year.",
      },
      {
        icon: "mobile",
        label: "Mobile apps",
        body: "iOS and Android apps built around what your users actually do, not what looks good in a pitch deck.",
      },
      {
        icon: "ai",
        label: "AI solutions",
        body: "AI agents and automation that take repetitive work off your team, so people spend their time on what needs a human.",
      },
    ] as { icon: IconName; label: string; body: string }[],
  },

  whyUs: {
    label: "Why us",
    title: "Why work with us",
    points: [
      { icon: "people", title: "You work with the people who build it.", body: "No account managers in between." },
      {
        icon: "scope",
        title: "Honest scope.",
        body: "If something isn't worth building, we'll tell you before you pay for it.",
      },
      {
        icon: "shield",
        title: "Built to last.",
        body: "Clean, secure, documented code that your team or any developer can take over.",
      },
    ] as { icon: IconName; title: string; body: string }[],
    // Hidden until the list has entries. Add real quotes only, e.g.
    // { quote: "…", name: "…", role: "…", company: "…" }
    testimonials: {
      label: "What clients say",
      items: [] as { quote: string; name: string; role: string; company: string }[],
    },
  },

  about: {
    label: "About us",
    title: "About Neurobit",
    paragraphs: [
      `${company.name} was founded in Sofia in ${company.founded}.`,
      "We started it because we kept seeing the same thing: businesses paying for software that looked impressive but didn't fit how they actually work. The problem was rarely the technology. It was distance: between the client and the developers, and between the code and the business.",
      "So we keep that distance short. We take on fewer projects, you talk directly to the people building your product, and we ask “why” before we write a line of code.",
    ],
    location: {
      coordinates: ["42.6977° N", "23.3219° E"],
      place: "Sofia, Bulgaria",
      timezone: "CET · UTC+1 / +2",
      overlap: "Overlaps UK, EU, US East",
    },
  },

  approach: {
    label: "Process",
    title: "How we work",
    steps: [
      { title: "Discovery", body: "A free call to understand the problem. You get a clear scope and estimate." },
      { title: "Design", body: "You see and click through the product before development starts." },
      { title: "Development", body: "Short cycles with regular demos, so there are no surprises at the end." },
      { title: "Launch", body: "We deploy, test and hand over everything you own." },
      { title: "Support", body: "We stay on for fixes, updates and growth." },
    ],
  },

  options: {
    label: "Engagements",
    title: "Ways to work with us",
    items: [
      { title: "Website", body: "Company site or landing page with fixed scope and fixed price." },
      {
        title: "Product / MVP",
        body: "Web or mobile app built in stages, starting with the version that proves the idea.",
      },
      { title: "AI automation", body: "We pick one process, automate it and measure the time saved." },
    ],
    cta: { label: "Get an estimate", href: "/#contact" },
  },

  faq: {
    label: "FAQ",
    title: "Questions we hear often",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on scope. After the first call, you get a written estimate with a fixed price or clear ranges. No hidden costs.",
      },
      {
        question: "How long does it take?",
        answer:
          "A company website takes a few weeks; an app or platform is built in stages, with the first working version as early as possible.",
      },
      { question: "Who owns the code?", answer: "You do, fully, after final payment." },
      { question: "Can we sign an NDA?", answer: "Yes, before you share any details." },
      {
        question: "Is my project too small?",
        answer: "No. Many good products start small. We'll tell you honestly what's worth building first.",
      },
      {
        question: "What happens after launch?",
        answer: "We offer ongoing support, or a full handover to your team if you prefer.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Have an idea or a process that's slowing you down?",
    intro: "Tell us in a few sentences, and we'll reply within one business day with next steps.",
    details: [
      { label: "Email", value: company.email, href: `mailto:${company.email}` },
      { label: "Technical enquiries", value: company.devEmail, href: `mailto:${company.devEmail}` },
      { label: "Location", value: "Sofia, Bulgaria" },
    ] as { label: string; value: string; href?: string }[],
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "optional",
      message: "What do you need?",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you! We'll get back to you within one business day.",
      mailto: "Your email app should open with the message filled in. If it doesn't, email us at",
      error: "Something went wrong. Please try again, or email us directly at",
      subject: "New enquiry from the website",
      notice: {
        before: "By sending this form, you confirm you have read our",
        link: "Privacy Policy",
        after: ".",
      },
      processor: "Submissions are processed by Formspree.",
    },
  },

  footer: {
    tagline: "Web platforms, mobile apps and AI solutions for businesses that want to grow.",
    columns: { company: "Company", contact: "Contact", legal: "Legal" },
    registration: `UIC ${company.registration}`,
    location: "Sofia, Bulgaria",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Cookie Policy", href: "/cookies/" },
    ],
    rights: "All rights reserved.",
    signoff: "Made in Sofia",
  },

  legal: {
    draft: "Draft, review with a lawyer",
    updatedLabel: "Updated",
  },

  privacy: {
    title: "Privacy Policy",
    description: `How ${company.name} collects, uses and protects personal data under the GDPR.`,
    updated: "27 October 2026",
    intro: `This policy explains what personal data ${company.legalName} (${company.name}) collects through this website, why, and what rights you have under the EU General Data Protection Regulation (GDPR).`,
    sections: [
      {
        heading: "Who is responsible",
        paragraphs: [
          `The data controller is ${company.legalName}, UIC ${company.registration}, Sofia, Bulgaria.`,
          `For anything related to your personal data, email [${company.email}](mailto:${company.email}).`,
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "We collect as little as we can. This website uses no analytics, advertising or tracking cookies. See our [Cookie Policy](/en/cookies/).",
        ],
        list: [
          "**Contact form.** Your name, email address, company (if you give it) and the message you write. Formspree also records technical data with each submission, such as your IP address, browser type and the time of submission, to prevent spam.",
          "**Server logs.** When you visit the site, our hosting provider processes your IP address, the page requested, your browser's user agent and a timestamp. This is needed to deliver the site and protect it from abuse.",
          "**Email.** If you email us directly, we receive your email address and whatever you choose to include.",
        ],
      },
      {
        heading: "Why we use it, and on what legal basis",
        list: [
          "**To reply to your enquiry** and, if you ask, prepare a proposal: steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR). Where an enquiry is not about a contract, our legitimate interest in answering messages sent to us (Art. 6(1)(f) GDPR).",
          "**To run and secure the website** using server logs: our legitimate interest in operating a reliable, secure site (Art. 6(1)(f) GDPR).",
        ],
        after: ["We do not sell your data, use it for marketing without asking, or make automated decisions about you."],
      },
      {
        heading: "Who processes it for us",
        paragraphs: ["We use a small number of service providers, each bound by a data processing agreement:"],
        list: [
          "**Formspree, Inc. (United States)** receives contact form submissions and forwards them to our inbox. See [Formspree's privacy policy](https://formspree.io/legal/privacy-policy/).",
          "**Our hosting provider** serves this website and processes server logs.",
          "**Our business email provider** stores the messages we receive.",
        ],
        after: [
          "Some of these providers are based in the United States, so form submissions and server logs may be transferred outside the European Economic Area. Where this happens, the transfer relies on the safeguards the GDPR provides for, such as the European Commission's Standard Contractual Clauses or the EU–US Data Privacy Framework, as applicable to each provider.",
        ],
      },
      {
        heading: "How long we keep it",
        list: [
          "**Enquiries** are kept for up to 24 months after our last exchange, then deleted. If you become a client, we keep correspondence for as long as the contract and Bulgarian law require.",
          "**Form submissions in Formspree** are deleted from our Formspree account once they have reached our inbox.",
          "**Server logs** are kept by our hosting provider for a short period under its own retention rules.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `You have the right to access your personal data, have it corrected or erased, restrict or object to its processing, and receive it in a portable format. To exercise any of these rights, email [${company.email}](mailto:${company.email}). We reply within one month.`,
          "If you believe we have mishandled your data, you can complain to the Bulgarian Commission for Personal Data Protection, 2 Prof. Tsvetan Lazarov Blvd., 1592 Sofia, [www.cpdp.bg](https://www.cpdp.bg), or to the supervisory authority in your own EU country.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: ["If we change how we handle personal data, we will update this page and the date at the top."],
      },
    ] as LegalSection[],
  },

  cookies: {
    title: "Cookie Policy",
    description: `Which cookies and similar technologies the ${company.name} website uses.`,
    updated: "24 October 2026",
    intro: `This policy explains how the website of ${company.legalName} (${company.name}) uses cookies and similar technologies such as browser storage.`,
    sections: [
      {
        heading: "In short",
        paragraphs: [
          "This website sets no cookies. We use no analytics, advertising or social media trackers, and our fonts are served from our own domain, so no third party sees your visit through them.",
        ],
      },
      {
        heading: "What we store in your browser",
        list: [
          "**Theme preference** (theme, local storage). Remembers whether you chose the light or dark theme. It is set only when you use the theme switch, stays on your device, and is never sent to us.",
        ],
        after: [
          "Because this is strictly necessary to provide a feature you asked for, it does not require consent under the ePrivacy rules (Art. 4a of the Bulgarian Electronic Communications Act). You can delete it at any time by clearing your browser's site data.",
        ],
      },
      {
        heading: "Contact form",
        paragraphs: [
          "When you send the contact form, it goes to Formspree, which may process technical data to prevent spam. Formspree sets no cookies on this website. See our [Privacy Policy](/en/privacy/) for details.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          `If we start using cookies that need your consent, we will ask for it first and update this page. Questions: [${company.email}](mailto:${company.email}).`,
        ],
      },
    ] as LegalSection[],
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    back: "Back to the homepage",
  },
};

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };
export type Content = typeof en;
