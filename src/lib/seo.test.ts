import { describe, it, expect } from "vitest";
import { faqs, homeJsonLd } from "./seo";

const SITE = {
  name: "SnapBiodata",
  url: "https://snapbiodata.com",
  description: "Create a beautiful marriage biodata in minutes.",
  github: "https://github.com/pythonsst/snapbiodata",
  contactEmail: "pythonsst@gmail.com",
};

describe("faqs", () => {
  it("has questions and non-empty answers", () => {
    expect(faqs.length).toBeGreaterThan(0);
    for (const f of faqs) {
      expect(f.q.trim().length).toBeGreaterThan(0);
      expect(f.a.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("homeJsonLd", () => {
  const graph = homeJsonLd(SITE)["@graph"] as Record<string, unknown>[];
  const byType = (t: string) => graph.find((n) => n["@type"] === t);

  it("declares the schema.org context", () => {
    expect(homeJsonLd(SITE)["@context"]).toBe("https://schema.org");
  });

  it("includes Organization, WebSite, WebApplication and FAQPage nodes", () => {
    expect(byType("Organization")).toBeTruthy();
    expect(byType("WebSite")).toBeTruthy();
    expect(byType("WebApplication")).toBeTruthy();
    expect(byType("FAQPage")).toBeTruthy();
  });

  it("marks the app as free", () => {
    const app = byType("WebApplication")!;
    expect(app.isAccessibleForFree).toBe(true);
    expect((app.offers as { price: string }).price).toBe("0");
  });

  it("links WebApplication to the Organization by @id", () => {
    const org = byType("Organization")!;
    const app = byType("WebApplication")!;
    expect((app.publisher as { "@id": string })["@id"]).toBe(org["@id"]);
  });

  it("builds absolute URLs without a double slash", () => {
    const trailing = homeJsonLd({ ...SITE, url: "https://snapbiodata.com/" });
    const org = (trailing["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "Organization",
    )!;
    expect(org.logo).toBe("https://snapbiodata.com/icon.svg");
  });

  it("mirrors every FAQ into the FAQPage schema", () => {
    const faqPage = byType("FAQPage")!;
    expect((faqPage.mainEntity as unknown[]).length).toBe(faqs.length);
  });
});
