"use client";

import { useEffect, useRef } from "react";
import { readPalette, TONES, type Rgb, type Tone } from "./HeroNetwork";

/*
 * Site-wide background: a slow field of neurons behind every page.
 * Nodes drift and link up when they come close; now and then a signal runs
 * along a link and the neuron it reaches lights up. On a mouse, nearby
 * neurons reach toward the pointer.
 *
 * Kept faint so text stays readable in both themes. Colours come from the
 * theme tokens and are re-read when the theme changes. It pauses while the
 * tab is hidden, and under prefers-reduced-motion it draws a single still frame.
 */

type Neuron = { x: number; y: number; vx: number; vy: number; r: number; tone: Tone; fire: number };
type Signal = { a: number; b: number; t: number; speed: number };

const LINK = 150; // px: neurons closer than this are linked
const POINTER = 190; // px: reach toward the mouse
const DENSITY = 21000; // px² of viewport per neuron
const MIN_NEURONS = 26;
const MAX_NEURONS = 84;

// Per-theme strength: white needs slightly stronger lines than near-black to read the same.
const STRENGTH = {
  dark: { line: 0.24, node: 0.55, signal: 0.85, width: 1 },
  light: { line: 0.5, node: 0.75, signal: 0.9, width: 1.25 },
};

const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

function spawn(width: number, height: number): Neuron {
  const angle = Math.random() * Math.PI * 2;
  const speed = 4 + Math.random() * 10; // px per second
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 1 + Math.random() * 1.3,
    tone: TONES[Math.floor(Math.random() * TONES.length)],
    fire: 0,
  };
}

export function NeuronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readPalette();
    let strength = document.documentElement.dataset.theme === "light" ? STRENGTH.light : STRENGTH.dark;
    let width = 0;
    let height = 0;
    let neurons: Neuron[] = [];
    let signals: Signal[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let last = 0;
    let nextSignal = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const prevW = width || window.innerWidth;
      const prevH = height || window.innerHeight;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep existing neurons in place (scaled), then match the count to the new area.
      for (const n of neurons) {
        n.x *= width / prevW;
        n.y *= height / prevH;
      }
      const target = Math.max(MIN_NEURONS, Math.min(MAX_NEURONS, Math.round((width * height) / DENSITY)));
      while (neurons.length < target) neurons.push(spawn(width, height));
      if (neurons.length > target) neurons = neurons.slice(0, target);
      signals = signals.filter((s) => s.a < neurons.length && s.b < neurons.length);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = strength.width;

      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i];
        for (let j = i + 1; j < neurons.length; j++) {
          const b = neurons[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          ctx.strokeStyle = rgba(palette[a.tone], (1 - d / LINK) * strength.line);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pointer) {
        for (const n of neurons) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d > POINTER) continue;
          ctx.strokeStyle = rgba(palette.signal, (1 - d / POINTER) * strength.line * 1.6);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      for (const s of signals) {
        const a = neurons[s.a];
        const b = neurons[s.b];
        ctx.fillStyle = rgba(palette.cyan, strength.signal * Math.sin(s.t * Math.PI));
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * s.t, a.y + (b.y - a.y) * s.t, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of neurons) {
        if (n.fire > 0.02) {
          ctx.fillStyle = rgba(palette[n.tone], 0.18 * n.fire);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 6 * n.fire, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(palette[n.tone], Math.min(1, strength.node + 0.45 * n.fire));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const startSignal = () => {
      // Pick a random neuron and send a signal to one of its current neighbours.
      const a = Math.floor(Math.random() * neurons.length);
      const near: number[] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (j !== a && Math.hypot(neurons[a].x - neurons[j].x, neurons[a].y - neurons[j].y) < LINK) near.push(j);
      }
      if (near.length) signals.push({ a, b: near[Math.floor(Math.random() * near.length)], t: 0, speed: 0.7 + Math.random() * 0.5 });
    };

    const step = (dt: number, now: number) => {
      for (const n of neurons) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
        n.fire = Math.max(0, n.fire - dt * 1.2);
      }
      for (const s of signals) s.t += s.speed * dt;
      for (const s of signals) if (s.t >= 1) neurons[s.b].fire = 1;
      signals = signals.filter((s) => s.t < 1);
      if (now > nextSignal && signals.length < 6) {
        startSignal();
        nextSignal = now + 350 + Math.random() * 650;
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      step(dt, now);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };

    const update = () => {
      const animate = !motion.matches && document.visibilityState === "visible";
      if (animate && !frame) frame = requestAnimationFrame(tick);
      if (!animate) {
        stop();
        draw();
      }
    };

    const onResize = () => {
      resize();
      if (!frame) draw();
    };
    const onPointer = (e: PointerEvent) => {
      pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    };
    const onLeave = () => (pointer = null);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      strength = document.documentElement.dataset.theme === "light" ? STRENGTH.light : STRENGTH.dark;
      if (!frame) draw();
    });

    resize();
    draw();
    update();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      themeObserver.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 size-full" />;
}
