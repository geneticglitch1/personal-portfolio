/**
 * Trace-view metadata: where each project sits in the stack, and when.
 *
 * Kept separate from content/projects.ts so the prose stays a shared source of
 * truth across branches — this file only adds the two axes the trace needs.
 *
 * Time is a decimal year (2025.5 === July 2025). Spans are at month
 * granularity, which is as precise as the underlying facts actually are.
 */

export interface Layer {
  id: string;
  label: string;
  sub: string;
  /** Heat ramp: cool at the top of the stack, hot at the bottom. */
  color: string;
}

/** Top of the stack first. Depth index === position in this array. */
export const LAYERS: Layer[] = [
  { id: "product", label: "Product", sub: "apps · extensions · interfaces", color: "#4E6273" },
  { id: "service", label: "Services", sub: "APIs · orchestration · infrastructure", color: "#3F7E85" },
  { id: "runtime", label: "Runtime", sub: "libraries · protocols · clients", color: "#4F9464" },
  { id: "os", label: "Operating system", sub: "processes · memory · syscalls", color: "#A08A32" },
  { id: "kernel", label: "Kernel / GPU", sub: "device code · on-disk formats", color: "#C4703A" },
  { id: "silicon", label: "Silicon", sub: "FPGA · microcontrollers · sensors", color: "#CE4B3C" },
];

export interface TraceSpan {
  slug: string;
  /** Index into LAYERS. */
  depth: number;
  start: number;
  end: number;
}

/** Bounds of the trace. */
export const T_START = 2024.0;
export const T_END = 2026.75;

export const SPANS: TraceSpan[] = [
  // ── Product ────────────────────────────────────────────────────────────
  { slug: "maze-robot", depth: 5, start: 2024.0, end: 2024.33 },
  { slug: "mnist-java", depth: 2, start: 2024.67, end: 2024.95 },
  { slug: "journaling", depth: 0, start: 2025.67, end: 2025.95 },
  { slug: "xraypdf", depth: 0, start: 2026.25, end: 2026.42 },
  { slug: "socratic", depth: 0, start: 2026.5, end: 2026.62 },
  { slug: "stint-studio", depth: 0, start: 2026.54, end: 2026.72 },

  // ── Services ───────────────────────────────────────────────────────────
  { slug: "k3s-homelab", depth: 1, start: 2024.0, end: T_END },
  { slug: "urban-analytics", depth: 1, start: 2025.67, end: 2025.95 },
  { slug: "seafile-mtls", depth: 2, start: 2026.08, end: 2026.25 },
  { slug: "schema", depth: 1, start: 2026.08, end: 2026.42 },
  { slug: "envsync", depth: 1, start: 2026.17, end: 2026.5 },
  { slug: "sentinel", depth: 1, start: 2026.25, end: 2026.62 },
  { slug: "trading-agent", depth: 1, start: 2026.42, end: 2026.6 },
  { slug: "minecraft-craftdeck", depth: 1, start: 2026.5, end: 2026.62 },

  // ── OS ─────────────────────────────────────────────────────────────────
  { slug: "sshell", depth: 3, start: 2025.08, end: 2025.25 },
  { slug: "parallel-make", depth: 3, start: 2025.17, end: 2025.33 },
  { slug: "nonstop-networking", depth: 3, start: 2025.25, end: 2025.42 },
  { slug: "malloc", depth: 3, start: 2025.33, end: 2025.5 },

  // ── Kernel / GPU ───────────────────────────────────────────────────────
  { slug: "finding-filesystems", depth: 4, start: 2025.0, end: 2025.17 },
  { slug: "gpt2-cuda", depth: 4, start: 2026.08, end: 2026.42 },

  // ── Silicon ────────────────────────────────────────────────────────────
  { slug: "fpga-scheduler", depth: 5, start: 2025.37, end: 2025.67 },
];

/** The employment track, drawn above the stack lanes. */
export const EMPLOYMENT = [
  {
    org: "University of Illinois Chicago",
    role: "Systems Engineer",
    start: 2025.37,
    end: 2025.67,
  },
];

/** Point events, flagged on the ruler. */
export const MARKERS = [
  { at: 2025.42, label: "1st · CS 341 malloc contest" },
  { at: 2025.75, label: "4th · UIUC CTF" },
  { at: 2024.25, label: "5th · Science Olympiad" },
];

/** "Jul 2025" from a decimal year. */
export function formatTime(t: number): string {
  const year = Math.floor(t);
  const month = Math.min(11, Math.max(0, Math.round((t - year) * 12)));
  const names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${names[month]} ${year}`;
}

/**
 * Greedy interval packing: within a lane, spans that overlap in time get
 * pushed onto successive rows so nothing is drawn on top of anything else.
 * Returns the row index per span plus the row count for the lane.
 */
export function packLane(spans: TraceSpan[]): { rows: Map<string, number>; count: number } {
  const ordered = [...spans].sort((a, b) => a.start - b.start);
  const rowEnds: number[] = [];
  const rows = new Map<string, number>();

  for (const s of ordered) {
    let row = rowEnds.findIndex((end) => end <= s.start);
    if (row === -1) {
      row = rowEnds.length;
      rowEnds.push(s.end);
    } else {
      rowEnds[row] = s.end;
    }
    rows.set(s.slug, row);
  }
  return { rows, count: Math.max(1, rowEnds.length) };
}
