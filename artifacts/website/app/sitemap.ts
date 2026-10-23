import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${company.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${company.url}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
