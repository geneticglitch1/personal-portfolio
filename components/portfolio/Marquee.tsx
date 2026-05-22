"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
  accent?: string;
}

export function Marquee({
  items,
  speed = 60,
  className = "",
  reverse = false,
  accent = "var(--color-accent)",
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-speed, speed] : [speed, -speed]
  );

  const tripled = [...items, ...items, ...items];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border-y hairline py-6 md:py-8 ${className}`}
    >
      <motion.div
        style={{ x: `${reverse ? -50 : 0}%` }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex items-center gap-10 md:gap-16 whitespace-nowrap"
      >
        {tripled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display text-[clamp(1.8rem,4.5vw,3.5rem)] leading-none text-[color:var(--color-bone)] flex items-center gap-10 md:gap-16"
          >
            {item}
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: accent }}
            />
          </span>
        ))}
      </motion.div>

      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-30"
        aria-hidden
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          ↑ scroll
        </span>
      </motion.div>
    </div>
  );
}
