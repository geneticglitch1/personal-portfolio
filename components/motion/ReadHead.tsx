"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ReadHeadProps {
  children: ReactNode;
  className?: string;
  /** Viewport fraction where the reveal begins (1 = bottom edge). */
  start?: number;
  /** Viewport fraction where the reveal completes. */
  end?: number;
  /** Hide the traveling accent edge — useful for small inline blocks. */
  bare?: boolean;
}

/**
 * The signature reveal: content is exposed by a horizontal edge whose position
 * is bound to the block's own scroll progress, with an accent hairline riding
 * that edge. Because it reads scroll *position* rather than firing once on
 * entry, scrolling back up un-develops the block.
 *
 * The pre-hydration hidden state lives in CSS (`html.motion [data-readhead]`)
 * so nothing flashes before motion takes over.
 */
export default function ReadHead({
  children,
  className,
  start = 0.92,
  end = 0.45,
  bare = false,
}: ReadHeadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `start ${end}`],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const edgeTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Fade the hairline out at both ends so it doesn't park at the block edges.
  const edgeOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`rh${className ? ` ${className}` : ""}`}>
      <motion.div data-readhead style={{ clipPath }}>
        {children}
      </motion.div>
      {!bare && (
        <motion.div
          className="rh-line"
          aria-hidden="true"
          style={{ top: edgeTop, opacity: edgeOpacity }}
        />
      )}
    </div>
  );
}
