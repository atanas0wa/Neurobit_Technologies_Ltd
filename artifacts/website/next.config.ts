import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Replit's preview pane loads the dev server through its *.replit.dev proxy.
  allowedDevOrigins: ["**.replit.dev", "**.repl.co"],
  // Two root layouts (one per language), so the 404 page is app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
