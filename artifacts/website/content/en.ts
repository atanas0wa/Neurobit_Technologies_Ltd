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
    title: `${company.name} - Web, mobile and AI software development`,
    description:
      "Neurobit builds web platforms, mobile apps, and AI automations around real business needs. Work directly with the team from problem definition to launch.",
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
    cta: { label: "Discuss your project", href: "/#contact" },
  },

  hero: {
    headline: "Less manual work. More useful software for your business.",
    subline:
      "We build web platforms, mobile apps and AI automations shaped around the real work your team does. You talk directly to the people building the product - from pinning down the problem to launch.",
    primary: { label: "Discuss your project", href: "/#contact" },
  },

  problem: {
    lead: "You know what you need. The hard part is finding someone who understands the business behind it.",
    paragraphs: [
      "Sometimes the task is simple - the process around it isn't. Data gets copied between spreadsheets, inquiries are handled manually, and a product idea stays on paper because it's unclear where to start.",
      "You don't need to automate everything at once. We start with the problem taking the most time and work out which solution makes sense for your business.",
    ],
  },

  services: {
    title: "What we build",
    items: [
      {
        label: "Web development",
        body: "We build business websites and web platforms that help visitors find information, send inquiries, or place orders. Before development, we clarify the goals, required features, and integrations.",
      },
      {
        label: "Mobile apps",
        body: "We build mobile apps for tasks people need to handle on the go - such as booking appointments, accessing a customer account, or working in the field. We start by identifying the users and the actions the app should make easier.",
      },
      {
        label: "AI solutions",
        body: "We examine repetitive processes to identify where AI or automation could help - for example, categorizing inquiries, extracting data from documents, or preparing draft responses. We define where human oversight is needed and how to evaluate whether the solution is useful.",
      },
    ],
  },

  whyUs: {
    title: "Why work with us",
    points: [
      {
        title: "You talk to the people writing the code.",
        body: "You discuss the project with the people building it, and you can talk to them directly about decisions, priorities and changes.",
      },
      {
        title: "We'll tell you if it's not worth building.",
        body: "We start from the problem you want to solve and decide which features are needed now and which can wait, before you've paid for them.",
      },
      {
        title: "Code someone else can pick up.",
        body: "We aim for clean, secure, documented code that another team can understand, maintain and build on.",
      },
    ],
    // Hidden until the list has entries. Add real quotes only, e.g.
    // { quote: "…", name: "…", role: "…", company: "…" }
    testimonials: {
      label: "What clients say",
      items: [] as { quote: string; name: string; role: string; company: string }[],
    },
  },

  about: {
    title: "We solve problems instead of creating new ones.",
    paragraphs: [
      `Neurobit was founded in ${company.founded}.`,
      "We started Neurobit with a simple idea: good development begins with understanding the business, not with a list of features. That is why we first clarify what you want to achieve, then determine which solution makes sense.",
      "We take on fewer projects. We believe you should work directly with the people building your product and have code that can be understood and developed further over time.",
    ],
    code: {
      file: "how-we-work.ts",
      comments: ["Every project starts with a conversation.", "We ask why before anyone writes code."],
      label: "How we approach a project, written as code",
    },
  },

  approach: {
    title: "How we work",
    steps: [
      { title: "Discovery", body: "In a free first call, we clarify the problem, goals, users, and project constraints. This helps us define priorities and an appropriate scope for the solution, and you get an estimate." },
      { title: "Design", body: "We establish the visual direction and key screens so it's clear how the product will look and work before development moves forward." },
      { title: "Development", body: "We build the solution in stages and discuss progress and necessary changes, keeping the work aligned with the original goals." },
      { title: "Launch", body: "We prepare the product for use and check the agreed functionality before handover or publication, depending on the project." },
      { title: "Support", body: "We discuss fixes, updates, and future improvements based on the project's needs and agreed scope." },
    ],
  },

  options: {
    title: "Ways to work with us",
    items: [
      {
        title: "Website",
        body: "For businesses that need a clear online presence and an easy way for customers to find information, send inquiries, or place orders. We define the required pages, features, and integrations around the project's goals, with a fixed scope and fixed price.",
      },
      {
        title: "Product / MVP",
        body: "For teams with a new product idea that want to test their key assumptions with a first working version. We identify which features are essential for launch and which can wait for a later stage.",
      },
      {
        title: "AI automation",
        body: "For businesses looking to reduce repetitive manual work. We identify a specific process, assess whether automation is appropriate, and define where human oversight is needed. Then we measure the time saved.",
      },
    ],
    cta: { label: "Discuss your project", href: "/#contact" },
  },

  faq: {
    title: "Questions you might have",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on the scope. After a free first call, you get a written estimate: a fixed price when the scope is agreed, or clear price ranges when parts of it still need to be defined. No hidden costs.",
      },
      {
        question: "How long does it take?",
        answer:
          "It depends on the scope and the features you need, so we agree on the timeline together with the estimate. A company website usually takes a few weeks. An app or platform is built in stages, aiming for a first working version as early as possible.",
      },
      { question: "Who owns the code?", answer: "You do. Once the final payment is made, the code is entirely yours." },
      { question: "Can we sign an NDA?", answer: "Yes. We can sign an NDA before you share any details about the project." },
      {
        question: "Is my project too small?",
        answer: "No. We can start with one clearly defined problem or a first version, and we'll tell you honestly what's worth building first.",
      },
      {
        question: "What happens after launch?",
        answer: "It's up to you. We can stay on for fixes, updates and further development within an agreed scope, or hand the project over entirely to your team.",
      },
    ],
  },

  contact: {
    title: "Have an idea or a process that's slowing you down?",
    intro: "Tell us in a few sentences, and we'll reply within one business day with next steps.",
    details: [
      { label: "Email", value: company.email, href: `mailto:${company.email}` },
      { label: "Technical enquiries", value: company.devEmail, href: `mailto:${company.devEmail}` },
    ] as { label: string; value: string; href?: string }[],
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "optional",
      message: "What do you need?",
      messagePlaceholder:
        "Describe the problem, how you handle it today, and what you'd like to achieve. You don't need to know the technical details.",
      submit: "Send inquiry",
      submitMailto: "Open email app",
      sending: "Sending…",
      success:
        "Thank you! We've received your inquiry. We'll get back to you within one business day to discuss the next steps and arrange the free initial call.",
      mailto: "Your email app should open with the message filled in. If it doesn't, email us at",
      error: "Something went wrong. Please try again, or email us directly at",
      timeout:
        "We stopped waiting because the request took too long. Your enquiry may or may not have reached us, so please don't send it again straight away. Check your inbox for our reply, or email us directly at",
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
    tagline: "Web, mobile and AI software, built by the people you talk to.",
    columns: { company: "Company", contact: "Contact", legal: "Legal" },
    registration: `UIC ${company.registration}`,
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Cookie Policy", href: "/cookies/" },
    ],
    rights: "All rights reserved.",
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
