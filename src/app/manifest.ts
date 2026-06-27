import type { MetadataRoute } from "next";
import { SITE } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Free Marriage Biodata Maker`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6f2",
    theme_color: "#9b1c3a",
    icons: [{ src: "/favicon.ico", sizes: "any" }],
  };
}
