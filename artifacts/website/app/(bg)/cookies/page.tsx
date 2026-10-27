import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates, siteMetadata } from "@/components/SiteLayout";
import { company, localePath, site } from "@/content/site";

const { cookies } = site("bg");
const base = siteMetadata("bg");
// Child metadata replaces nested objects wholesale, so keep the shared Open Graph and Twitter fields.
const socialTitle = `${cookies.title} — ${company.name}`;

export const metadata: Metadata = {
  title: cookies.title,
  description: cookies.description,
  alternates: alternates("bg", "/cookies/"),
  openGraph: { ...base.openGraph, title: socialTitle, description: cookies.description, url: localePath("bg", "/cookies/") },
  twitter: { ...base.twitter, title: socialTitle, description: cookies.description },
};

export default function Page() {
  return <LegalPage locale="bg" page={cookies} />;
}
