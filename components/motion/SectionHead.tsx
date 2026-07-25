"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface SectionHeadProps {
  n: string;
  eyebrow: string;
  title: string;
  right?: ReactNode;
}

/**
 * Section heading whose underline is drawn rather than painted — the rule
 * scales out from the left as the heading arrives, so it reads as a branch of
 * the ink spine running down the margin.
 */
export default function SectionHead({ n, eyebrow, title, right }: SectionHeadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="sechead" ref={ref}>
      <div className="h-left">
        <span className="lbl red">
          {n} / {eyebrow}
        </span>
        <h2>{title}</h2>
      </div>
      {right ? <div className="h-right">{right}</div> : null}
      <motion.i
        className="rule"
        aria-hidden="true"
        style={reduced ? undefined : { scaleX }}
      />
    </div>
  );
}
