"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { StepArt, type StepArtKind } from "./StepArt";

type Step = { title: string; tag: string; body: string; art: StepArtKind };

// The ring holds the steps twice over, so it reads as one continuous loop.
const COPIES = 2;
// Auto-rotation speed: each step spends this long in focus.
const MS_PER_STEP = 6000;
// After a drag, a click or a button, auto-rotation waits this long before resuming.
const HOLD_MS = 5000;

/*
 * How we work as a curved ring: the step cards sit on the inside of a
 * cylinder, so the viewer stands at its centre and the cards at the edges
 * lean in, larger. It turns slowly on its own; the card that reaches the
 * centre is the step in focus. That card's dot fires and its illustration
 * brightens, and the panel below rolls in that step's word letter by letter
 * and brings in its description.
 *
 * Geometry lives in globals.css (.ring-*): every card is placed from --k, its
 * distance in steps from the centre, using the ring's width, angle and radius
 * set per container width. This component only moves --k (and fades cards
 * past the edge) on each frame: auto-rotation, drag with inertia, a click on
 * a card, the previous/next buttons and the arrow keys. It pauses while the
 * mouse is over it, while it has keyboard focus, with the pause button, and
 * while it is off screen (the illustrations pause with it). With reduced
 * motion it does not turn on its own and moves between steps without
 * animating.
 *
 * The ring is decorative (aria-hidden); the list of steps below it carries
 * the content. Without JS the ring shows its first position and every step
 * in the list is shown.
 */
export function StepRing({
  label,
  steps,
  prev,
  next,
  pause,
  play,
}: {
  label: string;
  steps: Step[];
  prev: string;
  next: string;
  pause: string;
  play: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<{ go: (delta: number) => void } | null>(null);
  const playingRef = useRef(true);
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const n = steps.length;
  const total = n * COPIES;

  useEffect(() => {
    const root = rootRef.current;
    const ring = cardsRef.current;
    if (!root || !ring) return;
    const cards = [...ring.querySelectorAll<HTMLElement>("[data-card]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.dataset.signal = "on";
    setReady(true);

    let offset = 0; // in steps: card j is centred when offset ≡ j (mod total)
    let velocity = 0; // steps per ms, while coasting after a drag
    let tween: { from: number; to: number; start: number } | null = null;
    let hold = 0;
    let hovering = false;
    let focused = false;
    let visible = false;
    let stepDeg = 36;
    let stepPx = 300;
    let shown = -1;

    const measure = () => {
      stepDeg = parseFloat(getComputedStyle(ring).getPropertyValue("--step")) || 36;
      const gap = parseFloat(getComputedStyle(ring).getPropertyValue("--gap")) || 12;
      stepPx = (cards[0]?.offsetWidth ?? 280) + gap;
    };

    const place = () => {
      cards.forEach((card, j) => {
        let k = (((j - offset) % total) + total) % total;
        if (k >= total / 2) k -= total;
        const fade = Math.min(1, Math.max(0, (100 - Math.abs(k * stepDeg)) / 20));
        card.style.setProperty("--k", k.toFixed(4));
        card.style.setProperty("--o", fade.toFixed(3));
        card.style.visibility = fade > 0 ? "" : "hidden";
        card.dataset.current = String(Math.abs(k) < 0.5);
      });
      const i = ((Math.round(offset) % n) + n) % n;
      if (i !== shown) {
        shown = i;
        setCurrent(i);
      }
    };

    const moveTo = (to: number) => {
      velocity = 0;
      hold = performance.now() + HOLD_MS;
      if (reduce.matches) {
        tween = null;
        offset = to;
        place();
      } else {
        tween = { from: offset, to, start: performance.now() };
      }
    };
    // Counted from where a running move is headed, so quick repeated clicks each move one step.
    moveRef.current = { go: (delta) => moveTo((tween ? tween.to : Math.round(offset)) + delta) };

    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (tween) {
        const t = Math.min(1, (now - tween.start) / 700);
        const eased = 1 - Math.pow(1 - t, 3);
        offset = tween.from + (tween.to - tween.from) * eased;
        if (t === 1) tween = null;
      } else if (drag) {
        // the pointer moves the ring
      } else if (Math.abs(velocity) > 0.00002) {
        offset += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16);
      } else if (playingRef.current && !hovering && !focused && now > hold && !reduce.matches) {
        velocity = 0;
        offset += dt / MS_PER_STEP;
      }
      place();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (frame || !visible) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    let drag: { x: number; start: number; lastX: number; lastT: number; moved: boolean; card: number | null } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const card = (e.target as Element).closest<HTMLElement>("[data-card]");
      drag = { x: e.clientX, start: offset, lastX: e.clientX, lastT: e.timeStamp, moved: false, card: card ? cards.indexOf(card) : null };
      tween = null;
      velocity = 0;
      ring.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) drag.moved = true;
      offset = drag.start - dx / stepPx;
      const dt = e.timeStamp - drag.lastT;
      if (dt > 0) velocity = -(e.clientX - drag.lastX) / stepPx / dt;
      drag.lastX = e.clientX;
      drag.lastT = e.timeStamp;
      if (reduce.matches) place();
    };
    const onUp = () => {
      if (!drag) return;
      const { moved, card } = drag;
      drag = null;
      hold = performance.now() + HOLD_MS;
      if (reduce.matches) {
        velocity = 0;
        moveTo(Math.round(offset));
      } else if (!moved && card !== null) {
        let k = (((card - offset) % total) + total) % total;
        if (k >= total / 2) k -= total;
        moveTo(Math.round(offset + k));
      }
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };
    // Only keyboard focus pauses it: a button clicked with the mouse keeps focus, and the ring should still resume.
    const onFocusIn = (e: FocusEvent) => (focused = (e.target as Element).matches(":focus-visible"));
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) focused = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.dataset.offscreen = String(!visible);
      run();
    });
    observer.observe(root);
    const onResize = () => {
      measure();
      place();
    };

    measure();
    place();
    ring.addEventListener("pointerdown", onDown);
    ring.addEventListener("pointermove", onMove);
    ring.addEventListener("pointerup", onUp);
    ring.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      moveRef.current = null;
      ring.removeEventListener("pointerdown", onDown);
      ring.removeEventListener("pointermove", onMove);
      ring.removeEventListener("pointerup", onUp);
      ring.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("resize", onResize);
    };
  }, [n, total]);

  const togglePlay = () => {
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveRef.current?.go(event.key === "ArrowRight" ? 1 : -1);
  };

  // Rendered once: the ring's frame loop owns the cards' --k, --o and data-current from here on.
  const cards = useMemo(
    () =>
      Array.from({ length: total }, (_, j) => {
        const step = steps[j % n];
        const k = j < total / 2 ? j : j - total;
        return (
          <div key={j} data-card className="ring-card" style={{ "--k": k, "--o": Math.abs(k) <= 2 ? 1 : 0 } as CSSProperties}>
            <div className="flex h-full flex-col gap-[3cqw] rounded-2xl border border-line bg-panel p-[6cqw] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]">
              <div className="flex items-center gap-2 font-mono text-[clamp(10px,4.2cqw,13px)] font-medium uppercase tracking-[0.06em] text-mist">
                <span className="signal-dot" />
                <span className="truncate">{step.tag}</span>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center [&_.step-art]:h-full [&_.step-art]:w-auto [&_svg]:h-full [&_svg]:w-auto">
                <StepArt kind={step.art} observe={false} />
              </div>
              <p className="truncate text-[clamp(15px,8cqw,28px)] leading-tight tracking-[-0.03em] text-snow">{step.title}</p>
            </div>
          </div>
        );
      }),
    [steps, n, total],
  );

  const arrowClass =
    "flex size-[44px] cursor-pointer items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-mist hover:text-snow";

  return (
    <div ref={rootRef} role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown} className="signal">
      <div className="ring-stage" aria-hidden="true">
        <div ref={cardsRef} className="ring-cards">
          {cards}
        </div>
      </div>

      <ol className="ring-entries mx-auto mt-6 max-w-[640px] text-center md:mt-10">
        {steps.map((step, i) => (
          <li key={step.title} data-current={String(i === current)} className="ring-entry">
            <p className="font-mono text-label font-medium uppercase text-mist">{step.tag}</p>
            <h3 className="mt-3 text-h3 font-regular text-snow">
              <span className="sr-only">{step.title}</span>
              <span className="roll-word" aria-hidden="true">
                {Array.from(step.title).map((char, j) => (
                  <span key={j} className="roll-char" style={{ "--i": j } as CSSProperties}>
                    {char}
                  </span>
                ))}
              </span>
            </h3>
            <p className="roll-body mx-auto mt-4 max-w-[560px] text-pretty text-body font-light text-mist">{step.body}</p>
          </li>
        ))}
      </ol>

      <div hidden={!ready} className="mt-8 flex justify-center gap-3">
        <button type="button" aria-label={prev} title={prev} onClick={() => moveRef.current?.go(-1)} className={arrowClass}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button type="button" aria-label={playing ? pause : play} title={playing ? pause : play} aria-pressed={!playing} onClick={togglePlay} className={arrowClass}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M9 6v12M15 6v12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 5.5v13l10.5-6.5z" />
            </svg>
          )}
        </button>
        <button type="button" aria-label={next} title={next} onClick={() => moveRef.current?.go(1)} className={arrowClass}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
