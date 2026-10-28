"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Milliseconds per character while an answer types itself out. */
export const TYPE_MS = 18;
/** Let the card finish opening (globals.css, 320ms) before the first character. */
const OPEN_DELAY_MS = 240;

/*
 * One FAQ card: a native <details> (works without JavaScript, the browser
 * keeps one item of the "faq" group open and exposes the expanded state).
 * Every time an item opens, its answer types in like an AI writing it, and
 * its spark twinkles faster while it does. The untyped rest stays in the
 * layout, invisible, so the card opens straight to its final height and
 * nothing below moves. Screen readers get the full answer from a visually
 * hidden copy. Reduced motion shows the text at once and stills the sparks.
 */
export function FaqItem({
  question,
  answer,
  label,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  label: string;
  defaultOpen?: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const chars = useMemo(() => Array.from(answer), [answer]);
  // null: the whole answer is shown; a number: how many characters are typed so far.
  const [shown, setShown] = useState<number | null>(null);
  // Last open state we acted on: the browser also fires "toggle" for an item that starts open.
  const wasOpen = useRef(defaultOpen);
  // The default-open item, below the fold at load, waits to type until it scrolls into view.
  const waiting = useRef(false);
  const frame = useRef(0);

  const finish = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setShown(null);
  }, []);

  const play = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    setShown(0);
    const start = performance.now() + OPEN_DELAY_MS;
    const step = (now: number) => {
      const count = Math.max(0, Math.floor((now - start) / TYPE_MS));
      if (count >= chars.length) return finish();
      setShown(count);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, [chars.length, finish]);

  // The item that starts open types once it scrolls into view, unless it is already on screen at load.
  useEffect(() => {
    const el = ref.current;
    if (!el || !defaultOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    waiting.current = true;
    setShown(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (!waiting.current) return; // the visitor already toggled it
        waiting.current = false;
        play();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [defaultOpen, play, finish]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onToggle = () => {
    const el = ref.current;
    if (!el || el.open === wasOpen.current) return;
    wasOpen.current = el.open;
    waiting.current = false;
    if (!el.open) {
      if (shown !== null) finish();
      return;
    }
    // Browsers without <details name> keep several open; close the others ourselves.
    document.querySelectorAll<HTMLDetailsElement>('details[name="faq"][open]').forEach((other) => {
      if (other !== el) other.open = false;
    });
    play();
  };

  return (
    <details
      ref={ref}
      name="faq"
      open={defaultOpen}
      onToggle={onToggle}
      data-typing={shown !== null ? "" : undefined}
      className="faq-item group rounded-3xl border border-line bg-panel transition-colors hover:border-slate has-[summary:focus-visible]:outline-2 has-[summary:focus-visible]:outline-offset-2 has-[summary:focus-visible]:outline-signal"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-3xl px-4 py-4 focus-visible:outline-none md:px-6 [&::-webkit-details-marker]:hidden">
        <Sparkle />
        <h3 className="min-w-0 flex-1 hyphens-auto break-words text-[18px] font-medium leading-snug tracking-[-0.01em] text-snow md:text-[20px]">
          {question}
        </h3>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5 shrink-0 text-mist transition-transform duration-300 group-open:rotate-180 group-hover:text-snow motion-reduce:transition-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-4 pb-6 md:px-6 md:pl-[74px]">
        <p className="font-mono text-label font-medium uppercase text-slate">{label}</p>
        <p className="mt-3 text-pretty text-body font-light leading-[1.65] text-mist">
          <span className="sr-only">{answer}</span>
          <span aria-hidden="true">
            {shown === null ? (
              answer
            ) : (
              <>
                {chars.slice(0, shown).join("")}
                <span className="faq-caret" />
                <span className="invisible">{chars.slice(shown).join("")}</span>
              </>
            )}
          </span>
        </p>
      </div>
    </details>
  );
}

/** Four-point spark in Terminal green: the "AI is answering" mark (animated in globals.css). */
function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="faq-spark size-5 shrink-0 overflow-visible text-terminal"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    >
      <path className="faq-spark-big" d="M12 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5Z" />
      <path className="faq-spark-small" d="M18.5 15.5c.25 1.6.9 2.25 2.5 2.5-1.6.25-2.25.9-2.5 2.5-.25-1.6-.9-2.25-2.5-2.5 1.6-.25 2.25-.9 2.5-2.5Z" />
    </svg>
  );
}
