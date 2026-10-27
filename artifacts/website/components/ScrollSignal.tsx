"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Lights up each [data-step] child once it has scrolled past the middle of
 * the viewport, like a signal travelling down the process. Steps above the
 * line stay lit; scrolling back up dims them again. The latest step reached
 * is marked data-current. It also sizes the rail between the first and last
 * .signal-node and sets how far it is filled (--rail-top, --rail-height,
 * --progress). Without JS every step renders done and the rail is full (the
 * styles key off data-signal="on").
 */
export function ScrollSignal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    const nodes = steps.map((step) => step.querySelector<HTMLElement>(".signal-node"));
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

      // Rail runs from the first node's centre to the last; fill stops at the current node.
      const first = nodes[0]?.getBoundingClientRect();
      const last = nodes[nodes.length - 1]?.getBoundingClientRect();
      const list = nodes[0]?.closest("ol")?.getBoundingClientRect();
      if (!first || !last || !list) return;
      const centre = (r: DOMRect) => r.top + r.height / 2;
      const span = centre(last) - centre(first);
      const reachedTo = current < 0 ? 0 : centre(nodes[current]!.getBoundingClientRect()) - centre(first);
      root.style.setProperty("--rail-top", `${centre(first) - list.top}px`);
      root.style.setProperty("--rail-height", `${span}px`);
      root.style.setProperty("--progress", String(span > 0 ? reachedTo / span : 0));
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
