"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Cards that glow under the pointer. As the mouse moves over the list, every
 * [data-card] gets the pointer position in its own box (--x, --y), which
 * places the glow (globals.css): a lit edge on the card under the pointer, a
 * fainter one on its neighbours where the pointer comes close, and a soft
 * light inside the hovered card. Without a mouse, the card nearest the middle
 * of the screen is marked data-current and glows instead, so the effect
 * follows the scroll on touch screens. Without JS the cards stay as they are.
 */
export function GlowCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-card]")];

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      }
    };

    const update = () => {
      const mid = window.innerHeight / 2;
      let current = -1;
      let nearest = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const distance = Math.abs(r.top + r.height / 2 - mid);
        if (distance < nearest) {
          nearest = distance;
          current = i;
        }
      });
      cards.forEach((card, i) => (card.dataset.current = String(i === current)));
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
    root.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="glow-cards">
      {children}
    </div>
  );
}
