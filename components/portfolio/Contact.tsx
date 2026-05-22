"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

const ROWS = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/geneticglitch1",
    href: profile.socials.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aryan-singh06",
    href: profile.socials.linkedin,
  },
  {
    label: "Résumé",
    value: "resume.pdf",
    href: profile.resume,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">07</span>
            <span className="eyebrow">Contact</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] text-[color:var(--color-bone)] max-w-[22ch]">
            I&apos;m looking for{" "}
            <span className="display-grad">Summer 2026 internships</span> in
            systems, infrastructure, and ML.
          </h2>

          <p className="mt-8 text-[17px] leading-[1.7] text-[color:var(--color-bone-2)] max-w-[58ch]">
            The fastest way to reach me is email. I read everything and reply
            to anything that isn&apos;t a recruiter blast.
          </p>

          <div className="mt-14 border-t hairline">
            {ROWS.map(({ label, value, href }, i) => {
              const isExternal = href.startsWith("http");
              return (
                <motion.a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group grid grid-cols-12 gap-4 items-center py-6 border-b hairline transition-colors relative"
                >
                  <span className="col-span-12 md:col-span-3 small-caps">
                    {label}
                  </span>
                  <span className="col-span-9 md:col-span-8 text-[16px] md:text-[18px] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent-hot)] transition-colors">
                    {value}
                  </span>
                  <span className="col-span-3 md:col-span-1 text-right text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                  <span
                    className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-[width] duration-700 ease-out"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-accent), var(--color-magenta))",
                    }}
                    aria-hidden
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
