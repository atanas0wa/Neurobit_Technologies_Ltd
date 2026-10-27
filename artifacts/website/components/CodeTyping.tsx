"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Types the code panel out line by line the first time it scrolls into view.
 * The code is server-rendered and visible by default; lines are only hidden
 * once JS has run and the panel is still below the fold, so a failed script
 * or reduced motion leaves the full code in place.
 */
export function CodeTyping({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (root.getBoundingClientRect().top < window.innerHeight) return;

    root.dataset.typing = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.dataset.typing = "run";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
