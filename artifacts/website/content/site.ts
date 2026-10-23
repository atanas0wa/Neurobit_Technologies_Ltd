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
