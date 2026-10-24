import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates } from "@/components/SiteLayout";
import { site } from "@/content/site";

const { privacy } = site("en");

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: alternates("en", "/privacy/"),
};

export default function Page() {
  return <LegalPage locale="en" page={privacy} />;
}
