import type { Metadata } from "next";
import { Geist, Playfair_Display, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/config";
import "./globals.css";

// UI font for the builder interface.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Document fonts used inside the biodata templates.
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Free Marriage Biodata Maker`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "marriage biodata",
    "biodata maker",
    "biodata format",
    "marriage biodata format",
    "shaadi biodata",
    "rishta biodata",
    "free biodata maker",
    "biodata for marriage",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Free Marriage Biodata Maker`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Free Marriage Biodata Maker`,
    description: SITE.description,
  },
  // Set GOOGLE_SITE_VERIFICATION in the environment to verify the domain in
  // Google Search Console. Omitted entirely when the env var is absent.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
