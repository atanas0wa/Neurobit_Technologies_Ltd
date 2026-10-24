import { SiteLayout, siteMetadata } from "@/components/SiteLayout";

export { viewport } from "@/components/SiteLayout";
export const metadata = siteMetadata("bg");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="bg">{children}</SiteLayout>;
}
