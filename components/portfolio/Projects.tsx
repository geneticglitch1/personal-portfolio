"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/content/projects";

const sizeWidths: Record<Project["size"], string> = {
  L: "w-40 md:w-56",
  M: "w-28 md:w-36",
  S: "w-16 md:w-24",
};

const sizeCells: Record<Project["size"], number> = {
  L: 32,
  M: 20,
  S: 10,
};

const sizeLabel: Record<Project["size"], string> = {
  L: "0x8000",
  M: "0x2000",
  S: "0x1000",
};

// Each tier has its own accent color
const sizeColor: Record<Project["size"], string> = {
  L: "var(--color-alloc)",  // amber  — large / flagship
  M: "var(--color-split)",  // blue   — medium
  S: "var(--color-green)",  // green  — small / utility
};

function BlockBar({ size }: { size: Project["size"] }) {
  const cells = sizeCells[size];
  const color = sizeColor[size];
  return (
    <div
      className={`${sizeWidths[size]} h-6 flex gap-[2px] items-stretch shrink-0`}
      aria-hidden
    >
      {Array.from({ length: cells }).map((_, i) => (
        <span
          key={i}
          className="flex-1 block"
          style={{
            background: `color-mix(in srgb, ${color} ${55 + (i / cells) * 40}%, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="group border-b hairline">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left grid grid-cols-12 gap-4 items-center py-5 px-2 md:px-4 transition-colors hover:bg-[color:var(--color-ink-2)]"
        aria-expanded={open}
      >
        <div className="col-span-12 md:col-span-3 flex items-center gap-4">
          <BlockBar size={project.size} />
          <span className="font-mono text-[10px] text-[color:var(--color-muted)] uppercase tracking-widest">
            {sizeLabel[project.size]}
          </span>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.05] text-[color:var(--color-bone)]">
              {project.name}
            </h3>
            <span className="font-mono text-[10px] text-[color:var(--color-muted)] uppercase tracking-widest">
              {project.addr}
            </span>
          </div>
          <p className="mt-1 font-mono text-[12px] text-[color:var(--color-bone-2)]">
            {project.tagline}
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end gap-4 font-mono text-[11px] text-[color:var(--color-muted)] uppercase tracking-[0.18em]">
          <span className="text-[color:var(--color-bone-2)]">
            {project.lang.join(" · ")}
          </span>
          <span>{project.year}</span>
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full border transition-all ${
              open
                ? "border-[color:var(--color-alloc)] text-[color:var(--color-alloc)] rotate-45"
                : "hairline-strong text-[color:var(--color-bone-2)]"
            }`}
            aria-hidden
          >
            +
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-8 pt-2 px-2 md:px-4">
              <div className="col-span-12 md:col-span-3">
                <div className="mono-meta">/* realloc → inspect */</div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-[color:var(--color-bone)] max-w-[60ch]">
                  {project.description}
                </p>
                {project.highlights.length > 0 && (
                  <ul className="mt-6 space-y-3 border-l hairline-strong pl-5">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-[14px] leading-[1.6] text-[color:var(--color-bone-2)]"
                      >
                        <span className="font-mono text-[color:var(--color-alloc)] mr-3">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2.5 py-1 border hairline rounded-full text-[color:var(--color-bone-2)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[color:var(--color-alloc)] hover:underline underline-offset-4"
                    >
                      → github
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[color:var(--color-alloc)] hover:underline underline-offset-4"
                    >
                      → live
                    </a>
                  )}
                  {project.links.note && (
                    <span className="text-[color:var(--color-muted)]">
                      {project.links.note}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Projects() {
  const total = projects.reduce((a, p) => {
    const b = parseInt(p.bytes, 16);
    return a + (isNaN(b) ? 0 : b);
  }, 0);

  return (
    <section
      id="projects"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 mb-12">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">03</span>
            <span className="eyebrow">Projects / Heap Map</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-[color:var(--color-bone)] max-w-[30ch]">
            {projects.length} blocks allocated on the portfolio heap.
          </h2>
          <p className="mt-5 font-mono text-[12px] text-[color:var(--color-muted)] max-w-[60ch]">
            Total resident: 0x{total.toString(16)} bytes · click a block to{" "}
            <span className="text-[color:var(--color-alloc)]">realloc</span>{" "}
            it open.
          </p>
        </div>
      </div>

      <ul className="mt-2 border-t hairline">
        {projects.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}
