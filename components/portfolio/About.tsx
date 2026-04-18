"use client";

import { profile } from "@/content/profile";

export function About() {
  const { education } = profile;
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">01</span>
            <span className="eyebrow">About / Education</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <p className="display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[36ch]">
            Sophomore at UIUC building at the boundary where hardware,
            software, and network meet — FPGAs, zero-knowledge vaults,
            self-hosted Kubernetes, semantic search, and a memory allocator
            that beat glibc.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10">
            <div>
              <div className="mono-meta mb-3">/* school */</div>
              <div className="text-[color:var(--color-bone)] text-[15px] leading-[1.55]">
                {education.school}
              </div>
              <div className="text-[color:var(--color-muted)] text-[13px] mt-1 font-mono">
                {education.degree}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-[12px] font-mono">
                <div>
                  <div className="mono-meta">GPA</div>
                  <div className="text-[color:var(--color-bone)] text-[20px] mt-1 tabular-nums">
                    {education.gpa}
                    <span className="text-[color:var(--color-muted)] text-[13px]">
                      {" "}/ 4.00
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mono-meta">Expected</div>
                  <div className="text-[color:var(--color-bone)] text-[20px] mt-1">
                    {education.graduation}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mono-meta mb-3">/* coursework */</div>
              <ul className="space-y-1.5 font-mono text-[13px] text-[color:var(--color-bone-2)]">
                {education.coursework.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <span className="text-[color:var(--color-alloc)] opacity-70">
                      ·
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
