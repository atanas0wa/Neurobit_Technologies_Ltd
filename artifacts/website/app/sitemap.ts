import type { MetadataRoute } from "next";
import { company, localePath, locales } from "@/content/site";

export const dynamic = "force-static";

const pages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies/", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${company.url}${localePath(locale, path)}`,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${company.url}${localePath(l, path)}`])),
      },
    })),
  );
}
