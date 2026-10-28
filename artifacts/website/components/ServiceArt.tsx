"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

export type ServiceArtKind = "web" | "mobile" | "ai";

/*
 * Small line illustrations for the three services, drawn in the theme tokens.
 * Each one acts out what its description says: a site loading and taking an
 * inquiry, an app booking a slot, and AI sorting incoming messages.
 *
 * The drawing is complete without motion, and that still version is what the
 * server renders: no CSS animation runs until JS marks the figure with
 * data-play, and the AI packets' SMIL elements are only added once motion is
 * allowed. Both follow prefers-reduced-motion live (switching it on stops
 * everything) and run only while the figure is on screen. Decorative: the
 * service text next to it already says what it shows.
 */
export function ServiceArt({ kind }: { kind: ServiceArtKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useArtPlayback(ref);

  return (
    <div ref={ref} className={`art art-${kind} w-full max-w-[320px]`} aria-hidden="true">
      {kind === "web" && <Web />}
      {kind === "mobile" && <Mobile />}
      {kind === "ai" && <Ai animate={motionAllowed} />}
    </div>
  );
}

/*
 * Shared by the .art illustrations (ServiceArt, StepArt): sets data-play on the
 * figure while it is on screen and motion is allowed, and pauses its SVG
 * animations otherwise. With observe off it plays whenever motion is allowed,
 * for figures whose container already pauses them off screen (StepRing).
 * Returns whether motion is allowed.
 */
export function useArtPlayback(ref: RefObject<HTMLDivElement | null>, observe = true) {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!reduce.matches);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = ref.current;
    const svg = root?.querySelector("svg");
    if (!root || !svg || !motionAllowed) return;
    if (!observe) {
      root.dataset.play = "true";
      return () => {
        delete root.dataset.play;
      };
    }
    svg.pauseAnimations();
    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.play = String(entry.isIntersecting);
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      svg.pauseAnimations();
      delete root.dataset.play;
    };
  }, [ref, observe, motionAllowed]);

  return motionAllowed;
}

export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Web() {
  return (
    <svg viewBox="0 0 240 140" className="block h-auto w-full">
      <rect x="1" y="1" width="238" height="138" rx="12" className="fill-panel stroke-line" strokeWidth="1.5" />
      <path d="M1 24 H239" className="stroke-line" strokeWidth="1.5" />
      <circle cx="15" cy="12.5" r="3" className="fill-slate" />
      <circle cx="26" cy="12.5" r="3" className="fill-slate" />
      <circle cx="37" cy="12.5" r="3" className="fill-slate" />
      <rect x="52" y="7" width="128" height="11" rx="5.5" className="fill-void" />
      {/* Page loading in */}
      <rect x="16" y="38" width="112" height="9" rx="4.5" className="a-load fill-snow/80" style={d(0.1)} />
      <rect x="16" y="54" width="92" height="5" rx="2.5" className="a-load fill-slate" style={d(0.35)} />
      <rect x="16" y="64" width="104" height="5" rx="2.5" className="a-load fill-slate" style={d(0.55)} />
      <rect x="146" y="36" width="78" height="46" rx="8" className="a-load fill-signal/15 stroke-signal/50" strokeWidth="1.25" style={d(0.8)} />
      <path d="M156 72 L172 56 L184 66 L196 52 L214 72" className="a-load fill-none stroke-signal/70" strokeWidth="1.5" strokeLinejoin="round" style={d(1)} />
      {/* Inquiry form */}
      <rect x="16" y="98" width="112" height="22" rx="7" className="a-load fill-void stroke-line" strokeWidth="1.25" style={d(1.25)} />
      <rect x="24" y="107" width="54" height="4" rx="2" className="a-type fill-mist" />
      <g className="a-press">
        <rect x="136" y="98" width="64" height="22" rx="11" className="fill-signal" />
        <rect x="150" y="107" width="36" height="4" rx="2" className="fill-white" />
      </g>
      <g className="a-pop">
        <circle cx="214" cy="109" r="10" className="fill-terminal" />
        <path d="M209.5 109.5 L212.8 112.8 L218.8 106" className="fill-none stroke-void" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Mobile() {
  const slots = [0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => ({ row, col })));
  return (
    <svg viewBox="0 0 240 140" className="block h-auto w-full">
      <rect x="84" y="2" width="72" height="136" rx="14" className="fill-panel stroke-line" strokeWidth="1.5" />
      <rect x="108" y="8" width="24" height="5" rx="2.5" className="fill-void" />
      <rect x="94" y="22" width="40" height="6" rx="3" className="a-load fill-snow/80" style={d(0.1)} />
      <rect x="94" y="33" width="28" height="4" rx="2" className="a-load fill-slate" style={d(0.3)} />
      {/* Calendar slots; one gets booked */}
      {slots.map(({ row, col }) => (
        <rect
          key={`${row}-${col}`}
          x={94 + col * 18}
          y={46 + row * 16}
          width="14"
          height="11"
          rx="3"
          className={`a-load ${row === 1 && col === 1 ? "a-select fill-signal" : "fill-line"}`}
          style={d(0.45 + (row * 3 + col) * 0.06)}
        />
      ))}
      <rect x="94" y="104" width="52" height="14" rx="7" className="a-confirm fill-terminal" />
      <rect x="106" y="109" width="28" height="4" rx="2" className="a-confirm fill-void" />
      {/* Notification beside the phone */}
      <g className="a-notify">
        <rect x="164" y="22" width="70" height="26" rx="9" className="fill-panel stroke-terminal/60" strokeWidth="1.25" />
        <circle cx="176" cy="35" r="4" className="fill-terminal" />
        <rect x="185" y="29" width="38" height="4" rx="2" className="fill-snow/80" />
        <rect x="185" y="37" width="26" height="4" rx="2" className="fill-slate" />
      </g>
      {/* A field-work pin on the left, the third use case in the copy */}
      <g className="a-load" style={d(0.9)}>
        <path d="M38 40 C38 28 56 28 56 40 C56 50 47 58 47 58 C47 58 38 50 38 40 Z" className="fill-signal/15 stroke-signal/70" strokeWidth="1.5" />
        <circle cx="47" cy="40" r="3.5" className="fill-signal" />
        <path d="M22 76 H72 M22 88 H60" className="stroke-line" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Ai({ animate }: { animate: boolean }) {
  const inputs = [24, 62, 100];
  const bins = [
    { y: 24, tone: "terminal" },
    { y: 61, tone: "cyan" },
    { y: 98, tone: "signal" },
  ] as const;
  const route = (from: number, to: number) => `M62 ${from + 7} C 92 ${from + 7}, 100 70, 120 70 C 140 70, 150 ${to + 9}, 178 ${to + 9}`;
  return (
    <svg viewBox="0 0 240 140" className="block h-auto w-full">
      {inputs.map((y) => (
        <path key={`in-${y}`} d={`M62 ${y + 7} C 92 ${y + 7}, 100 70, 120 70`} className="fill-none stroke-line" strokeWidth="1.5" />
      ))}
      {bins.map((b) => (
        <path key={`out-${b.y}`} d={`M120 70 C 140 70, 150 ${b.y + 9}, 178 ${b.y + 9}`} className="fill-none stroke-line" strokeWidth="1.5" />
      ))}
      {/* Incoming messages */}
      {inputs.map((y) => (
        <g key={`msg-${y}`}>
          <rect x="8" y={y} width="54" height="15" rx="4" className="fill-panel stroke-line" strokeWidth="1.25" />
          <rect x="15" y={y + 5.5} width="32" height="4" rx="2" className="fill-slate" />
        </g>
      ))}
      {/* Neuron */}
      <circle cx="120" cy="70" r="20" className="a-pulse fill-none stroke-signal/40" strokeWidth="1.5" />
      <circle cx="120" cy="70" r="13" className="fill-panel stroke-signal" strokeWidth="1.5" />
      <circle cx="120" cy="70" r="4.5" className="fill-signal" />
      {/* Categories */}
      {bins.map((b, i) => (
        <g key={`bin-${b.y}`} className="a-flash" style={d(((i + 2) % 3) + 2.7)}>
          <rect
            x="178"
            y={b.y}
            width="54"
            height="18"
            rx="5"
            className={`fill-panel ${b.tone === "terminal" ? "stroke-terminal" : b.tone === "cyan" ? "stroke-cyan" : "stroke-signal"}`}
            strokeWidth="1.5"
          />
          <rect
            x="186"
            y={b.y + 7}
            width="26"
            height="4"
            rx="2"
            className={b.tone === "terminal" ? "fill-terminal" : b.tone === "cyan" ? "fill-cyan" : "fill-signal"}
          />
        </g>
      ))}
      {/* Messages travelling through the neuron to their category */}
      {inputs.map((y, i) => (
        <circle key={`pkt-${y}`} r="3.5" className="fill-cyan" opacity="0">
          {animate && (
            <>
              <animateMotion dur="3s" begin={`${i}s`} repeatCount="indefinite" path={route(y, bins[(i + 1) % 3].y)} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}
    </svg>
  );
}
