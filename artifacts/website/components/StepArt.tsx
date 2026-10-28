"use client";

import { useRef, type CSSProperties } from "react";
import { d, useArtPlayback } from "./ServiceArt";

export type StepArtKind = "analysis" | "design" | "build" | "launch" | "support";

/*
 * Small line illustrations for the How we work steps, in the same idiom as
 * ServiceArt. Each acts out its step's description: a first call bringing up
 * the problem, goals, users and constraints, scoped and estimated; a key
 * screen going from wireframe to visual direction, then clicked through to the
 * next; code built in stages with progress discussed and a change made, on
 * the way to the goal; agreed features checked before going live; and a bug
 * fixed, an update rolled out and an improvement added.
 *
 * Each figure runs on one shared 7s timeline (--t on the svg, globals.css);
 * every part appears (or, with s-out, leaves) at its own point on it (--s, a
 * fraction of the cycle) and they all clear together at the end, so the
 * sequence restarts cleanly. The still drawing is the finished state: without
 * data-play, --t rests where everything has happened. Decorative: the step
 * text already says what it shows.
 */
export function StepArt({ kind, observe = true }: { kind: StepArtKind; observe?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useArtPlayback(ref, observe);

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

function Check({ x, y, at, className = "stroke-terminal" }: { x: number; y: number; at: number; className?: string }) {
  return (
    <path
      d={`M${x - 3.5} ${y} L${x - 1} ${y + 2.5} L${x + 3.5} ${y - 2.5}`}
      pathLength={1}
      className={`s-draw fill-none ${className}`}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={s(at)}
    />
  );
}

function Analysis() {
  const topics = ["problem", "goals", "users", "constraints"] as const;
  return (
    <>
      {/* The free first call */}
      <rect x="8" y="14" width="62" height="92" rx="10" className="fill-panel stroke-line" strokeWidth="1.25" />
      <circle cx="39" cy="42" r="13" className="fill-signal/15 stroke-signal/60" strokeWidth="1.25" />
      <circle cx="39" cy="38.5" r="4" className="fill-snow/80" />
      <path d="M31 51 A 8 6 0 0 1 47 51 Z" className="fill-snow/80" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={26 + i * 6} y="70" width="3" height="18" rx="1.5" className="a-wave fill-terminal" style={d(i * 0.14)} />
      ))}
      {/* What we clarify: the problem, goals, users and constraints */}
      {topics.map((topic, i) => {
        const y = 14 + i * 24;
        const cy = y + 10;
        return (
          <g key={topic} className="s-pop" style={s(0.14 + i * 0.08)}>
            <rect x="84" y={y} width="68" height="20" rx="6" className="fill-panel stroke-line" strokeWidth="1.25" />
            {topic === "problem" && (
              <g className="fill-none stroke-signal" strokeWidth="1.25" strokeLinecap="round">
                <circle cx="95" cy={cy} r="5.5" />
                <path d={`M95 ${cy - 3} V${cy + 0.5} M95 ${cy + 3} V${cy + 3.1}`} strokeWidth="1.5" />
              </g>
            )}
            {topic === "goals" && (
              <g className="fill-none stroke-terminal" strokeWidth="1.25">
                <circle cx="95" cy={cy} r="5.5" />
                <circle cx="95" cy={cy} r="2.5" />
              </g>
            )}
            {topic === "users" && (
              <g className="fill-none stroke-cyan" strokeWidth="1.25">
                <circle cx="93" cy={cy - 2} r="2" />
                <circle cx="98" cy={cy - 2} r="2" />
                <path d={`M89.5 ${cy + 5} A 3.5 3 0 0 1 96.5 ${cy + 5} M94.5 ${cy + 5} A 3.5 3 0 0 1 101.5 ${cy + 5}`} />
              </g>
            )}
            {topic === "constraints" && (
              <g className="fill-none stroke-mist" strokeWidth="1.25" strokeLinejoin="round">
                <rect x="91.5" y={cy - 1} width="7" height="6" rx="1.2" />
                <path d={`M93 ${cy - 1} V${cy - 3} A 2 2 0 0 1 97 ${cy - 3} V${cy - 1}`} />
              </g>
            )}
            <rect x="106" y={cy - 2} width={36 - i * 4} height="4" rx="2" className="fill-slate" />
          </g>
        );
      })}
      {/* Priorities and scope */}
      <path
        d="M158 16 Q163 16 163 21 V55 Q163 60 168 60 Q163 60 163 65 V99 Q163 104 158 104"
        pathLength={1}
        className="s-draw fill-none stroke-slate"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={s(0.5)}
      />
      {/* The estimate */}
      <g className="s-pop" style={s(0.62)}>
        <rect x="174" y="44" width="58" height="32" rx="9" className="fill-terminal/15 stroke-terminal/60" strokeWidth="1.25" />
        <circle cx="188" cy="60" r="6" className="fill-none stroke-terminal" strokeWidth="1.25" />
        <path d="M188 56.5 V60 L190.5 61.5" className="fill-none stroke-terminal" strokeWidth="1.25" strokeLinecap="round" />
        <rect x="199" y="54" width="24" height="4" rx="2" className="fill-terminal" />
        <rect x="199" y="62" width="16" height="4" rx="2" className="fill-terminal/60" />
      </g>
    </>
  );
}

function Design() {
  // Each wireframe part shows from `at` until the styled part replaces it at `until`.
  const wires = [
    { x: 18, y: 21, w: 46, h: 6, rx: 3, at: 0.04, until: 0.36 },
    { x: 18, y: 34, w: 92, h: 36, rx: 5, at: 0.08, until: 0.42 },
    { x: 18, y: 80, w: 44, h: 16, rx: 8, at: 0.12, until: 0.48 },
  ];
  return (
    <>
      {/* A key screen, as a wireframe first */}
      <rect x="8" y="10" width="112" height="100" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
      {wires.map((w) => (
        <g key={w.y} className="s-fade" style={s(w.at)}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={w.rx} className="s-out fill-none stroke-slate" strokeWidth="1" strokeDasharray="3 3" style={s(w.until)} />
        </g>
      ))}
      {/* The visual direction */}
      <circle cx="141" cy="24" r="6" className="s-pop fill-signal" style={s(0.2)} />
      <circle cx="141" cy="40" r="6" className="s-pop fill-cyan" style={s(0.24)} />
      <circle cx="141" cy="56" r="6" className="s-pop fill-terminal" style={s(0.28)} />
      {/* ...applied: how it will look */}
      <rect x="18" y="21" width="46" height="6" rx="3" className="s-grow fill-snow/80" style={s(0.34)} />
      <g className="s-fade" style={s(0.4)}>
        <rect x="18" y="34" width="92" height="36" rx="5" className="fill-signal/20 stroke-signal/60" strokeWidth="1.25" />
        <path d="M26 66 L44 48 L56 58 L66 50 L84 66 Z" className="fill-signal/40" />
        <circle cx="96" cy="45" r="4" className="fill-cyan" />
      </g>
      <g className="s-pop" style={s(0.46)}>
        <rect x="18" y="80" width="44" height="16" rx="8" className="fill-signal" />
        <rect x="28" y="86" width="24" height="4" rx="2" className="fill-white" />
      </g>
      {/* ...and how it works: a click leads to the next screen */}
      <path
        d="M48 88 L48 102 L51.5 98.5 L54.5 105 L57 104 L54 97.5 L59 97.5 Z"
        className="s-move fill-snow stroke-void"
        strokeWidth="1"
        strokeLinejoin="round"
        style={s(0.5)}
      />
      <path d="M66 88 C 104 88, 128 94, 156 80" pathLength={1} className="s-draw fill-none stroke-signal" strokeWidth="1.5" strokeLinecap="round" style={s(0.6)} />
      <path d="M151 77 L157 80 L152 85" className="s-fade fill-none stroke-signal" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s(0.66)} />
      <g className="s-pop" style={s(0.7)}>
        <rect x="162" y="18" width="68" height="88" rx="10" className="fill-panel stroke-line" strokeWidth="1.25" />
        <circle cx="196" cy="48" r="11" className="fill-terminal/15 stroke-terminal" strokeWidth="1.25" />
        <path d="M191 48 L194.5 51.5 L201 45" className="fill-none stroke-terminal" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="180" y="70" width="32" height="4" rx="2" className="fill-snow/70" />
        <rect x="184" y="80" width="24" height="4" rx="2" className="fill-slate" />
      </g>
    </>
  );
}

function Build() {
  // Code written in three stages.
  const lines = [
    { x: 20, y: 20, w: 48, tone: "fill-signal", at: 0.06 },
    { x: 28, y: 31, w: 64, tone: "fill-mist/70", at: 0.1 },
    { x: 28, y: 42, w: 52, tone: "fill-cyan", at: 0.4 },
    { x: 36, y: 53, w: 44, tone: "fill-mist/70", at: 0.44 },
    { x: 28, y: 64, w: 36, tone: "fill-terminal", at: 0.7 },
  ];
  return (
    <>
      <rect x="8" y="8" width="128" height="74" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
      {lines.map((l) => (
        <rect key={l.y} x={l.x} y={l.y} width={l.w} height="4" rx="2" className={`s-grow ${l.tone}`} style={s(l.at)} />
      ))}
      {/* A change agreed in the discussion */}
      <rect x="28" y="31" width="64" height="4" rx="2" className="s-grow fill-cyan" style={s(0.34)} />
      {/* Progress discussed */}
      <g className="s-pop" style={s(0.2)}>
        <rect x="146" y="10" width="72" height="24" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
        <rect x="156" y="16" width="44" height="4" rx="2" className="fill-slate" />
        <rect x="156" y="24" width="30" height="4" rx="2" className="fill-slate" />
      </g>
      <g className="s-pop" style={s(0.28)}>
        <rect x="158" y="40" width="74" height="22" rx="9" className="fill-signal/15 stroke-signal/50" strokeWidth="1.25" />
        <rect x="168" y="49" width="46" height="4" rx="2" className="fill-snow/70" />
      </g>
      {/* Stages, on the way to the original goal */}
      <path d="M8 100 H196" className="fill-none stroke-line" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={8 + i * 62} y="97" width="56" height="6" rx="3" className="s-grow fill-signal" style={s([0.1, 0.44, 0.74][i])} />
      ))}
      <circle cx="216" cy="100" r="12" className="fill-none stroke-line" strokeWidth="1.25" />
      <circle cx="216" cy="100" r="6.5" className="fill-none stroke-line" strokeWidth="1.25" />
      <g className="s-pop" style={s(0.84)}>
        <circle cx="216" cy="100" r="12" className="a-pulse fill-none stroke-terminal" strokeWidth="1.25" />
        <circle cx="216" cy="100" r="12" className="fill-terminal/15 stroke-terminal" strokeWidth="1.25" />
        <circle cx="216" cy="100" r="6.5" className="fill-none stroke-terminal" strokeWidth="1.25" />
        <circle cx="216" cy="100" r="2.5" className="fill-terminal" />
      </g>
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
  return (
    <>
      {/* The product in use, with room to grow */}
      <rect x="8" y="10" width="130" height="100" rx="9" className="fill-panel stroke-line" strokeWidth="1.25" />
      <rect x="18" y="20" width="50" height="5" rx="2.5" className="fill-snow/70" />
      <rect x="18" y="32" width="110" height="28" rx="5" className="fill-line" />
      <rect x="18" y="68" width="52" height="32" rx="5" className="fill-line" />
      <rect x="78" y="68" width="50" height="32" rx="5" className="fill-none stroke-slate" strokeWidth="1" strokeDasharray="3 3" />
      {/* A fix: the bug turns up, then is gone */}
      <g className="s-fade" style={s(0.06)}>
        <g className="s-out" style={s(0.24)}>
          <g className="fill-none stroke-snow/80" strokeWidth="1.25" strokeLinecap="round">
            <path d="M104 40 L101 37 M120 40 L123 37 M104 46 H100 M120 46 H124 M104 52 L101 55 M120 52 L123 55" />
          </g>
          <ellipse cx="112" cy="46" rx="7" ry="9" className="fill-cyan/30 stroke-cyan" strokeWidth="1.25" />
          <path d="M112 38 V54" className="stroke-cyan" strokeWidth="1" />
        </g>
      </g>
      <g className="s-pop" style={s(0.26)}>
        <circle cx="112" cy="46" r="9" className="fill-terminal" />
        <path d="M107.5 46.5 L110.8 49.8 L116.8 43" className="fill-none stroke-void" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* An update rolled out */}
      <g className="a-spin">
        <path d="M197.5 23 A 15 15 0 1 1 182.5 23" className="fill-none stroke-signal" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M176.5 22.5 L182.5 23 L180 28.5" className="fill-none stroke-signal" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="s-out" style={s(0.44)}>
        <rect x="160" y="66" width="62" height="20" rx="10" className="fill-panel stroke-line" strokeWidth="1.25" />
        <rect x="172" y="74" width="26" height="4" rx="2" className="fill-slate" />
      </g>
      <g className="s-pop" style={s(0.44)}>
        <rect x="160" y="66" width="62" height="20" rx="10" className="fill-signal/15 stroke-signal/60" strokeWidth="1.25" />
        <rect x="172" y="74" width="26" height="4" rx="2" className="fill-snow/80" />
        <Check x={210} y={76} at={0.5} className="stroke-signal" />
      </g>
      {/* An improvement added */}
      <g className="s-pop" style={s(0.68)}>
        <rect x="78" y="68" width="50" height="32" rx="5" className="fill-terminal/15 stroke-terminal/60" strokeWidth="1.25" />
        <path d="M103 78 V90 M97 84 H109" className="fill-none stroke-terminal" strokeWidth="1.75" strokeLinecap="round" />
      </g>
    </>
  );
}
