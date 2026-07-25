"use client";

import { useEffect, useState } from "react";
import { useScroll, useVelocity, useSpring, useMotionValueEvent } from "motion/react";

/**
 * Publishes scroll velocity to CSS as `--vel` (signed, clamped to -1..1) and
 * `--vel-abs` (its magnitude). One listener and one write per frame feeds every
 * velocity-reactive rule on the page — the paper skew, the grain, the ledger
 * riffle — without any of them needing their own JS.
 */
export default function ScrollVelocityProvider() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  // Heavy damping so the value trails the scroll rather than tracking it
  // exactly — that lag is what reads as physical weight.
  const smooth = useSpring(velocity, { stiffness: 180, damping: 40, mass: 0.6 });
  // Nothing reads --vel on touch or small screens (see globals.css), so don't
  // pay to compute and write it there either.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px), (hover: none)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useMotionValueEvent(smooth, "change", (v) => {
    if (!enabled) return;
    // ~2000 px/s saturates the effect.
    const norm = Math.max(-1, Math.min(1, v / 2000));
    const root = document.documentElement;
    root.style.setProperty("--vel", norm.toFixed(4));
    root.style.setProperty("--vel-abs", Math.abs(norm).toFixed(4));
  });

  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.style.removeProperty("--vel");
      root.style.removeProperty("--vel-abs");
    };
  }, []);

  return null;
}
