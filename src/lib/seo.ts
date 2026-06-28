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

/**
 * Visible on the landing page and mirrored into FAQPage JSON-LD.
 *
 * Each question is phrased the way people actually search ("how do I make a
 * biodata for marriage", "biodata format", "biodata with photo") and each
 * answer is accurate to what SnapBiodata actually does — no overclaiming.
 */
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
    q: "What is the best format for a marriage biodata?",
    a: "A clean, one-page A4 layout is best: a respectful header, a clear name, then short labelled sections for personal details, education and career, family, and contact. SnapBiodata gives you five ready-made formats — Traditional, Elegant, Modern, Floral and Royal — that all follow this proven structure, so you don't have to design one from scratch.",
  },
  {
    q: "What details should a marriage biodata include?",
    a: "A good marriage biodata usually includes your full name, date and place of birth, height, religion and community, education and profession, and a short family introduction (parents' names and occupations, siblings), along with contact details. SnapBiodata's form guides you through each of these sections.",
  },
  {
    q: "Can I add a photo to my marriage biodata?",
    a: "Yes. You can upload a photo and it's positioned to look great on every template. The image stays on your device and is embedded directly in your downloaded PDF.",
  },
  {
    q: "Can I download my biodata as a PDF or print it?",
    a: "Yes. Every template is A4 print-ready. With one click you can export a crisp PDF that looks identical on every device, then print it or send it on WhatsApp.",
  },
  {
    q: "Can I make a biodata for both a bride and a groom?",
    a: "Yes. SnapBiodata works equally well for a bride or a groom — the form fields and templates are the same. Just fill in your own details and pick the design you like.",
  },
  {
    q: "How is a marriage biodata different from a resume?",
    a: "A resume focuses on your career for a job application, while a marriage biodata introduces you as a person for matchmaking — covering family, community, values and lifestyle alongside education and profession. SnapBiodata's templates are designed specifically for marriage, not for jobs.",
  },
  {
    q: "How many pages should a marriage biodata be?",
    a: "One page is ideal and most common. SnapBiodata lays your details out on A4 and automatically flows onto a second page only if you add a lot of content, so it always stays neat and readable.",
  },
  {
    q: "Can I edit my biodata and switch templates later?",
    a: "Yes. You can keep editing your details and switch between templates at any time before you download — your information carries over instantly between designs, so you can compare looks without retyping anything.",
  },
  {
    q: "Do I need to sign up or create an account?",
    a: "No. There's no sign-up, login or app to install. Just open the site, build your biodata, and download or share it.",
  },
  {
    q: "Can I share my biodata on WhatsApp?",
    a: "Yes. You can publish a clean shareable link (like snapbiodata.com/your-name) to send on WhatsApp, or download the PDF and share the file directly.",
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
