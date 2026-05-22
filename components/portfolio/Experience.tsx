"use client";

import { profile } from "@/content/profile";

export function Experience() {
  const jobs = profile.experience;

  return (
    <section
      id="experience"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">02</span>
            <span className="eyebrow">Experience</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <ol className="space-y-16">
            {jobs.map((job) => (
              <li key={job.company} className="relative">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
                  <div>
                    <h3 className="display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.04] text-[color:var(--color-bone)]">
                      {job.role}
                    </h3>
                    <div className="mt-2 text-[14px] text-[color:var(--color-bone-2)]">
                      {job.company}
                      <span className="text-[color:var(--color-muted)]">
                        {" · "}
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] md:text-right shrink-0">
                    {job.period}
                  </div>
                </div>

                {"headline" in job && job.headline && (
                  <p className="spread-intro mt-8 max-w-[58ch]">
                    {job.headline}
                  </p>
                )}

                <ul className="mt-8 space-y-5 border-l hairline-strong pl-6 max-w-[68ch]">
                  {job.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="text-[15px] leading-[1.72] text-[color:var(--color-bone-2)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
