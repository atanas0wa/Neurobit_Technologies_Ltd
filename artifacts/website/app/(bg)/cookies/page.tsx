import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { alternates } from "@/components/SiteLayout";
import { site } from "@/content/site";

const { cookies } = site("bg");

export const metadata: Metadata = {
  title: cookies.title,
  description: cookies.description,
  alternates: alternates("bg", "/cookies/"),
};

export default function Page() {
  return <LegalPage locale="bg" page={cookies} />;
}
