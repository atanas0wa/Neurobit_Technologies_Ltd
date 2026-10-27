"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content } from "@/content/en";
import { switchPath, type Locale } from "@/content/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink, Container } from "./ui";

/*
 * Transparent at the top, solid with blur once the page scrolls.
 * The CTA pill is outlined while another filled button (hero CTA, form
 * submit) is on screen and fills otherwise, so a view never shows two.
 * Copy and hrefs arrive localized from the layout.
 *
 * The open mobile menu covers the page, so while it is open everything
 * outside the header is inert (no focus, no screen-reader access) and the
 * page behind does not scroll. Escape closes it and returns focus to the
 * toggle; following a link, changing route or growing to the desktop layout
 * closes it too.
 */
export function Nav({
  nav,
  ui,
  homeHref,
  otherLocale,
}: {
  nav: Content["nav"];
  ui: Content["ui"];
  homeHref: string;
  otherLocale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [filledCta, setFilledCta] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Every in-page filled button carries data-primary-cta.
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setFilledCta(visible.size === 0);
    });
    const ctas = document.querySelectorAll("[data-primary-cta]");
    ctas.forEach((el) => observer.observe(el));
    if (ctas.length === 0) setFilledCta(true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const covered = [...document.body.children].filter(
      (el) => el !== header && !el.contains(header) && !el.hasAttribute("inert"),
    );
    covered.forEach((el) => el.setAttribute("inert", ""));
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    // Tailwind's xl breakpoint, where the full navigation replaces the menu.
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onDesktop = () => {
      if (desktop.matches) closeMenu(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      covered.forEach((el) => el.removeAttribute("inert"));
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, closeMenu]);

  // A route change replaces the page, so the menu should not stay open over it.
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open ? "bg-void" : solid ? "bg-void/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Logo href={homeHref} label={ui.home} />

        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            <ul className="flex items-center gap-5">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-sm text-[14px] text-mist transition-colors hover:text-snow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={nav.cta.href}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                filledCta
                  ? "border-signal bg-signal text-white hover:border-signal-hover hover:bg-signal-hover"
                  : "border-line text-snow hover:border-mist"
              }`}
            >
              {nav.cta.label}
            </Link>
          </nav>

          {/* Plain <a>: each language has its own root layout, so switching is a full page load.
              On phones the switch lives in the mobile menu, so the logo keeps its line. */}
          <a
            href={switchPath(pathname, otherLocale)}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={ui.language.aria}
            title={ui.language.label}
            className="hidden size-[44px] items-center justify-center rounded-full border border-line text-[13px] font-semibold text-mist xl:flex transition-colors hover:border-mist hover:text-snow"
          >
            {ui.language.short}
          </a>
          <ThemeToggle toLight={ui.themeToLight} toDark={ui.themeToDark} />

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-[44px] items-center justify-center rounded-full xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.menuClose : ui.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-[10px] w-[20px]">
              <span
                className={`absolute left-0 h-px w-full bg-snow transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-snow transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <nav ref={menuRef} id="mobile-menu" aria-label="Primary" className="h-[calc(100svh-72px)] overflow-y-auto overscroll-contain border-t border-line xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[22px] font-regular tracking-[-0.02em] text-mist hover:text-snow"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href={nav.cta.href} onClick={() => setOpen(false)} className="mt-3 self-start">
              {nav.cta.label}
            </ButtonLink>
            <a
              href={switchPath(pathname, otherLocale)}
              hrefLang={otherLocale}
              lang={otherLocale}
              className="mt-4 self-start py-2 text-[15px] text-mist hover:text-snow"
            >
              {ui.language.label}
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
