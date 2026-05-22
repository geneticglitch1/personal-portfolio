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
            <span className="eyebrow">About me</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="col-span-12 md:col-span-9 md:col-start-5"
        >
          <p className="spread-intro max-w-[52ch]">
            {profile.summary}
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 border-t hairline pt-10">
            <div>
              <div className="small-caps mb-3">Where I study</div>
              <div className="text-[color:var(--color-bone)] text-[17px] leading-[1.5]">
                {education.school}
              </div>
              <div className="text-[color:var(--color-muted)] text-[14px] mt-1">
                {education.degree}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div>
                  <div className="small-caps">My GPA</div>
                  <div className="hero-metric-value mt-1 text-[2.4rem] leading-none">
                    {education.gpa}
                    <span className="text-[color:var(--color-muted)] text-[1rem]" style={{ background: "none", WebkitTextFillColor: "var(--color-muted)" }}>
                      {" "}/ 4.00
                    </span>
                  </div>
                </div>
                <div>
                  <div className="small-caps">Graduating</div>
                  <div className="hero-metric-value mt-1 text-[2rem] leading-none">
                    {education.graduation}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="small-caps mb-4">What I&apos;m taking</div>
              <ul className="grid grid-cols-1 gap-y-1.5 text-[14px] text-[color:var(--color-bone-2)] leading-[1.55]">
                {education.coursework.map((c) => (
                  <li
                    key={c}
                    className="flex items-baseline gap-3 hover:text-[color:var(--color-accent-hot)] transition-colors"
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--color-accent)" }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
