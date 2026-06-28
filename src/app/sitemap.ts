import type { MetadataRoute } from "next";
import { SITE } from "@/config";
import { getAllPosts } from "@/lib/blog";

// Only public marketing/content routes are indexed. Published biodatas
// (/[slug]) are personal and noindex, so they are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00Z"),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/create`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts,
  ];
}
