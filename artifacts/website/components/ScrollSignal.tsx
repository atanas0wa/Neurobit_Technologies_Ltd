"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Lights up each [data-step] child once it has scrolled past the middle of
 * the viewport, like a signal travelling down the process. Steps above the
 * line stay lit; scrolling back up dims them again. The latest step reached
 * is marked data-current. Without JS every step renders lit (the styles key
 * off data-signal="on").
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
        const reached = step.getBoundingClientRect().top < line;
        step.dataset.reached = String(reached);
        if (reached) current = i;
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
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
