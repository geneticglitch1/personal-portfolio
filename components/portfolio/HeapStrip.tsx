"use client";

import { useEffect, useRef } from "react";

/**
 * A live heap visualization rendered to canvas.
 * Runs a continuous first-fit allocator simulation:
 *   - tick every ~180–320ms: either allocate or free
 *   - allocation finds the first free block big enough and splits it
 *   - free marks a block free and coalesces with adjacent free neighbors
 * Uses a ref-only loop (no React re-renders) so the animation is cheap.
 */

const HEAP_CELLS = 256; // total cells
const ROWS = 4;
const COLS = HEAP_CELLS / ROWS;

type Block = {
  id: number;
  start: number;
  size: number;
  allocated: boolean;
  age: number; // ms since allocation
};

let nextId = 1;

function initHeap(): Block[] {
  return [{ id: nextId++, start: 0, size: HEAP_CELLS, allocated: false, age: 0 }];
}

function allocate(blocks: Block[]): Block[] {
  const size = 1 + Math.floor(Math.random() * 14);
  const i = blocks.findIndex((b) => !b.allocated && b.size >= size);
  if (i === -1) return blocks;
  const b = blocks[i];
  const out = [...blocks];
  if (b.size === size) {
    out[i] = { ...b, allocated: true, age: 0, id: nextId++ };
  } else {
    out.splice(
      i,
      1,
      { id: nextId++, start: b.start, size, allocated: true, age: 0 },
      {
        id: nextId++,
        start: b.start + size,
        size: b.size - size,
        allocated: false,
        age: 0,
      },
    );
  }
  return out;
}

function freeRandom(blocks: Block[]): Block[] {
  const allocated: number[] = [];
  blocks.forEach((b, i) => {
    if (b.allocated) allocated.push(i);
  });
  if (allocated.length === 0) return blocks;
  const pick = allocated[Math.floor(Math.random() * allocated.length)];
  const out = [...blocks];
  out[pick] = { ...out[pick], allocated: false, age: 0 };
  return coalesce(out);
}

function coalesce(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (const b of blocks) {
    const last = out[out.length - 1];
    if (
      last &&
      !last.allocated &&
      !b.allocated &&
      last.start + last.size === b.start
    ) {
      last.size += b.size;
    } else {
      out.push({ ...b });
    }
  }
  return out;
}

function tick(blocks: Block[]): Block[] {
  const used = blocks
    .filter((b) => b.allocated)
    .reduce((a, b) => a + b.size, 0);
  const utilization = used / HEAP_CELLS;
  const target = 0.58;
  const allocProb = utilization < target ? 0.74 : 0.3;
  return Math.random() < allocProb ? allocate(blocks) : freeRandom(blocks);
}

function draw(
  ctx: CanvasRenderingContext2D,
  blocks: Block[],
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  const cellW = w / COLS;
  const cellH = h / ROWS;
  const gap = Math.max(1, Math.min(cellW, cellH) * 0.18);

  for (const b of blocks) {
    for (let cell = b.start; cell < b.start + b.size; cell++) {
      const col = cell % COLS;
      const row = Math.floor(cell / COLS);
      const x = col * cellW;
      const y = row * cellH;
      ctx.fillStyle = b.allocated
        ? ageColor(b.age)
        : "rgba(30,30,46,0.55)";
      ctx.fillRect(x + gap / 2, y + gap / 2, cellW - gap, cellH - gap);
    }
  }
}

function ageColor(age: number): string {
  // hot (bright amber) → cooler (dim amber) over 5s
  const t = Math.min(1, age / 5000);
  const hot = [242, 201, 138]; // #f2c98a
  const cold = [120, 84, 42];  // #78542a
  const r = Math.round(hot[0] + (cold[0] - hot[0]) * t);
  const g = Math.round(hot[1] + (cold[1] - hot[1]) * t);
  const b = Math.round(hot[2] + (cold[2] - hot[2]) * t);
  return `rgb(${r},${g},${b})`;
}

export function HeapStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let blocks = initHeap();
    let raf = 0;
    let lastTick = 0;
    let lastFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: cw, clientHeight: ch } = canvas;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // seed a few allocations so the first frame isn't empty
    for (let i = 0; i < 12; i++) blocks = allocate(blocks);

    // Pause RAF when canvas is offscreen — saves CPU while user scrolls away
    let visible = true;
    const visObs = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) raf = requestAnimationFrame(loop);
      },
      { threshold: 0 },
    );
    visObs.observe(canvas);

    const loop = (t: number) => {
      const dt = t - lastFrame;
      lastFrame = t;

      blocks = blocks.map((b) =>
        b.allocated ? { ...b, age: b.age + dt } : b,
      );

      const interval = prefersReduced ? 1200 : 180 + Math.random() * 140;
      if (t - lastTick > interval) {
        lastTick = t;
        blocks = tick(blocks);
      }

      draw(ctx, blocks, canvas.clientWidth, canvas.clientHeight);
      if (visible) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      visObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-hidden="true"
    />
  );
}
