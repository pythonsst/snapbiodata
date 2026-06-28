/**
 * Blog helpers: lookups, reading time, and Article/Blog/Breadcrumb JSON-LD.
 *
 * Kept pure (no DOM, no Next imports) so it can be unit-tested and reused by
 * the index page, the post pages and the sitemap.
 */
import { posts, type BlogPost } from "@/data/blog";
import type { SITE as Site } from "@/config";

type SiteConfig = typeof Site;

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Rough reading time in minutes (~200 words/min, min 1). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function origin(site: SiteConfig): string {
  return site.url.replace(/\/$/, "");
}

export function postUrl(site: SiteConfig, slug: string): string {
  return `${origin(site)}/blog/${slug}`;
}

/** Article + breadcrumb graph for a single post page. */
export function articleJsonLd(site: SiteConfig, post: BlogPost) {
  const base = origin(site);
  const url = postUrl(site, post.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.keywords.join(", "),
        mainEntityOfPage: url,
        url,
        author: { "@type": "Organization", name: site.name, url: `${base}/` },
        publisher: {
          "@type": "Organization",
          name: site.name,
          logo: { "@type": "ImageObject", url: `${base}/icon.svg` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

/** Blog schema listing every post for the index page. */
export function blogListJsonLd(site: SiteConfig, list: BlogPost[] = getAllPosts()) {
  const base = origin(site);
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    url: `${base}/blog`,
    description:
      "Guides and tips on creating a marriage biodata — formats, samples, photos and more.",
    blogPost: list.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: postUrl(site, p.slug),
    })),
  };
}
