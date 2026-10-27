/*
 * Shared company details and locale helpers. Translated copy lives in
 * content/en.ts and content/bg.ts; components take a `locale` and read it
 * through `site(locale)`.
 */
import { bg } from "./bg";
import { company } from "./company";
import { en, type Content } from "./en";

export { company };

export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const content: Record<Locale, Content> = { bg, en };

export function site(locale: Locale): Content {
  return content[locale];
}

/** Prefixes a site path with the locale: "/privacy/" → "/bg/privacy/". English (the default) has no prefix. */
export function localePath(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** The same page in the other language, for the language switch and hreflang. */
export function switchPath(pathname: string, to: Locale): string {
  const prefixed = locales.filter((l) => l !== defaultLocale).join("|");
  const bare = pathname.replace(new RegExp(`^/(${prefixed})(?=/|$)`), "") || "/";
  return localePath(to, bare);
}
