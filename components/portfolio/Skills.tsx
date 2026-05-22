"use client";

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
            <span className="eyebrow">Stack</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[26ch]">
            The tools I reach for, ordered by depth.
          </h2>

          <dl className="mt-16 space-y-12">
            {entries.map(([group, items]) => (
              <div
                key={group}
                className="grid grid-cols-12 gap-x-4 gap-y-3 pb-12 border-b hairline last:border-b-0"
              >
                <dt className="col-span-12 md:col-span-3 small-caps pt-1">
                  {group}
                </dt>
                <dd className="col-span-12 md:col-span-9 text-[15px] md:text-[16px] leading-[1.85] text-[color:var(--color-bone-2)]">
                  {items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
