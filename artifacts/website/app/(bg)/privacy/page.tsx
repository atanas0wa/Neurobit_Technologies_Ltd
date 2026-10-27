import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates, siteMetadata } from "@/components/SiteLayout";
import { company, localePath, site } from "@/content/site";

const { privacy } = site("bg");
const base = siteMetadata("bg");
// Child metadata replaces nested objects wholesale, so keep the shared Open Graph and Twitter fields.
const socialTitle = `${privacy.title} — ${company.name}`;

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: alternates("bg", "/privacy/"),
  openGraph: { ...base.openGraph, title: socialTitle, description: privacy.description, url: localePath("bg", "/privacy/") },
  twitter: { ...base.twitter, title: socialTitle, description: privacy.description },
};

export default function Page() {
  return <LegalPage locale="bg" page={privacy} />;
}
