/** Paths that must never be used as a biodata slug. */
export const reservedSlugs = new Set([
  "api",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "create",
  "new",
  "edit",
  "about",
  "privacy",
  "terms",
  "",
]);

/** Turn arbitrary text into a clean URL slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
