import { ImageResponse } from "next/og";
import { company, site } from "@/content/site";
import { ogFonts } from "@/lib/fonts";

export const dynamic = "force-static";

// One image for both languages, in English: the OG fonts load the Latin subset only.
const { hero, services } = site("en");
export const alt = `${company.name} — ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A fixed slice of the hero network: [x, y, colour] nodes and links between them.
const nodes: [number, number, string][] = [
  [830, 170, "#22D3EE"],
  [960, 250, "#2E6AFF"],
  [1090, 170, "#3DDC97"],
  [830, 400, "#22D3EE"],
  [960, 360, "#2E6AFF"],
  [1090, 330, "#2E6AFF"],
  [960, 480, "#2E6AFF"],
  [1090, 470, "#3DDC97"],
];
const links = [
  [0, 1],
  [1, 2],
  [1, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [6, 7],
  [5, 7],
  [3, 6],
  [0, 4],
];

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#05070A",
        backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        padding: "72px 80px",
        fontFamily: "Inter",
      }}
    >
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="#2E6AFF"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        ))}
        {nodes.map(([x, y, color]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={color} />
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 1040 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: "0.06em",
            color: "#3DDC97",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#3DDC97" }} />
          {`${company.name} · Sofia`}
        </div>
        <div style={{ maxWidth: 900, fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.045em", color: "#F5F7FA" }}>{hero.headline}</div>
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: "0.06em",
            color: "#A3ACB9",
            textTransform: "uppercase",
          }}
        >
          {services.items.map((item) => item.label).join("  ·  ")}
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
