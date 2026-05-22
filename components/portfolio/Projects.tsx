"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const numberX = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const arrowX = useTransform(scrollYProgress, [0, 1], [-8, 16]);
  const fade = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b hairline group/row relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block py-8 md:py-12 grid grid-cols-12 gap-x-4 gap-y-2 items-baseline transition-colors relative"
      >
        <motion.div
          style={{ x: numberX, opacity: fade }}
          className="col-span-3 md:col-span-1 font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] group-hover/row:text-[color:var(--color-accent)] transition-colors pt-2"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        <div className="col-span-9 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] pt-2 md:pt-0">
          {project.year}
        </div>

        <div className="col-span-12 md:col-span-7">
          <h3 className="display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.04] text-[color:var(--color-bone)] group-hover/row:text-[color:var(--color-accent-hot)] transition-colors">
            {project.name}
          </h3>
          <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-[color:var(--color-bone-2)] max-w-[60ch]">
            {project.tagline}
          </p>
        </div>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <motion.span
            style={{ x: arrowX }}
            className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] group-hover/row:text-[color:var(--color-bone)] transition-colors"
          >
            {categoryLabel[project.category]}
            <span
              className="ml-3 text-[color:var(--color-accent)] inline-block"
            >
              →
            </span>
          </motion.span>
        </div>

        <span
          className="absolute left-0 bottom-0 h-px w-0 group-hover/row:w-full transition-[width] duration-700 ease-out"
          style={{ background: "linear-gradient(90deg, var(--color-accent), var(--color-magenta))" }}
          aria-hidden
        />
      </Link>
    </motion.li>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 relative">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">03</span>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Selected Work</span>
              <motion.div
                style={{ scaleY: railScale, transformOrigin: "top" }}
                className="w-px h-32 bg-gradient-to-b from-[color:var(--color-accent)] to-transparent"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] text-[color:var(--color-bone)] max-w-[24ch]">
            <span className="display-grad">{projects.length} projects.</span>
            <br />
            Each one written up in full.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-[color:var(--color-bone-2)] max-w-[60ch]">
            Systems work, ML infrastructure, and the K3s cluster that runs the
            rest. Click any one to read the long version.
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
                      ? "border-[color:var(--color-accent)] text-[color:var(--color-bone)] bg-[color:var(--color-accent)]/14"
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
