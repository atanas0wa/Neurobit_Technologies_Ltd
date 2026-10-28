"use client";

import { useEffect } from "react";

/*
 * Next's router ignores a click on a link to the hash already in the URL, so
 * after one "Discuss your project" (URL ends in #contact-form) scrolling back
 * up and pressing another did nothing. In that case we scroll to the target
 * ourselves. It runs in the capture phase so Link sees defaultPrevented and
 * stays out of it; Link's own onClick (closing the mobile menu) still runs.
 * scrollIntoView honours scroll-padding and the reduced-motion scroll-behavior.
 */
export function SameHashScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash || url.hash !== location.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      // Next frame: let the mobile menu close and release its scroll lock first.
      requestAnimationFrame(() => target.scrollIntoView());
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
