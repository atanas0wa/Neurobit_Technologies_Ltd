import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates, siteMetadata } from "@/components/SiteLayout";
import { company, localePath, site } from "@/content/site";

const { cookies } = site("en");
const base = siteMetadata("en");
// Child metadata replaces nested objects wholesale, so keep the shared Open Graph and Twitter fields.
const socialTitle = `${cookies.title} - ${company.name}`;

export const metadata: Metadata = {
  title: cookies.title,
  description: cookies.description,
  alternates: alternates("en", "/cookies/"),
  openGraph: { ...base.openGraph, title: socialTitle, description: cookies.description, url: localePath("en", "/cookies/") },
  twitter: { ...base.twitter, title: socialTitle, description: cookies.description },
};

export default function Page() {
  return <LegalPage locale="en" page={cookies} />;
}
