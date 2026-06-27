import { ImageResponse } from "next/og";
import { SITE } from "@/config";

export const alt = `${SITE.name} — Free Marriage Biodata Maker`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf6f2",
          backgroundImage:
            "radial-gradient(800px circle at 0% 0%, rgba(155,28,58,0.10), transparent 45%), radial-gradient(800px circle at 100% 100%, rgba(199,154,58,0.18), transparent 45%)",
          color: "#2a2025",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: "#9b1c3a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}>❤</div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#9b1c3a" }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: "72px", fontWeight: 800, lineHeight: 1.1, marginTop: "32px", maxWidth: "900px" }}>
          Create a beautiful marriage biodata in minutes
        </div>
        <div style={{ display: "flex", fontSize: "32px", color: "#7c7077", marginTop: "24px" }}>
          Free · 5 templates · PDF &amp; shareable link
        </div>
        <div style={{ display: "flex", marginTop: "40px", height: "6px", width: "160px", background: "#c79a3a", borderRadius: "3px" }} />
      </div>
    ),
    { ...size },
  );
}
