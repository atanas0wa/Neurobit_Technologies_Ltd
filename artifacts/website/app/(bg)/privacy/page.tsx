import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates } from "@/components/SiteLayout";
import { site } from "@/content/site";

const { privacy } = site("bg");

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: alternates("bg", "/privacy/"),
};

export default function Page() {
  return <LegalPage locale="bg" page={privacy} />;
}
