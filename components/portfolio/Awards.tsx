"use client";

import Link from "next/link";
import { profile } from "@/content/profile";

export function Awards() {
  return (
    <section
      id="awards"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">05</span>
            <span className="eyebrow">Awards</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[28ch]">
            Where the work has been measured against other people&apos;s work.
          </h2>

          <ol className="mt-14 border-t hairline">
            {profile.awards.map((award) => {
              const Wrapper = ({
                children,
              }: {
                children: React.ReactNode;
              }) =>
                award.link ? (
                  <Link
                    href={award.link}
                    className="group grid grid-cols-12 gap-4 items-baseline py-6 border-b hairline transition-colors"
                  >
                    {children}
                  </Link>
                ) : (
                  <div className="grid grid-cols-12 gap-4 items-baseline py-6 border-b hairline">
                    {children}
                  </div>
                );

              return (
                <li key={award.title}>
                  <Wrapper>
                    <span className="col-span-12 md:col-span-2 small-caps">
                      {award.year}
                    </span>
                    <div className="col-span-12 md:col-span-9">
                      <div className="display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.15] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent)] transition-colors">
                        {award.title}
                      </div>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[color:var(--color-bone-2)] max-w-[60ch]">
                        {award.detail}
                      </p>
                    </div>
                    {award.link && (
                      <span className="col-span-12 md:col-span-1 md:text-right text-[color:var(--color-muted)] group-hover:text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    )}
                  </Wrapper>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 pt-10 border-t hairline">
            <div className="small-caps mb-3">Memberships</div>
            <div className="text-[15px] leading-[1.7] text-[color:var(--color-bone-2)]">
              {profile.memberships.join(" · ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
