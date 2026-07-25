/**
 * Which projects get a full spread, and which diagram explains each one.
 *
 * Kept separate from content/projects.ts so the prose stays a shared source of
 * truth across branches. Everything here is presentation: the ordering, the
 * diagram binding, and the caption that tells you what to look at.
 */

export interface Spread {
  slug: string;
  /** Key into components/spreads/diagrams. */
  diagram: "sentinel" | "cuda" | "fpga" | "malloc" | "trading";
  /** Sits under the diagram. Says what the drawing is showing. */
  caption: string;
}

export const SPREADS: Spread[] = [
  {
    slug: "sentinel",
    diagram: "sentinel",
    caption:
      "Every tool call takes the same path. The gate is the only way through to a provider, and it refuses to pass anything that changes state unless the call carried confirm=true.",
  },
  {
    slug: "trading-agent",
    diagram: "trading",
    caption:
      "One model, four books, a hard stop at market open. The committee's verdicts and the guardrail clamps are both applied in code — the model's own numbers are inputs to that, never instructions.",
  },
  {
    slug: "gpt2-cuda",
    diagram: "cuda",
    caption:
      "The naive pass streams the whole attention working set through HBM on every step. Tiling keeps it resident in shared memory, so the expensive trip happens once per tile instead of once per step.",
  },
  {
    slug: "fpga-scheduler",
    diagram: "fpga",
    caption:
      "The same buffer crossed PCIe twice — once to reach the device, once to come back. Mapping one physical region into both address spaces removed both copies; that alone was the 2×.",
  },
  {
    slug: "malloc",
    diagram: "malloc",
    caption:
      "Because the free list is kept in address order, a freed block can look at the two blocks physically beside it and merge in place. No scan, no rebuild — coalescing is O(1).",
  },
];

/** Featured slugs, in spread order. */
export const FEATURED_SLUGS = SPREADS.map((s) => s.slug);
