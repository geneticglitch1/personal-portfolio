"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  projects,
  categoryLabel,
  type Project,
  type ProjectCategory,
} from "@/content/projects";

type ProjectFilter = "all" | ProjectCategory;

const filters: ProjectFilter[] = [
  "all",
  ...(Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[]),
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b hairline"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block py-7 md:py-9 grid grid-cols-12 gap-x-4 gap-y-2 items-baseline transition-colors"
      >
        <div className="col-span-3 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] pt-2">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="col-span-9 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] pt-2 md:pt-0">
          {project.year}
        </div>

        <div className="col-span-12 md:col-span-7">
          <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.06] text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent)] transition-colors">
            {project.name}
          </h3>
          <p className="mt-2 text-[14px] md:text-[15px] leading-[1.55] text-[color:var(--color-bone-2)] max-w-[58ch]">
            {project.tagline}
          </p>
        </div>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] group-hover:text-[color:var(--color-bone-2)] transition-colors">
            {categoryLabel[project.category]}
            <span className="ml-3 text-[color:var(--color-muted)] group-hover:text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">03</span>
            <span className="eyebrow">Selected Work</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[26ch]">
            {projects.length} projects, written up in full.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[color:var(--color-bone-2)] max-w-[60ch]">
            Systems work, ML infrastructure, and the K3s cluster that runs the
            rest. Pick one to read the long version.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const selected = activeFilter === filter;
              const label =
                filter === "all" ? "All" : categoryLabel[filter as ProjectCategory];

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full border transition-colors ${
                    selected
                      ? "border-[color:var(--color-bone)] text-[color:var(--color-bone)]"
                      : "border-[color:var(--color-hairline)] text-[color:var(--color-muted)] hover:text-[color:var(--color-bone-2)] hover:border-[color:var(--color-bone-2)]"
                  }`}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <ul className="mt-12 border-t hairline" role="list">
            {visibleProjects.map((project, idx) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={idx}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
