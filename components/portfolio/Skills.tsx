"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export function Skills() {
  const entries = Object.entries(profile.skills) as [
    string,
    readonly string[],
  ][];

  return (
    <section
      id="skills"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">04</span>
            <span className="eyebrow">My stack</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] text-[color:var(--color-bone)] max-w-[22ch]">
            The tools I reach for, <span className="display-grad">ordered by depth.</span>
          </h2>

          <dl className="mt-16 space-y-10">
            {entries.map(([group, items], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="grid grid-cols-12 gap-x-4 gap-y-3 pb-10 border-b hairline last:border-b-0"
              >
                <dt className="col-span-12 md:col-span-3 small-caps pt-1 group">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                    {group}
                  </span>
                </dt>
                <dd className="col-span-12 md:col-span-9 text-[16px] md:text-[17px] leading-[1.85] text-[color:var(--color-bone-2)]">
                  {items.join(", ")}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
