"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Cards that glow under the pointer. As the mouse moves over the list, every
 * [data-card] gets the pointer position in its own box (--x, --y), which
 * places the glow (globals.css): a lit edge on the card under the pointer, a
 * fainter one on its neighbours where the pointer comes close, and a soft
 * light inside the hovered card. Without a mouse or JS the cards stay as
 * they are.
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
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="glow-cards">
      {children}
    </div>
  );
}
