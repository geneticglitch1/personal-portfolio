"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { ProjectMetric } from "@/content/projects";

/** Counts a measured result up once, the first time it comes into view. */
export default function CountUp({ metric }: { metric: ProjectMetric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  // Start at the real figure so the prerendered HTML is correct for anyone
  // without JS; the effect winds it back to zero before counting up.
  const [text, setText] = useState(metric.value);

  useEffect(() => {
    if (reduced) {
      setText(metric.value);
      return;
    }
    if (!inView) {
      setText(`${metric.pre}${(0).toFixed(metric.dec)}${metric.suf}`);
      return;
    }
    const controls = animate(0, metric.count, {
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => setText(`${metric.pre}${v.toFixed(metric.dec)}${metric.suf}`),
      onComplete: () => setText(metric.value),
    });
    return () => controls.stop();
  }, [inView, reduced, metric]);

  return (
    <span className="v" ref={ref}>
      {text}
    </span>
  );
}
