"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  accent?: boolean;
}

export function SectionDivider({ label, accent = false }: SectionDividerProps) {
  return (
    <div className="relative px-6 md:px-12 py-6 border-t hairline">
      <div className="grid grid-cols-12 gap-x-6 items-center">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-7 origin-left h-px"
          style={{
            background: accent
              ? "linear-gradient(90deg, var(--color-accent), var(--color-magenta), transparent)"
              : "linear-gradient(90deg, var(--color-bone-2), transparent)",
          }}
        />
        {label && (
          <motion.span
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="col-span-12 md:col-span-5 small-caps md:text-right"
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
}
