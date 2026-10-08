import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}, ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Immagine Open Graph tipografica. Sostituibile con una foto: aggiungi opengraph-image.jpg in src/app/. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#141412",
        color: "#f3eee5",
        padding: "72px 80px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 4,
          color: "#a8a296",
          fontFamily: "sans-serif",
        }}
      >
        FOTOGRAFIA · VIDEO · STORYTELLING — MILANO
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1 }}>
        <span>Non scatto soltanto.</span>
        <span style={{ fontStyle: "italic", color: "#e9e2d5" }}>Racconto storie.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
        <span style={{ width: 10, height: 10, borderRadius: 10, background: "#e2875c" }} />
        {site.name}
      </div>
    </div>,
    size,
  );
}
