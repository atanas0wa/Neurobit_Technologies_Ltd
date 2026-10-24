import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { company, localePath, locales, site, type Locale } from "@/content/site";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "@/app/globals.css";

/*
 * Shared root layout. Each language has its own root layout
 * (app/(bg)/layout.tsx, app/(en)/layout.tsx) so <html lang> is right.
 */

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** hreflang alternates for a path such as "/privacy/". */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": path,
    },
  };
}

export function siteMetadata(locale: Locale): Metadata {
  const { meta } = site(locale);
  return {
    metadataBase: new URL(company.url),
    title: { default: meta.title, template: `%s — ${company.name}` },
    description: meta.description,
    alternates: alternates(locale, "/"),
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: meta.ogLocale,
      url: localePath(locale, "/"),
      title: meta.title,
      description: meta.description,
      // app/opengraph-image.tsx sits above both route groups, so link it explicitly.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name} — ${site("en").hero.headline}` }],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070A",
  colorScheme: "dark",
};

// Runs before first paint so a saved light theme never flashes dark.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export function SiteLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { meta, nav, ui, services } = site(locale);
  const localizedNav = {
    links: nav.links.map((link) => ({ ...link, href: localePath(locale, link.href) })),
    cta: { ...nav.cta, href: localePath(locale, nav.cta.href) },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    logo: `${company.url}/icon.svg`,
    description: meta.description,
    email: company.email,
    foundingDate: company.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sofia",
      addressCountry: company.countryCode,
    },
    knowsAbout: services.items.map((item) => item.label),
  };

  return (
    <html
      lang={meta.htmlLang}
      data-theme="dark"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-signal px-4 py-2 text-[14px] font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          {meta.skip}
        </a>
        <Nav
          nav={localizedNav}
          ui={ui}
          homeHref={localePath(locale, "/")}
          otherLocale={locale === "bg" ? "en" : "bg"}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
