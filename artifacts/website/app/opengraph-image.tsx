import { ImageResponse } from "next/og";
import { company, site } from "@/content/site";
import { ogFonts } from "@/lib/fonts";

export const dynamic = "force-static";

// One image for both languages, in English: the OG fonts load the Latin subset only.
const { hero, services } = site("en");
export const alt = `${company.name} - ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same type-led layout as the hero: name, headline, then the services under a rule.
export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#05070A",
        padding: "72px 80px",
        fontFamily: "Inter",
      }}
    >
      <div style={{ fontSize: 28, color: "#F5F7FA" }}>{company.name}</div>
      <div style={{ maxWidth: 960, fontSize: 68, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#F5F7FA" }}>
        {hero.headline}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #1C2330", paddingTop: 28, fontSize: 24, color: "#A3ACB9" }}>
        {services.items.map((item) => item.label).join("  ·  ")}
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
