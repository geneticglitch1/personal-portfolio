"use client";

import { useEffect, useRef } from "react";

// ─── Reference coordinate space (900 × 290) ──────────────────────────────────
const RW = 900;
const RH = 290;

// ─── Chain node geometry ──────────────────────────────────────────────────────
const CNW = 104; // chain node width
const CNH = 52;  // chain node height
const CNY = 145; // all chain nodes at this vertical center

type ChainNode = {
  id: string;
  cx: number;
  cy: number;
  color: string;
  label: string;
  sub: string;
};

const CHAIN: ChainNode[] = [
  { id: "internet",   cx:  58, cy: CNY, color: "#78abff", label: "INTERNET",   sub: "PUBLIC" },
  { id: "cloudflare", cx: 200, cy: CNY, color: "#f38020", label: "CLOUDFLARE", sub: "CDN · WAF" },
  { id: "xfinity",    cx: 342, cy: CNY, color: "#b7acd9", label: "XFINITY",    sub: "1Gbps ISP" },
  { id: "opnsense",   cx: 468, cy: CNY, color: "#e6a655", label: "OPNSENSE",   sub: "FW · NAT" },
];

// ─── K3s cluster geometry ─────────────────────────────────────────────────────
const CX  = 540;  // cluster left x
const CY  = 18;   // cluster top y
const CW  = 340;  // cluster width
const CH  = 254;  // cluster height
const K3W = 84;   // k3s node width
const K3H = 55;   // k3s node height

type K3sNode = {
  id: string;
  cx: number;
  cy: number;
  color: string;
  label: string;
  sub: string;
  isCtrl: boolean;
};

function buildK3s(): K3sNode[] {
  const defs = [
    { id: "ctrl", label: "CTRL",  sub: "ctrl-plane", color: "#326ce5", isCtrl: true  },
    { id: "w1",   label: "W-1",   sub: "worker",     color: "#4ade80", isCtrl: false },
    { id: "w2",   label: "W-2",   sub: "worker",     color: "#4ade80", isCtrl: false },
    { id: "w3",   label: "W-3",   sub: "worker",     color: "#4ade80", isCtrl: false },
    { id: "w4",   label: "W-4",   sub: "worker",     color: "#4ade80", isCtrl: false },
    { id: "w5",   label: "W-5",   sub: "worker",     color: "#4ade80", isCtrl: false },
  ] as const;
  const cols = 3, rows = 2;
  const gx = (CW - cols * K3W) / (cols + 1); // ≈ 22
  const gy = (CH - rows * K3H) / (rows + 1); // ≈ 48
  return defs.map((d, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return {
      ...d,
      cx: CX + gx * (c + 1) + K3W * c + K3W / 2,
      cy: CY + gy * (r + 1) + K3H * r + K3H / 2,
    };
  });
}
const K3S = buildK3s();

// ─── Packet type ──────────────────────────────────────────────────────────────
type Pkt = {
  id: number;
  x0: number; y0: number;
  x1: number; y1: number;
  t: number;
  spd: number;
  clr: string;
  tid: string; // target node id
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const hexCache = new Map<string, [number, number, number]>();
function parseHex(h: string): [number, number, number] {
  if (hexCache.has(h)) return hexCache.get(h)!;
  const n = parseInt(h.slice(1), 16);
  const v: [number, number, number] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  hexCache.set(h, v);
  return v;
}

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r = 4,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawChainNode(
  ctx: CanvasRenderingContext2D,
  n: ChainNode,
  pulse: number,
) {
  const { cx, cy, color, label, sub } = n;
  const x = cx - CNW / 2, y = cy - CNH / 2;

  ctx.save();
  if (pulse > 0.02) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 14 * pulse;
  }
  rrect(ctx, x, y, CNW, CNH);
  ctx.fillStyle = "rgba(9,8,25,0.92)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.45 + pulse * 0.55;
  ctx.lineWidth = 1 + pulse * 0.8;
  ctx.stroke();
  ctx.restore();

  // Status dot
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.75 + pulse * 0.25;
  ctx.beginPath();
  ctx.arc(x + 9, y + 9, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Label
  ctx.fillStyle = color;
  ctx.font = `700 8px "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cx, cy - 7);

  // Sub
  ctx.fillStyle = "#b7acd9";
  ctx.font = `400 6.5px "JetBrains Mono", monospace`;
  ctx.fillText(sub, cx, cy + 8);
}

function drawK3sNode(
  ctx: CanvasRenderingContext2D,
  n: K3sNode,
  pulse: number,
) {
  const { cx, cy, color, label, sub } = n;
  const x = cx - K3W / 2, y = cy - K3H / 2;

  ctx.save();
  if (pulse > 0.02) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12 * pulse;
  }
  rrect(ctx, x, y, K3W, K3H, 3);
  ctx.fillStyle = "rgba(7,7,18,0.95)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.38 + pulse * 0.62;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // Pulse indicator
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.55 + pulse * 0.45;
  ctx.beginPath();
  ctx.arc(cx, cy - K3H / 2 + 8, 2.5 + pulse * 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Label
  ctx.fillStyle = color;
  ctx.font = `700 7px "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cx, cy + 3);

  // Sub
  ctx.fillStyle = "#6d6d80";
  ctx.font = `400 6px "JetBrains Mono", monospace`;
  ctx.fillText(sub, cx, cy + 14);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function NetworkMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mutable animation state (no React re-renders)
    let pkts: Pkt[] = [];
    let nextId = 1;
    const chainPulse = new Map<string, number>(CHAIN.map(n => [n.id, 0]));
    const k3sPulse   = new Map<string, number>(K3S.map(n => [n.id, 0]));

    // Timing for packet spawning
    let tChain    = 0;
    let tK3s      = 0;
    let tInternal = 0;

    // Canvas transform (reference → device pixels)
    let canvasW = 0, canvasH = 0;
    let drawScale = 1, drawOX = 0, drawOY = 0;

    const computeTransform = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw  = canvas.clientWidth;
      const ch  = canvas.clientHeight;
      canvas.width  = cw * dpr;
      canvas.height = ch * dpr;
      canvasW = cw * dpr;
      canvasH = ch * dpr;
      const s = Math.min(cw / RW, ch / RH) * dpr;
      drawScale = s;
      drawOX = (canvasW - RW * s) / 2;
      drawOY = (canvasH - RH * s) / 2;
    };
    computeTransform();
    window.addEventListener("resize", computeTransform);

    const setRefTransform = () => {
      ctx.setTransform(drawScale, 0, 0, drawScale, drawOX, drawOY);
    };

    // Spawn helpers
    const spawnChainPkt = (now: number) => {
      const gap = pref ? 3000 : 280 + Math.random() * 320;
      if (now - tChain < gap) return;
      tChain = now;
      const i = Math.floor(Math.random() * (CHAIN.length - 1));
      const a = CHAIN[i], b = CHAIN[i + 1];
      pkts.push({
        id: nextId++,
        x0: a.cx + CNW / 2, y0: a.cy,
        x1: b.cx - CNW / 2, y1: b.cy,
        t: 0,
        spd: 0.007 + Math.random() * 0.004,
        clr: a.color,
        tid: b.id,
      });
    };

    const spawnK3sPkt = (now: number) => {
      const gap = pref ? 4000 : 380 + Math.random() * 440;
      if (now - tK3s < gap) return;
      tK3s = now;
      const opn = CHAIN[CHAIN.length - 1];
      const target = K3S[Math.floor(Math.random() * K3S.length)];
      pkts.push({
        id: nextId++,
        x0: opn.cx + CNW / 2, y0: opn.cy,
        x1: target.cx, y1: target.cy,
        t: 0,
        spd: 0.0045 + Math.random() * 0.003,
        clr: opn.color,
        tid: target.id,
      });
    };

    const spawnInternalPkt = (now: number) => {
      const gap = pref ? 5000 : 600 + Math.random() * 700;
      if (now - tInternal < gap) return;
      tInternal = now;
      const a = K3S[Math.floor(Math.random() * K3S.length)];
      const b = K3S[Math.floor(Math.random() * K3S.length)];
      if (a.id === b.id) return;
      pkts.push({
        id: nextId++,
        x0: a.cx, y0: a.cy,
        x1: b.cx, y1: b.cy,
        t: 0,
        spd: 0.009 + Math.random() * 0.006,
        clr: "#4ade80",
        tid: b.id,
      });
    };

    let raf = 0, lastT = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - lastT, 50);
      lastT = now;

      // Spawn
      spawnChainPkt(now);
      spawnK3sPkt(now);
      spawnInternalPkt(now);

      // Advance packets, collect arrivals
      const arrived: Pkt[] = [];
      pkts = pkts.filter(p => {
        p.t += p.spd * (dt / 16);
        if (p.t >= 1) { arrived.push(p); return false; }
        return true;
      });
      for (const p of arrived) {
        if (chainPulse.has(p.tid)) chainPulse.set(p.tid, 1);
        if (k3sPulse.has(p.tid))  k3sPulse.set(p.tid, 1);
      }

      // Decay pulses
      const decay = dt * 0.0028;
      chainPulse.forEach((v, k) => chainPulse.set(k, Math.max(0, v - decay)));
      k3sPulse.forEach((v, k)   => k3sPulse.set(k, Math.max(0, v - decay)));

      // ─── Draw ──────────────────────────────────────────────────────────────

      // Clear (reset transform, clear device pixels, restore ref transform)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasW, canvasH);
      setRefTransform();

      // DMZ zone (shaded between Xfinity right edge and cluster left)
      const dmzX  = CHAIN[2].cx + CNW / 2 + 6;
      const dmzW  = CX - 4 - dmzX;
      const dmzY  = 12, dmzH = RH - 24;
      ctx.fillStyle = "rgba(230,166,85,0.04)";
      ctx.fillRect(dmzX, dmzY, dmzW, dmzH);
      ctx.strokeStyle = "rgba(230,166,85,0.18)";
      ctx.lineWidth = 0.7;
      ctx.setLineDash([3, 4]);
      ctx.strokeRect(dmzX, dmzY, dmzW, dmzH);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(230,166,85,0.45)";
      ctx.font = `600 6.5px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("DMZ", dmzX + dmzW / 2, dmzY + 4);

      // K3s cluster box
      rrect(ctx, CX, CY, CW, CH, 6);
      ctx.fillStyle = "rgba(50,108,229,0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(50,108,229,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(50,108,229,0.5)";
      ctx.font = `600 6.5px "JetBrains Mono", monospace`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("K3S CLUSTER / 6 NODES", CX + CW - 8, CY + 5);

      // Static connection lines (chain)
      ctx.strokeStyle = "#352b52";
      ctx.lineWidth = 1;
      for (let i = 0; i < CHAIN.length - 1; i++) {
        const a = CHAIN[i], b = CHAIN[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.cx + CNW / 2, a.cy);
        ctx.lineTo(b.cx - CNW / 2, b.cy);
        ctx.stroke();
      }

      // Fan lines: OPNsense → each K3s node
      const opn = CHAIN[CHAIN.length - 1];
      ctx.strokeStyle = "#352b52";
      for (const kn of K3S) {
        ctx.beginPath();
        ctx.moveTo(opn.cx + CNW / 2, opn.cy);
        ctx.lineTo(kn.cx, kn.cy);
        ctx.stroke();
      }

      // K3s internal mesh (very faint)
      ctx.strokeStyle = "rgba(74,222,128,0.07)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < K3S.length; i++) {
        for (let j = i + 1; j < K3S.length; j++) {
          ctx.beginPath();
          ctx.moveTo(K3S[i].cx, K3S[i].cy);
          ctx.lineTo(K3S[j].cx, K3S[j].cy);
          ctx.stroke();
        }
      }

      // K3s nodes
      for (const n of K3S) {
        drawK3sNode(ctx, n, k3sPulse.get(n.id) ?? 0);
      }

      // Chain nodes (drawn after lines so they sit on top)
      for (const n of CHAIN) {
        drawChainNode(ctx, n, chainPulse.get(n.id) ?? 0);
      }

      // Packets (drawn last — on top of everything)
      for (const p of pkts) {
        const px = lerp(p.x0, p.x1, p.t);
        const py = lerp(p.y0, p.y1, p.t);

        // Trail
        const trailT  = Math.max(0, p.t - 0.14);
        const tx = lerp(p.x0, p.x1, trailT);
        const ty = lerp(p.y0, p.y1, trailT);
        const [r, g, b] = parseHex(p.clr);
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0.55)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Head glow
        ctx.save();
        ctx.shadowColor = p.clr;
        ctx.shadowBlur  = 7;
        ctx.fillStyle   = p.clr;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (visible) raf = requestAnimationFrame(frame);
    };

    // Pause when off-screen
    let visible = false;
    const visObs = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 },
    );
    visObs.observe(canvas);

    // Wait for JetBrains Mono before first frame so text is sharp immediately
    document.fonts.ready.then(() => {
      if (visible) raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", computeTransform);
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
