"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export function About() {
  const { education } = profile;

  return (
    <section
      id="about"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="col-span-12 md:col-span-3"
        >
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">01</span>
            <span className="eyebrow">About</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="col-span-12 md:col-span-9 md:col-start-5"
        >
          <p className="spread-intro max-w-[44ch]">
            {profile.summary}
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 border-t hairline pt-10">
            <div>
              <div className="small-caps mb-3">School</div>
              <div className="text-[color:var(--color-bone)] text-[16px] leading-[1.5]">
                {education.school}
              </div>
              <div className="text-[color:var(--color-muted)] text-[14px] mt-1">
                {education.degree}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="small-caps">GPA</div>
                  <div className="display text-[color:var(--color-bone)] text-[2rem] mt-1 leading-none tabular-nums">
                    {education.gpa}
                    <span className="text-[color:var(--color-muted)] text-[1rem]">
                      {" "}/ 4.00
                    </span>
                  </div>
                </div>
                <div>
                  <div className="small-caps">Graduating</div>
                  <div className="display text-[color:var(--color-bone)] text-[1.75rem] mt-1 leading-none">
                    {education.graduation}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="small-caps mb-4">Relevant Coursework</div>
              <ul className="grid grid-cols-1 gap-y-1.5 text-[14px] text-[color:var(--color-bone-2)] leading-[1.55]">
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
