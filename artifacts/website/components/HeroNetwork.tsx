"use client";

import { useEffect, useRef } from "react";

/*
 * The Neurobit neuron network, drawn on a 2D canvas.
 * Four tiers of hub nodes (laid out like client → edge → services → data), each with a
 * small cluster of satellites. Hubs link to the next tier; packets travel
 * along those links. Nodes pulse, links fade in and out.
 *
 * Runs only while on screen and the tab is visible; under
 * prefers-reduced-motion it renders a single static frame.
 * Colours come from the theme tokens and are re-read when the theme changes.
 */

export const TONES = ["signal", "cyan", "terminal"] as const;
export type Tone = (typeof TONES)[number];
export type Rgb = readonly [number, number, number];

const COLORS = { signal: "signal", cyan: "cyan", terminal: "terminal" } as const satisfies Record<Tone, Tone>;

export function readPalette(): Record<Tone, Rgb> {
  const style = getComputedStyle(document.documentElement);
  const palette = {} as Record<Tone, Rgb>;
  for (const tone of TONES) {
    const hex = style.getPropertyValue(`--color-${tone}`).trim().replace("#", "");
    palette[tone] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) || 0) as unknown as Rgb;
  }
  return palette;
}

type Node = {
  x: number; // 0..1 of width
  y: number; // 0..1 of height
  ox: number; // satellite offset, in units of min(width, height)
  oy: number;
  r: number;
  color: Tone;
  phase: number;
  hub: boolean;
};

type Edge = {
  a: number;
  b: number;
  color: Tone;
  base: number;
  speed: number;
  phase: number;
  /** Edges that fully fade out at the bottom of their cycle. */
  blinks: boolean;
};

type Packet = { edge: number; speed: number; offset: number };

const TIER_X = [0.12, 0.38, 0.62, 0.88];
const HUBS_PER_TIER = [3, 2, 4, 3];

// Deterministic PRNG so the layout is identical on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(7);
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const tiers: number[][] = [];

  const edge = (a: number, b: number, color: Tone, base: number, blinks: boolean) =>
    edges.push({ a, b, color, base, blinks, speed: 0.25 + rand() * 0.45, phase: rand() * Math.PI * 2 });

  HUBS_PER_TIER.forEach((count, t) => {
    const hubs: number[] = [];
    for (let i = 0; i < count; i++) {
      const y = 0.16 + ((i + 0.5) / count) * 0.68 + (rand() - 0.5) * 0.06;
      const x = TIER_X[t] + (rand() - 0.5) * 0.05;
      const hub = nodes.length;
      const isData = t === HUBS_PER_TIER.length - 1;
      nodes.push({
        x, y, ox: 0, oy: 0, r: 3, hub: true, phase: rand() * Math.PI * 2,
        color: isData ? COLORS.terminal : t === 0 ? COLORS.cyan : COLORS.signal,
      });
      hubs.push(hub);

      // Satellite cluster around the hub.
      const sats = 3 + Math.floor(rand() * 3);
      const start = rand() * Math.PI * 2;
      for (let s = 0; s < sats; s++) {
        const angle = start + (s / sats) * Math.PI * 2 + (rand() - 0.5) * 0.5;
        const dist = 0.045 + rand() * 0.035;
        const sat = nodes.length;
        nodes.push({
          x, y, ox: Math.cos(angle) * dist, oy: Math.sin(angle) * dist,
          r: 2, hub: false, phase: rand() * Math.PI * 2,
          color: rand() < 0.15 ? COLORS.terminal : COLORS.cyan,
        });
        edge(hub, sat, COLORS.cyan, 0.32, rand() < 0.4);
      }
    }
    tiers.push(hubs);
  });

  // Links between adjacent tiers: every hub reaches its nearest neighbours.
  const packetEdges: number[] = [];
  for (let t = 0; t < tiers.length - 1; t++) {
    const linked = new Set<number>();
    for (const a of tiers[t]) {
      const near = [...tiers[t + 1]].sort((p, q) => Math.abs(nodes[p].y - nodes[a].y) - Math.abs(nodes[q].y - nodes[a].y));
      const take = rand() < 0.5 ? 2 : 1;
      for (const b of near.slice(0, take)) {
        packetEdges.push(edges.length);
        edge(a, b, COLORS.signal, 0.55, false);
        linked.add(b);
      }
    }
    for (const b of tiers[t + 1]) {
      if (linked.has(b)) continue;
      const a = tiers[t][Math.floor(rand() * tiers[t].length)];
      packetEdges.push(edges.length);
      edge(a, b, COLORS.signal, 0.55, false);
    }
  }

  // Service mesh: faint vertical links inside the services tier.
  const services = tiers[2];
  for (let i = 0; i < services.length - 1; i++) edge(services[i], services[i + 1], COLORS.signal, 0.22, true);

  // A couple of long links that skip a tier.
  edge(tiers[0][0], tiers[2][1], COLORS.cyan, 0.18, true);
  edge(tiers[1][1], tiers[3][2], COLORS.cyan, 0.18, true);

  const packets: Packet[] = [];
  for (let i = 0; i < 9; i++) {
    packets.push({
      edge: packetEdges[Math.floor(rand() * packetEdges.length)],
      speed: 0.12 + rand() * 0.12,
      offset: rand(),
    });
  }

  return { nodes, edges, packets };
}

const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { nodes, edges, packets } = buildGraph();
    let palette = readPalette();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let unit = 0;
    let time = 0;
    let last = 0;
    let frame = 0;
    let onScreen = false;

    const px = new Float32Array(nodes.length);
    const py = new Float32Array(nodes.length);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      unit = Math.min(width, height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number, animated: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Positions, with a slow drift so the system feels alive.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const drift = animated ? 2.5 : 0;
        px[i] = n.x * width + n.ox * unit + Math.sin(t * 0.35 + n.phase) * drift;
        py[i] = n.y * height + n.oy * unit + Math.cos(t * 0.3 + n.phase * 1.3) * drift;
      }

      ctx.lineWidth = 1;
      for (const e of edges) {
        let alpha = e.base;
        if (animated) {
          const wave = 0.5 + 0.5 * Math.sin(t * e.speed + e.phase);
          alpha *= e.blinks ? wave * wave : 0.45 + 0.55 * wave;
        }
        if (alpha < 0.01) continue;
        ctx.strokeStyle = rgba(palette[e.color], alpha);
        ctx.beginPath();
        ctx.moveTo(px[e.a], py[e.a]);
        ctx.lineTo(px[e.b], py[e.b]);
        ctx.stroke();
      }

      if (animated) {
        for (const p of packets) {
          const e = edges[p.edge];
          const k = (t * p.speed + p.offset) % 1;
          const fade = Math.sin(k * Math.PI);
          ctx.fillStyle = rgba(palette.cyan, 0.9 * fade);
          ctx.beginPath();
          ctx.arc(px[e.a] + (px[e.b] - px[e.a]) * k, py[e.a] + (py[e.b] - py[e.a]) * k, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = animated ? 0.5 + 0.5 * Math.sin(t * 1.1 + n.phase) : 0.5;
        if (n.hub) {
          ctx.fillStyle = rgba(palette[n.color], 0.08 + 0.1 * pulse);
          ctx.beginPath();
          ctx.arc(px[i], py[i], n.r + 3 + pulse * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(palette[n.color], n.hub ? 0.95 : 0.55 + 0.35 * pulse);
        ctx.beginPath();
        ctx.arc(px[i], py[i], n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      draw(time, true);
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };

    const update = () => {
      const animate = onScreen && !motion.matches && document.visibilityState === "visible";
      if (animate && !frame) frame = requestAnimationFrame(tick);
      if (!animate) {
        stop();
        if (motion.matches) draw(0, false);
      }
    };

    resize();
    draw(0, !motion.matches);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(time, !motion.matches);
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    visibility.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (!frame) draw(time, !motion.matches);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      stop();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibility.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Absolutely positioned so the drawing buffer size (set in resize()) never feeds back
  // into the hero grid's row height; the parent alone decides the canvas size.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_55%,transparent_100%)]"
    />
  );
}
