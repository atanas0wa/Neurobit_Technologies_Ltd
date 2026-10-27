import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates, siteMetadata } from "@/components/SiteLayout";
import { company, localePath, site } from "@/content/site";

const { privacy } = site("en");
const base = siteMetadata("en");
// Child metadata replaces nested objects wholesale, so keep the shared Open Graph and Twitter fields.
const socialTitle = `${privacy.title} - ${company.name}`;

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: alternates("en", "/privacy/"),
  openGraph: { ...base.openGraph, title: socialTitle, description: privacy.description, url: localePath("en", "/privacy/") },
  twitter: { ...base.twitter, title: socialTitle, description: privacy.description },
};

export default function Page() {
  return <LegalPage locale="en" page={privacy} />;
}
