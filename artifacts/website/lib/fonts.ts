/*
 * TTF fonts for build-time image generation (next/og cannot read woff2).
 * Fetched from Google Fonts with a legacy user agent so it serves TTF.
 * Returns an empty list on failure so the build falls back to the default font.
 */
type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" };

async function loadFont(family: string, weight: 400 | 500): Promise<ArrayBuffer> {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`, {
      headers: { "User-Agent": "Mozilla/4.0" },
    })
  ).text();
  const url = css.match(/src: url\(([^)]+)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`No TTF found for ${family} ${weight}`);
  return (await fetch(url)).arrayBuffer();
}

export async function ogFonts(): Promise<OgFont[]> {
  try {
    const [inter, mono] = await Promise.all([loadFont("Inter", 400), loadFont("JetBrains Mono", 500)]);
    return [
      { name: "Inter", data: inter, weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
    ];
  } catch (error) {
    console.warn("OG image: falling back to the default font.", error);
    return [];
  }
}
