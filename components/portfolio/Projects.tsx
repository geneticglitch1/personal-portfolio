"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/content/projects";

const sizeCells: Record<Project["size"], number> = {
  L: 16,
  M: 11,
  S: 7,
};

const sizeLabel: Record<Project["size"], string> = {
  L: "L / 0x8000",
  M: "M / 0x2000",
  S: "S / 0x1000",
};

const sizeColor: Record<Project["size"], string> = {
  L: "var(--color-alloc)",
  M: "var(--color-split)",
  S: "var(--color-green)",
};

function BlockPillar({
  size,
  active,
}: {
  size: Project["size"];
  active: boolean;
}) {
  const cells = sizeCells[size];
  const color = sizeColor[size];

  return (
    <div
      className={`flex w-3 md:w-3.5 flex-col-reverse gap-[2px] shrink-0 ${
        active ? "alloc-pulse" : ""
      }`}
      aria-hidden
    >
      {Array.from({ length: cells }).map((_, i) => (
        <span
          key={i}
          className="w-full rounded-[2px]"
          style={{
            height: i === cells - 1 ? "7px" : "5px",
            background: `color-mix(in srgb, ${color} ${52 + (i / cells) * 42}%, transparent)`,
            boxShadow: active
              ? `0 0 6px color-mix(in srgb, ${color} 28%, transparent)`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

function ProjectNode({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const accent = sizeColor[project.size];
  const panelId = `project-panel-${project.slug}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.62,
        delay: index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] md:grid-cols-[4.75rem_minmax(0,1fr)] gap-4 md:gap-6 items-start">
        <div className="flex flex-col items-center pt-5">
          <BlockPillar size={project.size} active={open} />
          <motion.span
            className="mt-2.5 inline-flex w-3 h-3 rounded-full border"
            animate={{ scale: open ? [1, 1.18, 1] : 1 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              borderColor: open
                ? accent
                : "color-mix(in srgb, var(--color-muted) 45%, transparent)",
              background: open
                ? `color-mix(in srgb, ${accent} 78%, transparent)`
                : "color-mix(in srgb, var(--color-ink-2) 86%, transparent)",
              boxShadow: open
                ? `0 0 12px color-mix(in srgb, ${accent} 60%, transparent)`
                : "none",
            }}
            aria-hidden
          />
        </div>

        <div
          className="rounded-2xl border overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-0.5"
          style={{
            borderColor: open
              ? `color-mix(in srgb, ${accent} 48%, var(--color-hairline))`
              : "var(--color-hairline)",
            background: `linear-gradient(145deg,
              color-mix(in srgb, ${accent} ${open ? 14 : 8}%, var(--color-ink-2)) 0%,
              color-mix(in srgb, var(--color-ink-2) 92%, black 8%) 56%,
              var(--color-ink) 100%)`,
            boxShadow: open
              ? `0 0 0 1px color-mix(in srgb, ${accent} 26%, transparent), 0 24px 56px rgba(0,0,0,0.32)`
              : "0 16px 42px rgba(0,0,0,0.22)",
          }}
        >
          <button
            onClick={onToggle}
            className="w-full text-left p-5 md:p-6"
            aria-expanded={open}
            aria-controls={panelId}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                <span className="text-[color:var(--color-bone-2)]">
                  {sizeLabel[project.size]}
                </span>
                <span className="hidden md:inline text-[color:var(--color-muted)]">
                  addr {project.addr}
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                <span>{project.year}</span>
                <span className="text-[color:var(--color-bone-2)]">
                  {project.bytes}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="display text-[clamp(1.55rem,2.8vw,2.35rem)] leading-[1.04] text-[color:var(--color-bone)]">
                  {project.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] leading-[1.6] text-[color:var(--color-bone-2)] max-w-[76ch]">
                  {project.tagline}
                </p>
              </div>
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all shrink-0 ${
                  open
                    ? "text-[color:var(--color-bone)] rotate-45"
                    : "text-[color:var(--color-bone-2)]"
                }`}
                style={{
                  borderColor: open
                    ? `color-mix(in srgb, ${accent} 60%, transparent)`
                    : "var(--color-hairline)",
                  background: open
                    ? `color-mix(in srgb, ${accent} 22%, transparent)`
                    : "transparent",
                }}
                aria-hidden
              >
                +
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              <span className="text-[color:var(--color-bone-2)]">
                {project.lang.join(" · ")}
              </span>
              <span>{project.category}</span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.2, 0.7, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="px-5 md:px-6 pb-6 pt-1 border-t"
                  style={{ borderColor: "var(--color-hairline)" }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-3">
                      <div className="mono-meta">heap block inspection</div>
                    </div>
                    <div className="lg:col-span-9">
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-[color:var(--color-bone)] max-w-[70ch]">
                        {project.description}
                      </p>

                      {project.highlights.length > 0 && (
                        <ul
                          className="mt-6 space-y-3 border-l pl-5"
                          style={{
                            borderColor:
                              "color-mix(in srgb, var(--color-bone) 20%, transparent)",
                          }}
                        >
                          {project.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-[14px] leading-[1.65] text-[color:var(--color-bone-2)]"
                            >
                              <span
                                className="font-mono mr-3"
                                style={{ color: accent }}
                              >
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
                            className="font-mono text-[11px] px-2.5 py-1 border rounded-full text-[color:var(--color-bone-2)]"
                            style={{
                              borderColor:
                                "color-mix(in srgb, var(--color-bone) 22%, transparent)",
                              background:
                                "color-mix(in srgb, var(--color-ink-2) 82%, black 18%)",
                            }}
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
                            className="hover:underline underline-offset-4"
                            style={{ color: accent }}
                          >
                            → github
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:underline underline-offset-4"
                            style={{ color: accent }}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.li>
  );
}

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(
    projects[0]?.slug ?? null
  );

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
            {projects.length} blocks stacked in vertical heap order.
          </h2>
          <p className="mt-5 font-mono text-[12px] text-[color:var(--color-muted)] max-w-[60ch]">
            Total resident: 0x{total.toString(16)} bytes. Traverse downward and
            expand a node to inspect implementation details.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--color-alloc)" }}
              />
              Large
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--color-split)" }}
              />
              Medium
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--color-green)" }}
              />
              Utility
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-2">
        <motion.span
          aria-hidden
          className="absolute left-[1.73rem] md:left-[2.4rem] top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-muted) 30%, transparent) 10%, color-mix(in srgb, var(--color-alloc) 18%, var(--color-hairline)) 50%, color-mix(in srgb, var(--color-muted) 30%, transparent) 90%, transparent 100%)",
          }}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <ul className="space-y-6" role="list">
          {projects.map((project, idx) => (
            <ProjectNode
              key={project.slug}
              project={project}
              index={idx}
              open={openSlug === project.slug}
              onToggle={() =>
                setOpenSlug((curr) => (curr === project.slug ? null : project.slug))
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
