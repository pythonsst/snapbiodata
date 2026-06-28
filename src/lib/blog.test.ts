import { describe, it, expect } from "vitest";
import { posts } from "@/data/blog";
import {
  getAllPosts,
  getPost,
  readingMinutes,
  postUrl,
  articleJsonLd,
  blogListJsonLd,
} from "./blog";

const SITE = {
  name: "SnapBiodata",
  url: "https://snapbiodata.com",
  description: "Free marriage biodata maker.",
  github: "https://github.com/pythonsst/snapbiodata",
  contactEmail: "pythonsst@gmail.com",
};

describe("blog data integrity", () => {
  it("has unique slugs", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every post has a title, description, ISO date and body", () => {
    for (const p of posts) {
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.description.trim().length).toBeGreaterThan(0);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.body.trim().length).toBeGreaterThan(0);
      expect(p.keywords.length).toBeGreaterThan(0);
    }
  });

  it("only links internally to real routes", () => {
    const slugs = new Set(posts.map((p) => p.slug));
    const linkRe = /\]\((\/[^)]*)\)/g;
    for (const p of posts) {
      for (const m of p.body.matchAll(linkRe)) {
        const href = m[1];
        const ok =
          href === "/" ||
          href === "/create" ||
          href === "/blog" ||
          (href.startsWith("/blog/") && slugs.has(href.slice("/blog/".length)));
        expect(ok, `bad internal link ${href} in ${p.slug}`).toBe(true);
      }
    }
  });
});

describe("getAllPosts", () => {
  it("returns posts newest first", () => {
    const dates = getAllPosts().map((p) => p.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it("does not mutate the source array", () => {
    const before = posts.map((p) => p.slug);
    getAllPosts();
    expect(posts.map((p) => p.slug)).toEqual(before);
  });
});

describe("getPost", () => {
  it("finds a post by slug", () => {
    expect(getPost(posts[0].slug)?.slug).toBe(posts[0].slug);
  });
  it("returns undefined for unknown slugs", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });
});

describe("readingMinutes", () => {
  it("is at least 1 minute", () => {
    expect(readingMinutes("one two three")).toBe(1);
  });
  it("scales with word count", () => {
    const body = Array(400).fill("word").join(" ");
    expect(readingMinutes(body)).toBe(2);
  });
});

describe("articleJsonLd", () => {
  it("builds an Article + BreadcrumbList graph with absolute URLs", () => {
    const graph = articleJsonLd(SITE, posts[0])["@graph"] as Record<string, unknown>[];
    const article = graph.find((n) => n["@type"] === "Article")!;
    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList")!;
    expect(article.url).toBe(postUrl(SITE, posts[0].slug));
    expect(article.headline).toBe(posts[0].title);
    expect((crumbs.itemListElement as unknown[]).length).toBe(3);
  });
});

describe("blogListJsonLd", () => {
  it("lists every post", () => {
    const ld = blogListJsonLd(SITE);
    expect(ld["@type"]).toBe("Blog");
    expect((ld.blogPost as unknown[]).length).toBe(posts.length);
  });
});
