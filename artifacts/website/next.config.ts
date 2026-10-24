import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Replit's preview pane loads the dev server through its *.replit.dev proxy.
  allowedDevOrigins: ["**.replit.dev", "**.repl.co"],
};

export default nextConfig;
