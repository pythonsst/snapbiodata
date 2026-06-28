/**
 * SEO helpers: JSON-LD structured data and the FAQ content.
 *
 * Structured data lets Google understand the site as a free web app and can
 * surface rich results (FAQ snippets, the "free" price badge, org name/logo).
 * The FAQ list below is the single source of truth: the same array drives both
 * the visible FAQ section on the landing page AND the FAQPage schema — Google
 * requires the answer text on the page to match the structured data.
 */
import type { SITE as Site } from "@/config";

type SiteConfig = typeof Site;

export type Faq = { q: string; a: string };

/** Visible on the landing page and mirrored into FAQPage JSON-LD. */
export const faqs: Faq[] = [
  {
    q: "What is a marriage biodata?",
    a: "A marriage biodata (also called a shaadi or rishta biodata) is a one-page profile that introduces a prospective bride or groom. It typically lists personal details, education and profession, family background, and contact information, and is shared with potential matches and their families.",
  },
  {
    q: "How do I create a marriage biodata online for free?",
    a: "Open SnapBiodata, pick one of the ready-made templates, fill in your personal, family and contact details in the form, and add a photo. You'll see a live preview as you type. When you're done, download a print-ready PDF or share a private link — no sign-up and no payment required.",
  },
  {
    q: "Is SnapBiodata really free?",
    a: "Yes. SnapBiodata is 100% free and open source under the MIT license. There is no sign-up, no paywall, no watermark and no ads. You can also self-host it or contribute on GitHub.",
  },
  {
    q: "What details should a marriage biodata include?",
    a: "A good marriage biodata usually includes your full name, date and place of birth, height, religion and community, education and profession, and a short family introduction (parents' names and occupations, siblings), along with contact details. SnapBiodata's form guides you through each of these sections.",
  },
  {
    q: "Can I download my biodata as a PDF or print it?",
    a: "Yes. Every template is A4 print-ready. With one click you can export a crisp PDF that looks identical on every device, then print it or send it on WhatsApp.",
  },
  {
    q: "Is my personal information kept private?",
    a: "Your details stay in your browser and are never uploaded until you explicitly choose to publish a shareable link. The PDF is generated entirely on your device. Published profiles are not indexed by search engines.",
  },
];

/** Strip a trailing slash so we can safely build absolute URLs. */
function origin(site: SiteConfig): string {
  return site.url.replace(/\/$/, "");
}

/**
 * The full structured-data graph for the home page. Returned as a plain object
 * so it can be unit-tested and JSON.stringify'd into a <script> tag.
 */
export function homeJsonLd(site: SiteConfig, faqList: Faq[] = faqs) {
  const base = origin(site);
  const orgId = `${base}/#organization`;
  const siteId = `${base}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: `${base}/`,
        logo: `${base}/icon.svg`,
        sameAs: [site.github],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${base}/`,
        name: site.name,
        description: site.description,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebApplication",
        name: `${site.name} — Free Marriage Biodata Maker`,
        url: `${base}/`,
        description: site.description,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript.",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqList.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
