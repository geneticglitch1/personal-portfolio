"use client";

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
            <span className="mono-meta leading-none pt-1.5">06</span>
            <span className="eyebrow">Contact</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-[color:var(--color-bone)] max-w-[24ch]">
            Open to Summer 2026 internships in systems, infrastructure, and ML.
          </h2>

          <p className="mt-6 text-[16px] leading-[1.7] text-[color:var(--color-bone-2)] max-w-[58ch]">
            The fastest way to reach me is email. I read everything and reply
            to anything that isn&apos;t a recruiter blast.
          </p>

          <div className="mt-14 border-t hairline">
            {ROWS.map(({ label, value, href }) => {
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  className="group grid grid-cols-12 gap-4 items-center py-5 border-b hairline transition-colors"
                >
                  <span className="col-span-12 md:col-span-3 small-caps">
                    {label}
                  </span>
                  <span className="col-span-9 md:col-span-8 text-[15px] md:text-[16px] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent)] transition-colors">
                    {value}
                  </span>
                  <span className="col-span-3 md:col-span-1 text-right text-[color:var(--color-muted)] group-hover:text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
