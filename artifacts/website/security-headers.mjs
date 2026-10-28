/*
 * Security headers: the one source for every host's config.
 *
 * scripts/security-headers.mjs runs after `next build`. It adds a CSP <meta>
 * to every page with the SHA-256 hashes of that page's inline scripts, writes
 * out/.htaccess (LiteSpeed/Apache), and fails the build when vercel.json,
 * serve.json (local `pnpm start`) or the repo's .replit no longer match this
 * file. After changing anything here, run `pnpm run headers:sync`.
 *
 * Browsers enforce the header and the <meta> policy together, so scripts must
 * pass both: the header's 'unsafe-inline' is only a fallback for a page whose
 * <meta> is missing, and the <meta> narrows inline scripts to the hashed ones.
 */

export const csp = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'"],
  // The service illustrations carry style="--d: …" animation delays.
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'"],
  // Inter and JetBrains Mono are self-hosted by next/font.
  "font-src": ["'self'"],
  // The contact form posts to Formspree; mailto: is the fallback without a Formspree ID.
  "connect-src": ["'self'", "https://formspree.io"],
  "form-action": ["'self'", "https://formspree.io", "mailto:"],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
};

export const serializeCsp = (policy) =>
  Object.entries(policy)
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");

export const headers = [
  { key: "Content-Security-Policy", value: serializeCsp(csp) },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer",
      "autoplay",
      "browsing-topics",
      "camera",
      "display-capture",
      "encrypted-media",
      "fullscreen",
      "geolocation",
      "gyroscope",
      "hid",
      "idle-detection",
      "magnetometer",
      "microphone",
      "midi",
      "payment",
      "picture-in-picture",
      "publickey-credentials-get",
      "screen-wake-lock",
      "serial",
      "usb",
      "xr-spatial-tracking",
    ]
      .map((feature) => `${feature}=()`)
      .join(", "),
  },
];

/* The OG image is exported without an extension; with nosniff it must be sent as a PNG. */
export const ogImage = { path: "/opengraph-image", contentType: "image/png" };
