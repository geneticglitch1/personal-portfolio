"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * One continuous ink stroke drawn down the left margin as the page is read.
 * `pathLength` is animated directly by motion, so there's no dash-offset math,
 * and the spring is what keeps the stroke from tracking the scroll rigidly.
 *
 * Hidden below 900px and under reduced motion (see globals.css).
 */
export default function InkSpine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const headTop = useTransform(drawn, (p) => `${p * 100}%`);

  if (reduced) return null;

  return (
    <div className="spine" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 22 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 11 0 L 11 1000"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: drawn }}
        />
      </svg>
      <motion.span className="spine-head" style={{ top: headTop }} />
    </div>
  );
}
