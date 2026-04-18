"use client";

import { profile } from "@/content/profile";

const ROWS = [
  {
    path: "/proc/self/email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    path: "/proc/self/phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    path: "/proc/self/github",
    value: "github.com/geneticglitch1",
    href: profile.socials.github,
  },
  {
    path: "/proc/self/linkedin",
    value: "linkedin.com/in/aryan-singh06",
    href: profile.socials.linkedin,
  },
  {
    path: "/proc/self/resume",
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
            <span className="mono-meta leading-none pt-1.5">05</span>
            <span className="eyebrow">Contact</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-[color:var(--color-bone)] max-w-[24ch]">
            Open to Summer 2026 internships in systems, infra, or anything
            close to the metal.
          </h2>

          <div className="mt-12 border-t hairline">
            {ROWS.map(({ path, value, href }) => (
              <a
                key={path}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noreferrer noopener" : undefined
                }
                className="group grid grid-cols-12 gap-4 items-center py-4 border-b hairline transition-colors hover:bg-[color:var(--color-ink-2)]"
              >
                <span className="col-span-12 md:col-span-4 font-mono text-[12px] text-[color:var(--color-muted)] tracking-wide">
                  {path}
                </span>
                <span className="col-span-9 md:col-span-7 font-mono text-[13px] md:text-[14px] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-alloc)] transition-colors">
                  {value}
                </span>
                <span className="col-span-3 md:col-span-1 text-right font-mono text-[color:var(--color-muted)] group-hover:text-[color:var(--color-alloc)] transition-colors">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
