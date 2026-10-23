"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { ButtonLink, Container } from "./ui";

/*
 * Transparent at the top, solid with blur once the page scrolls.
 * The CTA pill is outlined while the hero's filled CTA is on screen and
 * fills once it scrolls away, so a view never shows two filled buttons.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [filledCta, setFilledCta] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const heroCta = document.getElementById("hero-cta");
    let observer: IntersectionObserver | undefined;
    if (heroCta) {
      observer = new IntersectionObserver(([entry]) => setFilledCta(!entry.isIntersecting));
      observer.observe(heroCta);
    } else {
      setFilledCta(true);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-void/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
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
                ? "border-signal bg-signal text-white hover:border-[#1F5BF0] hover:bg-[#1F5BF0]"
                : "border-line text-snow hover:border-mist"
            }`}
          >
            {nav.cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex size-[44px] items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
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
      </Container>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-line md:hidden">
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
          </Container>
        </nav>
      )}
    </header>
  );
}
