import type { MetadataRoute } from "next";
import { SITE } from "@/config";

// Only public marketing routes are indexed. Published biodatas (/[slug]) are
// personal and noindex, so they are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/create`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
