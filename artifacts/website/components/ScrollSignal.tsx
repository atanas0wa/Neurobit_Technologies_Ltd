"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Marks data-current on the last [data-step] child that has scrolled past the
 * middle of the viewport, like a signal travelling down the process. On touch
 * screens that step is the one shown as active (globals.css). Without JS every
 * step renders as active (the styles key off data-signal="on").
 *
 * It also stages the rows' entrance: if the list is still below the fold,
 * data-reveal="ready" hides them, and "in" lets them rise in (globals.css)
 * once the list scrolls into view. Reduced motion skips it.
 */
export function ScrollSignal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    root.dataset.signal = "on";

    const update = () => {
      const line = window.innerHeight * 0.55;
      let current = -1;
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < line) current = i;
      });
      steps.forEach((step, i) => (step.dataset.current = String(i === current)));
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    let reveal: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && root.getBoundingClientRect().top > window.innerHeight) {
      root.dataset.reveal = "ready";
      reveal = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          root.dataset.reveal = "in";
          reveal?.disconnect();
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      reveal.observe(root);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      reveal?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="signal">
      {children}
    </div>
  );
}
