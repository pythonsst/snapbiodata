import type { Metadata } from "next";

// The create page is a client component, so it can't export metadata itself.
// This server-component layout gives the route its own title, description and
// canonical URL for search engines while leaving the page behaviour untouched.
export const metadata: Metadata = {
  title: "Create Your Marriage Biodata",
  description:
    "Build your marriage biodata online for free. Pick a template, fill in your details, add a photo, and download a print-ready PDF or share a private link — no sign-up.",
  alternates: { canonical: "/create" },
  openGraph: {
    type: "website",
    url: "/create",
    title: "Create Your Marriage Biodata — SnapBiodata",
    description:
      "Pick a template, fill in your details, and download a print-ready marriage biodata PDF for free.",
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
