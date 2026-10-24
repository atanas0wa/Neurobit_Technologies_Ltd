/*
 * All site copy lives here. Replace the placeholder company details
 * (name, url, contacts, registration) before going live.
 */

export const company = {
  name: "Kodera Labs",
  legalName: "Kodera Labs Ltd.",
  url: "https://koderalabs.com",
  email: "hello@koderalabs.com",
  phone: "+359 2 000 0000",
  address: {
    street: "48 Tsarigradsko Shose Blvd.",
    city: "Sofia",
    postalCode: "1504",
    country: "Bulgaria",
    countryCode: "BG",
  },
  registration: "UIC 200000000",
  vat: "BG200000000",
  description:
    "Kodera Labs builds web platforms, mobile apps, payment integrations and AI automation for startups, SMEs and financial institutions. Senior engineers in Sofia, Bulgaria.",
};

export const nav = {
  links: [
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "Stack", href: "/#stack" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "Start a project", href: "/#contact" },
};

export const hero = {
  status: "Booking projects from January 2027",
  headline: "We build software that holds up.",
  subline:
    "Web platforms, mobile apps and payment integrations for startups, SMEs and financial institutions. Senior engineers, clear scope, code you own.",
  primary: { label: "Start a project", href: "/#contact" },
  secondary: { label: "See what we build", href: "/#services" },
  facts: ["Senior-only teams", "Fixed scope or dedicated", "EU-based, GDPR-native"],
  diagramTiers: ["Client", "Edge", "Services", "Data"],
};

export const services = {
  label: "Services",
  title: "Six things we do well.",
  intro: "We take on fewer projects and go deeper on each. Every engagement is led by an engineer who writes code.",
  items: [
    {
      label: "Web platforms",
      title: "Portals, tools and SaaS that stay fast.",
      body: "Customer portals, internal tools and SaaS products. Typed end to end, tested, and fast on a mid-range phone.",
    },
    {
      label: "Mobile apps",
      title: "One codebase, two native apps.",
      body: "iOS and Android from one React Native codebase, with native modules where it matters. Offline-first when the network isn't there.",
    },
    {
      label: "Fintech & payments",
      title: "Money moves correctly, or not at all.",
      body: "Card acquiring, open banking (PSD2), SEPA and reconciliation. Integrations built to pass a bank's security review.",
    },
    {
      label: "AI automation",
      title: "Automation you can measure.",
      body: "Document extraction, support triage and internal assistants. Measured against a baseline before launch, with a human in the loop where errors cost money.",
    },
    {
      label: "Dedicated teams",
      title: "Senior engineers inside your team.",
      body: "Senior engineers who join your stand-ups and your repository. Monthly terms, two-week trial, no lock-in.",
    },
    {
      label: "Audits & rescue",
      title: "A second opinion, in writing.",
      body: "Code and architecture review for systems that have outgrown their first version. Written findings and a plan in two weeks.",
    },
  ],
};

export const approach = {
  label: "Approach",
  title: "Four steps. No surprises.",
  intro: "The same process for a two-month build and a two-year platform. You always know what ships next and what it costs.",
  steps: [
    {
      title: "Discover",
      body: "We map the problem, the users and the constraints. You get a written scope, an architecture sketch and a fixed estimate.",
      duration: "1–2 weeks",
    },
    {
      title: "Build",
      body: "Two-week cycles with a working build at the end of each. You follow progress in staging, not in slide decks.",
      duration: "6–16 weeks",
    },
    {
      title: "Launch",
      body: "Load tests, a security review, monitoring and a rollback plan, all in place before the first real user.",
      duration: "1–2 weeks",
    },
    {
      title: "Support",
      body: "We stay on call. Agreed response times, patching, and a roadmap for what comes next.",
      duration: "Ongoing",
    },
  ],
};

export const stack = {
  label: "Stack",
  title: "Proven tools, chosen per project.",
  intro: "We pick boring technology where reliability matters and newer tools where they earn their place. Everything here runs in production for our clients today.",
  groups: [
    { name: "Frontend", items: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "Go", "Python", "GraphQL", "gRPC"] },
    { name: "Cloud", items: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Terraform"] },
    { name: "Data", items: ["PostgreSQL", "Redis", "Kafka", "ClickHouse", "pgvector"] },
  ],
};

export const about = {
  label: "About",
  title: "A small, senior team in Sofia.",
  intro:
    "Kodera Labs was founded by engineers who spent a decade building banking and e-commerce systems. We stay small on purpose: every project is led by someone who writes code.",
  reasons: [
    {
      title: "Senior by default",
      body: "Every engineer has shipped production systems for six years or more. No one learns on your budget.",
    },
    {
      title: "Plain contracts",
      body: "Fixed scope or monthly. You own the code, the repositories and the cloud accounts from day one.",
    },
    {
      title: "EU time, EU law",
      body: "We work on Central European Time with overlap for the UK and US East. Your data stays in the EU unless you decide otherwise.",
    },
  ],
  location: {
    coordinates: ["42.6977° N", "23.3219° E"],
    place: "Sofia, Bulgaria",
    timezone: "CET · UTC+1 / +2",
    overlap: "Overlaps UK, EU, US East",
  },
};

export const contact = {
  label: "Contact",
  title: "Tell us what you're building.",
  intro: "A few sentences are enough. An engineer, not a salesperson, replies within one working day.",
  details: [
    { label: "Email", value: company.email, href: `mailto:${company.email}` },
    { label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    {
      label: "Office",
      value: `${company.address.street}, ${company.address.postalCode} ${company.address.city}, ${company.address.country}`,
    },
  ],
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    messageHint: "What are you building, and by when?",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks — your message is in. We'll reply within one working day.",
    mailto: "Your email app should open with the message filled in. If it doesn't, email us at",
    error: "Something went wrong. Please try again, or email us directly at",
    subject: "New enquiry from the website",
    consent: {
      before: "By sending this form you agree that we use your details to reply to your enquiry, as described in our",
      link: "Privacy Policy",
      after: ". Submissions are processed by Formspree.",
    },
  },
};

export const footer = {
  tagline: "Software engineering for startups, SMEs and financial institutions.",
  columns: {
    company: "Company",
    contact: "Contact",
    legal: "Legal",
  },
  legalLinks: [{ label: "Privacy Policy", href: "/privacy/" }],
  signoff: "Made in Sofia",
};

/*
 * Privacy policy. Inline links use [text](url). Have this reviewed by
 * counsel before launch — see the README checklist.
 */
export const privacy = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal data under the GDPR.`,
  updated: "23 October 2026",
  intro: `This policy explains what personal data ${company.legalName} collects through this website, why, and what rights you have under the EU General Data Protection Regulation (GDPR).`,
  sections: [
    {
      heading: "Who is responsible",
      paragraphs: [
        `The data controller is ${company.legalName}, ${company.address.street}, ${company.address.postalCode} ${company.address.city}, ${company.address.country}, ${company.registration}.`,
        `For anything related to your personal data, email [${company.email}](mailto:${company.email}).`,
      ],
    },
    {
      heading: "What we collect",
      paragraphs: ["We collect as little as we can. This website uses no cookies, no analytics and no advertising trackers."],
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
      paragraphs: [
        "We use a small number of service providers, each bound by a data processing agreement:",
      ],
      list: [
        "**Formspree, Inc. (United States)** receives contact form submissions and forwards them to our inbox. See [Formspree's privacy policy](https://formspree.io/legal/privacy-policy/).",
        "**Vercel Inc. (United States)** hosts this website and processes server logs. See [Vercel's privacy notice](https://vercel.com/legal/privacy-notice).",
        "**Our business email provider** stores the messages we receive.",
      ],
      after: [
        "Formspree and Vercel are based in the United States, so form submissions and server logs may be transferred outside the European Economic Area. Where this happens, the transfer relies on the safeguards the GDPR provides for, such as the European Commission's Standard Contractual Clauses or the EU–US Data Privacy Framework, as applicable to each provider.",
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
  ],
};
