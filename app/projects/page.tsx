import type { Metadata } from "next";
import Link from "next/link";
import { projects, categoryLabel } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "All projects",
  description: `Every project by ${profile.name} — systems, ML, infrastructure, full-stack.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <main className="relative px-6 md:px-12 pt-32 pb-24 min-h-[100svh]">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center justify-between small-caps">
            <Link
              href="/"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              ← {profile.name}
            </Link>
            <span>Index · {projects.length} projects</span>
          </div>
        </div>

        <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-6">
          <h1 className="col-span-12 md:col-span-10 md:col-start-2 display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] text-[color:var(--color-bone)]">
            All projects, written up in full.
          </h1>
        </header>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6">
          <p className="col-span-12 md:col-span-8 md:col-start-3 spread-intro">
            Systems, ML, full-stack, hardware, and infrastructure — every
            project on this site is documented as its own spread. Pick one to
            read the long version.
          </p>
        </div>

        <ul className="mt-20 grid grid-cols-12 gap-x-6 border-t hairline">
          {projects.map((p, idx) => (
            <li
              key={p.slug}
              className="col-span-12 md:col-span-8 md:col-start-3 border-b hairline"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block py-8 grid grid-cols-12 gap-4 items-baseline"
              >
                <span className="col-span-3 md:col-span-1 small-caps">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="col-span-9 md:col-span-2 small-caps">
                  {p.year}
                </span>
                <div className="col-span-12 md:col-span-7">
                  <h2 className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent)] transition-colors">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[color:var(--color-bone-2)] max-w-[58ch]">
                    {p.tagline}
                  </p>
                </div>
                <span className="col-span-12 md:col-span-2 md:text-right small-caps group-hover:text-[color:var(--color-bone-2)] transition-colors">
                  {categoryLabel[p.category]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
