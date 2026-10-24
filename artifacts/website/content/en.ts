/*
 * English copy. content/bg.ts mirrors this shape (typed as Content).
 * Site paths are written without the locale prefix ("/#contact");
 * components add it. Inline links in legal text use [text](url) with the
 * full localized path, and bold uses **text**.
 */
import { company } from "./company";

export const en = {
  meta: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: `${company.name} — Software development in Sofia`,
    description: `${company.name} is a Sofia-based development company building web platforms, mobile apps and AI solutions for businesses that want to grow.`,
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
      { label: "Process", href: "/#approach" },
      { label: "Stack", href: "/#stack" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
    cta: { label: "Start a project", href: "/#contact" },
  },

  hero: {
    status: "Software development · Sofia",
    headline: "Software that works for your business.",
    subline: `${company.name} is a Sofia-based development company building web platforms, mobile apps and AI solutions for businesses that want to grow.`,
    primary: { label: "Start a project", href: "/#contact" },
    secondary: { label: "See our services", href: "/#services" },
    facts: ["Web development", "Mobile apps", "AI solutions"],
    diagramTiers: ["Client", "Edge", "Services", "Data"],
  },

  services: {
    label: "Services",
    title: "Three things we do well.",
    intro: "We focus on web, mobile and AI, and go deep on each, so the software we build keeps up as your business grows.",
    items: [
      {
        label: "Web development",
        title: "Websites and platforms that stay fast.",
        body: "Fast, secure websites and web applications, from company sites to complex platforms with payments and user accounts.",
      },
      {
        label: "Mobile apps",
        title: "Apps built around your users.",
        body: "iOS and Android apps designed around how your users actually behave.",
      },
      {
        label: "AI solutions",
        title: "AI that takes work off your team.",
        body: "AI agents, process automation and intelligent assistants that save your team time and reduce manual work.",
      },
    ],
  },

  approach: {
    label: "Process",
    title: "Five steps. No surprises.",
    intro: "The same clear process for every project, so you always know what happens next.",
    steps: [
      {
        title: "Discovery",
        body: "We learn how your business works, who your users are and what success looks like. You get a clear scope and estimate before any code is written.",
      },
      {
        title: "Design",
        body: "We shape the user experience and the architecture, and agree them with you before development starts.",
      },
      {
        title: "Development",
        body: "We build in short cycles with a working version at the end of each, so you see real progress, not slide decks.",
      },
      {
        title: "Launch",
        body: "Testing, security checks and monitoring are in place before the first real user arrives.",
      },
      {
        title: "Support",
        body: "We stay with you after launch, with updates, fixes and new features as your business grows.",
      },
    ] as { title: string; body: string; duration?: string }[],
  },

  stack: {
    label: "Stack",
    title: "Proven tools, chosen per project.",
    intro: "We pick reliable, well-supported technology where it matters and newer tools where they earn their place.",
    groups: [
      { name: "Frontend", items: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS"] },
      { name: "Backend", items: ["Node.js", "Go", "Python", "GraphQL", "gRPC"] },
      { name: "Cloud", items: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Terraform"] },
      { name: "Data & AI", items: ["PostgreSQL", "Redis", "pgvector", "LLM APIs", "AI agents"] },
    ],
  },

  about: {
    label: "About us",
    title: "Software that solves real problems.",
    intro: `${company.name} was founded in ${company.founded} in Sofia with a simple goal: to build software that solves real business problems, not just software that looks good on paper. We work closely with our clients from the first idea to launch and beyond. We keep the process transparent, the communication direct, and the solutions built to scale.`,
    reasons: [
      { title: "Clarity first", body: "We understand your business before we write any code." },
      { title: "Built to last", body: "Clean, secure, maintainable technology." },
      { title: "Partnership", body: "We stay with you after launch." },
    ],
    location: {
      coordinates: ["42.6977° N", "23.3219° E"],
      place: "Sofia, Bulgaria",
      timezone: "CET · UTC+1 / +2",
      overlap: "Overlaps UK, EU, US East",
    },
  },

  contact: {
    label: "Contact",
    title: "Have a project in mind?",
    intro: "Tell us about it and we'll get back to you within one business day.",
    details: [
      { label: "Email", value: company.email, href: `mailto:${company.email}` },
      { label: "Technical enquiries", value: company.devEmail, href: `mailto:${company.devEmail}` },
      { label: "Location", value: "Sofia, Bulgaria" },
    ] as { label: string; value: string; href?: string }[],
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      messageHint: "What are you building, and by when?",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you! We'll get back to you within one business day.",
      mailto: "Your email app should open with the message filled in. If it doesn't, email us at",
      error: "Something went wrong. Please try again, or email us directly at",
      subject: "New enquiry from the website",
      consent: {
        before: "By sending this form you agree that we use your details to reply to your enquiry, as described in our",
        link: "Privacy Policy",
        after: ". Submissions are processed by Formspree.",
      },
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
    updated: "24 October 2026",
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
          "**Contact form.** Your name, email address and the message you write. Formspree also records technical data with each submission, such as your IP address, browser type and the time of submission, to prevent spam.",
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
