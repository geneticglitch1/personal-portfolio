"use client";

import { profile } from "@/content/profile";

const FRAME_FILES = [
  ["scheduler_dilemma.cc", 42],
  ["host_memory_map.cc", 108],
  ["writer_reader_logger.cc", 210],
  ["hls_kernel.vhd", 66],
  ["main.c", 12],
  ["dispatch.c", 88],
] as const;

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
            <span className="eyebrow">Experience / Stack Trace</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <div className="mono-meta mb-4">
            # Traceback (most recent call last)
          </div>

          <ol className="space-y-10">
            {jobs.map((job, i) => (
              <li key={job.company} className="relative">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                      Frame #{i}
                    </div>
                    <h3 className="display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.04] mt-1 text-[color:var(--color-bone)]">
                      {job.role}
                    </h3>
                    <div className="mt-2 font-mono text-[13px] text-[color:var(--color-bone-2)]">
                      {job.company}{" "}
                      <span className="text-[color:var(--color-muted)]">
                        · {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[12px] text-[color:var(--color-muted)] md:text-right">
                    {job.period}
                  </div>
                </div>

                <div className="mt-6 border-l hairline-strong pl-5 space-y-3">
                  {job.bullets.map((b, idx) => {
                    const [file, line] =
                      FRAME_FILES[idx % FRAME_FILES.length];
                    return (
                      <div
                        key={idx}
                        className="flex flex-col gap-1 md:flex-row md:items-start md:gap-4"
                      >
                        <span className="font-mono text-[11px] text-[color:var(--color-muted)] shrink-0 whitespace-nowrap">
                          at {file}
                          <span className="text-[color:var(--color-alloc)]">
                            :{line}
                          </span>
                        </span>
                        <span className="text-[14px] text-[color:var(--color-bone-2)] leading-[1.6]">
                          {b}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </li>
            ))}

            <li className="font-mono text-[12px] text-[color:var(--color-muted)] pt-2">
              Frame #{jobs.length}{" "}
              <span className="text-[color:var(--color-bone-2)]">(main)</span>{" "}
              <span className="text-[color:var(--color-muted)]">
                — education, projects, the homelab in the basement
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
