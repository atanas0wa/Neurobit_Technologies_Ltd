"use client";

import { useRef, type CSSProperties } from "react";
import { useArtPlayback } from "./ServiceArt";

export type StepArtKind = "analysis" | "design" | "build" | "launch" | "support";

/*
 * Small line illustrations for the How we work steps, in the same idiom as
 * ServiceArt: a first conversation turning into priorities and an estimate, a
 * screen being laid out, code written in stages, checks passing before going
 * live, and an ongoing heartbeat with updates.
 *
 * Each figure runs on one shared 7s timeline (--t on the svg, globals.css);
 * every part appears at its own point on it (--s, a fraction of the cycle) and
 * they all clear together at the end, so the sequence restarts cleanly. The
 * still drawing is complete: without data-play, --t rests where everything is
 * shown. Decorative: the step text next to it already says what it shows.
 */
export function StepArt({ kind }: { kind: StepArtKind }) {
  const ref = useRef<HTMLDivElement>(null);
  useArtPlayback(ref);

  return (
    <div ref={ref} className="art step-art w-full max-w-[260px]" aria-hidden="true">
      <svg viewBox="0 0 240 120" className="art-timeline block h-auto w-full">
        {kind === "analysis" && <Analysis />}
        {kind === "design" && <Design />}
        {kind === "build" && <Build />}
        {kind === "launch" && <Launch />}
        {kind === "support" && <Support />}
      </svg>
    </div>
  );
}

const s = (at: number) => ({ "--s": at }) as CSSProperties;

function Check({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <path
      d={`M${x - 3.5} ${y} L${x - 1} ${y + 2.5} L${x + 3.5} ${y - 2.5}`}
      pathLength={1}
      className="s-draw fill-none stroke-terminal"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={s(at)}
    />
  );
}

function Analysis() {
  return (
    <>
      {/* The first conversation */}
      <g className="s-pop" style={s(0.02)}>
        <rect x="8" y="10" width="88" height="24" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
        <rect x="18" y="17" width="54" height="4" rx="2" className="fill-slate" />
        <rect x="18" y="25" width="36" height="4" rx="2" className="fill-slate" />
      </g>
      <g className="s-pop" style={s(0.12)}>
        <rect x="44" y="42" width="88" height="24" rx="9" className="fill-signal/15 stroke-signal/50" strokeWidth="1.25" />
        <rect x="54" y="49" width="60" height="4" rx="2" className="fill-snow/80" />
        <rect x="54" y="57" width="40" height="4" rx="2" className="fill-snow/50" />
      </g>
      <g className="s-pop" style={s(0.22)}>
        <rect x="8" y="74" width="70" height="20" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
        <rect x="18" y="82" width="44" height="4" rx="2" className="fill-slate" />
      </g>
      {/* Goals sorted into priorities */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="148" y={12 + i * 22} width="12" height="12" rx="3.5" className="s-fade fill-none stroke-line" strokeWidth="1.25" style={s(0.32)} />
          <rect x="168" y={16 + i * 22} width={56 - i * 12} height="4" rx="2" className="s-grow fill-mist/70" style={s(0.34 + i * 0.04)} />
          <Check x={154} y={18 + i * 22} at={0.46 + i * 0.07} />
        </g>
      ))}
      {/* The estimate */}
      <g className="s-pop" style={s(0.7)}>
        <rect x="148" y="84" width="84" height="22" rx="11" className="fill-terminal/15 stroke-terminal/60" strokeWidth="1.25" />
        <circle cx="161" cy="95" r="4" className="fill-terminal" />
        <rect x="171" y="93" width="48" height="4" rx="2" className="fill-terminal" />
      </g>
    </>
  );
}

function Design() {
  return (
    <>
      {/* A key screen laid out */}
      <rect x="10" y="8" width="150" height="104" rx="10" pathLength={1} className="s-draw fill-panel stroke-slate" strokeWidth="1.25" style={s(0.02)} />
      <rect x="22" y="20" width="56" height="6" rx="3" className="s-grow fill-snow/80" style={s(0.16)} />
      <rect x="22" y="34" width="126" height="36" rx="6" className="s-grow fill-signal/15 stroke-signal/50" strokeWidth="1.25" style={s(0.24)} />
      <rect x="22" y="78" width="60" height="22" rx="5" className="s-grow fill-line" style={s(0.32)} />
      <rect x="88" y="78" width="60" height="22" rx="5" className="s-grow fill-line" style={s(0.38)} />
      {/* The visual direction */}
      <circle cx="196" cy="22" r="9" className="s-pop fill-signal" style={s(0.48)} />
      <circle cx="196" cy="46" r="9" className="s-pop fill-cyan" style={s(0.54)} />
      <circle cx="196" cy="70" r="9" className="s-pop fill-terminal" style={s(0.6)} />
      <circle cx="196" cy="94" r="8.5" className="s-pop fill-none stroke-line" strokeWidth="1.25" strokeDasharray="3 3" style={s(0.66)} />
      {/* Cursor placing the hero block */}
      <path
        d="M118 54 L118 70 L122.5 65.5 L126 73 L129 71.5 L125.5 64.5 L131.5 64.5 Z"
        className="s-move fill-snow stroke-void"
        strokeWidth="1"
        strokeLinejoin="round"
        style={s(0.2)}
      />
    </>
  );
}

function Build() {
  const lines = [
    { x: 30, w: 52, tone: "fill-signal" },
    { x: 40, w: 70, tone: "fill-mist/70" },
    { x: 40, w: 44, tone: "fill-cyan" },
    { x: 50, w: 60, tone: "fill-mist/70" },
    { x: 40, w: 36, tone: "fill-terminal" },
    { x: 30, w: 20, tone: "fill-signal" },
  ];
  return (
    <>
      {/* Code written line by line */}
      <rect x="8" y="8" width="146" height="104" rx="10" className="fill-panel stroke-line" strokeWidth="1.25" />
      {lines.map((l, i) => (
        <g key={i}>
          <rect x="18" y={22 + i * 14} width="5" height="4" rx="2" className="fill-line" />
          <rect x={l.x} y={22 + i * 14} width={l.w} height="4" rx="2" className={`s-grow ${l.tone}`} style={s(0.04 + i * 0.07)} />
        </g>
      ))}
      {/* Built in stages */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="166" y={14 + i * 32} width="66" height="22" rx="6" className="fill-panel stroke-line" strokeWidth="1.25" />
          <rect x="169" y={17 + i * 32} width="44" height="16" rx="4" className="s-grow fill-signal/25" style={s(0.2 + i * 0.2)} />
          <Check x={222} y={25 + i * 32} at={0.3 + i * 0.2} />
        </g>
      ))}
    </>
  );
}

function Launch() {
  return (
    <>
      {/* Agreed features checked */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="16" cy={30 + i * 26} r="7" className="fill-none stroke-line" strokeWidth="1.25" />
          <Check x={16} y={30 + i * 26} at={0.06 + i * 0.1} />
          <rect x="30" y={28 + i * 26} width={58 - i * 10} height="4" rx="2" className="fill-slate" />
        </g>
      ))}
      {/* Handed over */}
      <path d="M96 56 C 120 56, 132 56, 160 56" className="fill-none stroke-line" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
      <path d="M96 56 C 120 56, 132 56, 160 56" pathLength={1} className="s-draw fill-none stroke-signal" strokeWidth="1.75" strokeLinecap="round" style={s(0.38)} />
      {/* The product, then live */}
      <rect x="166" y="18" width="66" height="78" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
      <rect x="176" y="40" width="40" height="5" rx="2.5" className="fill-snow/70" />
      <rect x="176" y="51" width="46" height="4" rx="2" className="fill-slate" />
      <rect x="176" y="60" width="32" height="4" rx="2" className="fill-slate" />
      <circle cx="221" cy="29" r="3.5" className="fill-slate" />
      <g className="s-pop" style={s(0.54)}>
        <circle cx="221" cy="29" r="7" className="a-pulse fill-none stroke-terminal" strokeWidth="1.25" />
        <circle cx="221" cy="29" r="3.5" className="fill-terminal" />
        <rect x="176" y="74" width="46" height="13" rx="6.5" className="fill-terminal/15 stroke-terminal/60" strokeWidth="1" />
        <rect x="186" y="79" width="26" height="3" rx="1.5" className="fill-terminal" />
      </g>
    </>
  );
}

function Support() {
  const beat = "M14 46 H52 L60 30 L70 62 L78 40 L84 46 H150";
  return (
    <>
      {/* Steady heartbeat */}
      <rect x="6" y="14" width="152" height="64" rx="10" className="fill-panel stroke-line" strokeWidth="1.25" />
      <path d={beat} className="fill-none stroke-line" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={beat} pathLength={1} className="a-beat fill-none stroke-terminal" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      {/* Updates, rolling on */}
      <g className="a-spin">
        <path d="M209 30.4 A 18 18 0 1 1 191 30.4" className="fill-none stroke-signal" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M183.8 29.9 L191 30.4 L187.8 36.9" className="fill-none stroke-signal" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Versions over time */}
      <rect x="6" y="90" width="44" height="18" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
      <rect x="18" y="97" width="20" height="4" rx="2" className="fill-slate" />
      <path d="M56 99 L64 99 M61 95.5 L64.5 99 L61 102.5" className="s-fade fill-none stroke-slate" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={s(0.3)} />
      <g className="s-pop" style={s(0.34)}>
        <rect x="70" y="90" width="44" height="18" rx="9" className="fill-signal/15 stroke-signal/50" strokeWidth="1.25" />
        <rect x="82" y="97" width="20" height="4" rx="2" className="fill-snow/70" />
      </g>
      <path d="M120 99 L128 99 M125 95.5 L128.5 99 L125 102.5" className="s-fade fill-none stroke-slate" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={s(0.6)} />
      <g className="s-pop" style={s(0.64)}>
        <rect x="134" y="90" width="58" height="18" rx="9" className="fill-terminal/15 stroke-terminal/60" strokeWidth="1.25" />
        <rect x="146" y="97" width="20" height="4" rx="2" className="fill-terminal" />
        <Check x={180} y={99} at={0.7} />
      </g>
    </>
  );
}
