"use client";

import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/content/projects";

type ProjectFilter = "all" | Project["category"];
type TechKind =
  | "code"
  | "runtime"
  | "data"
  | "cloud"
  | "security"
  | "hardware"
  | "ai"
  | "docs"
  | "ops";

const categoryLabel: Record<Project["category"], string> = {
  systems: "Systems",
  fullstack: "Full Stack",
  ai: "AI",
  hardware: "Hardware",
  infra: "Infrastructure",
  tool: "Tooling",
};

const categoryColor: Record<Project["category"], string> = {
  systems: "var(--color-alloc)",
  fullstack: "var(--color-split)",
  ai: "var(--color-purple)",
  hardware: "var(--color-green)",
  infra: "var(--color-k3s)",
  tool: "var(--color-alloc-2)",
};

const sizeLabel: Record<Project["size"], string> = {
  L: "L / 0x8000",
  M: "M / 0x2000",
  S: "S / 0x1000",
};

const sizeCells: Record<Project["size"], number> = {
  L: 26,
  M: 18,
  S: 11,
};

const sizeColor: Record<Project["size"], string> = {
  L: "var(--color-alloc)",
  M: "var(--color-split)",
  S: "var(--color-green)",
};

const filters = [
  "all",
  ...Array.from(new Set(projects.map((project) => project.category))),
] as ProjectFilter[];

function parseHexBytes(hex: string) {
  const value = parseInt(hex, 16);
  return Number.isNaN(value) ? 0 : value;
}

function classifyTech(tech: string): TechKind {
  const t = tech.toLowerCase();

  if (
    t.includes("c++") ||
    t === "c" ||
    t.includes("rust") ||
    t.includes("typescript") ||
    t.includes("python") ||
    t.includes("java") ||
    t.includes("shell") ||
    t.includes("yaml") ||
    t.includes("posix") ||
    t.includes("pthreads") ||
    t.includes("fork") ||
    t.includes("signals")
  ) {
    return "code";
  }

  if (
    t.includes("react") ||
    t.includes("next.js") ||
    t.includes("fastapi") ||
    t.includes("spring") ||
    t.includes("qt") ||
    t.includes("pdf.js")
  ) {
    return "runtime";
  }

  if (
    t.includes("postgres") ||
    t.includes("supabase") ||
    t.includes("minio") ||
    t.includes("actian") ||
    t.includes("longhorn") ||
    t.includes("filesystem") ||
    t.includes("ext2")
  ) {
    return "data";
  }

  if (
    t.includes("k3s") ||
    t.includes("kubernetes") ||
    t.includes("proxmox") ||
    t.includes("traefik") ||
    t.includes("fleet") ||
    t.includes("jenkins") ||
    t.includes("docker")
  ) {
    return "cloud";
  }

  if (
    t.includes("wireguard") ||
    t.includes("keycloak") ||
    t.includes("openssl") ||
    t.includes("oauth") ||
    t.includes("opnsense")
  ) {
    return "security";
  }

  if (
    t.includes("raspberry") ||
    t.includes("nvidia") ||
    t.includes("tb6612") ||
    t.includes("hc-") ||
    t.includes("lm393") ||
    t.includes("cuda") ||
    t.includes("cutlass")
  ) {
    return "hardware";
  }

  if (
    t.includes("instructor") ||
    t.includes("trocr") ||
    t.includes("mnist") ||
    t.includes("gpt") ||
    t.includes("gelu")
  ) {
    return "ai";
  }

  if (t.includes("pdf") || t.includes("document")) {
    return "docs";
  }

  return "ops";
}

function techKindColor(kind: TechKind) {
  switch (kind) {
    case "code":
      return "var(--color-alloc)";
    case "runtime":
      return "var(--color-split)";
    case "data":
      return "var(--color-purple)";
    case "cloud":
      return "var(--color-k3s)";
    case "security":
      return "var(--color-danger)";
    case "hardware":
      return "var(--color-green)";
    case "ai":
      return "var(--color-alloc-2)";
    case "docs":
      return "var(--color-bone-2)";
    case "ops":
      return "var(--color-muted)";
    default:
      return "var(--color-muted)";
  }
}

function TechIcon({ kind }: { kind: TechKind }) {
  if (kind === "code") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <path d="M8 7L3 12L8 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7L21 12L16 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "runtime") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "data") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <ellipse cx="12" cy="6.5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 6.5V17.5C5 19.2 8.1 20.5 12 20.5C15.9 20.5 19 19.2 19 17.5V6.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (kind === "cloud") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <path d="M7.5 18.5H17C19.2 18.5 21 16.8 21 14.7C21 12.7 19.5 11 17.5 10.8C17.1 8.1 14.8 6 12 6C9.3 6 7 8 6.6 10.6C4.6 10.9 3 12.5 3 14.5C3 16.7 4.8 18.5 7 18.5H7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "security") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <path d="M12 3L19 6.5V12.5C19 16.8 16.1 20.7 12 21.8C7.9 20.7 5 16.8 5 12.5V6.5L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "hardware") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3V6M12 18V21M3 12H6M18 12H21M5 5L7 7M17 17L19 19M19 5L17 7M5 19L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "ai") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.5 11.5H15.5M9.5 14.5H14.5M10 9H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "docs") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
        <path d="M7 3.5H14.5L18 7V20.5H7V3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3.8V7.5H17.7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
      <path d="M12 4L20 12L12 20L4 12L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function TechBadge({ tech }: { tech: string }) {
  const kind = classifyTech(tech);
  const color = techKindColor(kind);

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 border rounded-full text-[color:var(--color-bone-2)]"
      style={{
        borderColor: "color-mix(in srgb, var(--color-bone) 22%, transparent)",
        background: "color-mix(in srgb, var(--color-ink-2) 82%, black 18%)",
      }}
    >
      <span style={{ color }}>
        <TechIcon kind={kind} />
      </span>
      {tech}
    </span>
  );
}

function HeapBar({ size, active }: { size: Project["size"]; active: boolean }) {
  const cells = sizeCells[size];
  const accent = sizeColor[size];

  return (
    <div className="flex gap-[2px] h-3.5 w-full" aria-hidden>
      {Array.from({ length: cells }).map((_, i) => (
        <span
          key={i}
          className="h-full flex-1 rounded-[2px]"
          style={{
            background: `color-mix(in srgb, ${accent} ${54 + (i / cells) * 40}%, transparent)`,
            boxShadow: active
              ? `0 0 8px color-mix(in srgb, ${accent} 30%, transparent)`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

function FlowDiagram({
  stack,
  accent,
}: {
  stack: string[];
  accent: string;
}) {
  const nodes = stack.slice(0, 5);
  if (nodes.length === 0) return null;

  return (
    <div
      className="mt-6 rounded-xl border p-3.5 overflow-x-auto"
      style={{
        borderColor: "color-mix(in srgb, var(--color-bone) 16%, transparent)",
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--color-ink-2) 84%, black 16%) 0%, color-mix(in srgb, var(--color-ink) 94%, black 6%) 100%)",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] mb-3">
        execution flow
      </div>

      <div className="flex items-center min-w-max gap-2">
        {nodes.map((tech, i) => {
          const kind = classifyTech(tech);

          return (
            <Fragment key={`${tech}-${i}`}>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-bone-2)]"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-bone) 20%, transparent)",
                  background:
                    "color-mix(in srgb, var(--color-ink-2) 82%, black 18%)",
                }}
              >
                <span style={{ color: techKindColor(kind) }}>
                  <TechIcon kind={kind} />
                </span>
                {tech}
              </span>

              {i < nodes.length - 1 && (
                <motion.span
                  className="relative block w-8 h-px"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-bone) 26%, transparent)",
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.95 }}
                  transition={{ duration: 0.34, delay: i * 0.06 }}
                >
                  <span
                    className="absolute -right-1.5 -top-[5px] text-[9px]"
                    style={{ color: accent }}
                    aria-hidden
                  >
                    ▶
                  </span>
                </motion.span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = categoryColor[project.category];

  return (
    <motion.li
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.58,
        delay: (index % 2) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <article
        className="relative rounded-3xl border overflow-hidden h-full"
        style={{
          borderColor: `color-mix(in srgb, ${accent} 44%, var(--color-hairline))`,
          background: `linear-gradient(155deg,
            color-mix(in srgb, ${accent} 14%, var(--color-ink-2)) 0%,
            color-mix(in srgb, var(--color-ink-2) 90%, black 10%) 52%,
            var(--color-ink) 100%)`,
          boxShadow: "0 22px 62px rgba(0,0,0,0.32)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            opacity: 0.75,
            background:
              "repeating-linear-gradient(120deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 13px)",
          }}
        />

        <div className="relative p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: accent,
                  boxShadow: `0 0 9px color-mix(in srgb, ${accent} 60%, transparent)`,
                }}
              />
              block {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.year}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
              style={{
                color: "var(--color-bone-2)",
                borderColor: `color-mix(in srgb, ${accent} 42%, transparent)`,
                background: `color-mix(in srgb, ${accent} 14%, transparent)`,
              }}
            >
              {categoryLabel[project.category]}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {sizeLabel[project.size]}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {project.bytes}
            </span>
          </div>

          <h3 className="display mt-4 text-[clamp(1.6rem,2.9vw,2.5rem)] leading-[1.05] text-[color:var(--color-bone)]">
            {project.name}
          </h3>

          <p className="mt-2.5 text-[13px] leading-[1.65] font-mono text-[color:var(--color-bone-2)]">
            {project.tagline}
          </p>

          <div className="mt-5 rounded-xl border p-3" style={{ borderColor: "color-mix(in srgb, var(--color-bone) 16%, transparent)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] mb-2">
              allocation footprint · {project.addr}
            </div>
            <HeapBar size={project.size} active={true} />
          </div>

          <FlowDiagram stack={project.stack} accent={accent} />

          <p className="mt-6 text-[15px] leading-[1.72] text-[color:var(--color-bone)]">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <ul
              className="mt-5 space-y-2.5 border-l pl-4"
              style={{ borderColor: "color-mix(in srgb, var(--color-bone) 20%, transparent)" }}
            >
              {project.highlights.map((item, i) => (
                <li key={i} className="text-[14px] leading-[1.65] text-[color:var(--color-bone-2)]">
                  <span className="font-mono mr-2.5" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} tech={tech} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-full border px-3 py-1.5 hover:underline underline-offset-4"
                style={{
                  color: accent,
                  borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
                }}
              >
                github
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-full border px-3 py-1.5 hover:underline underline-offset-4"
                style={{
                  color: accent,
                  borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
                }}
              >
                live
              </a>
            )}
            {project.links.note && (
              <span
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-[color:var(--color-muted)]"
                style={{ borderColor: "var(--color-hairline)" }}
              >
                {project.links.note}
              </span>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const totalBytes = useMemo(
    () => projects.reduce((sum, project) => sum + parseHexBytes(project.bytes), 0),
    []
  );

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const visibleBytes = useMemo(
    () => visibleProjects.reduce((sum, project) => sum + parseHexBytes(project.bytes), 0),
    [visibleProjects]
  );

  return (
    <section
      id="projects"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-20 h-[460px]" aria-hidden>
        <div
          className="absolute left-[5%] top-4 w-[36vw] h-[30vw] min-w-[220px] min-h-[180px] rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--color-split) 24%, transparent)" }}
        />
        <div
          className="absolute right-[7%] top-[12%] w-[30vw] h-[24vw] min-w-[200px] min-h-[160px] rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--color-alloc) 22%, transparent)" }}
        />
      </div>

      <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">03</span>
            <span className="eyebrow">Projects / Systems Atlas</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-[color:var(--color-bone)] max-w-[24ch]">
            Every project, fully visible with stack icons and flow maps.
          </h2>

          <p className="mt-5 font-mono text-[12px] text-[color:var(--color-muted)] max-w-[72ch] leading-[1.7]">
            Showing {visibleProjects.length} of {projects.length} allocations · visible footprint 0x
            {visibleBytes.toString(16)} bytes · full resident heap 0x
            {totalBytes.toString(16)} bytes.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const selected = activeFilter === filter;
              const accent = filter === "all" ? "var(--color-bone-2)" : categoryColor[filter];
              const label = filter === "all" ? "All" : categoryLabel[filter];

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all"
                  style={{
                    color: selected ? "var(--color-bone)" : "var(--color-muted)",
                    borderColor: selected
                      ? `color-mix(in srgb, ${accent} 55%, transparent)`
                      : "var(--color-hairline)",
                    background: selected
                      ? `color-mix(in srgb, ${accent} 16%, transparent)`
                      : "transparent",
                    boxShadow: selected
                      ? `0 0 12px color-mix(in srgb, ${accent} 28%, transparent)`
                      : "none",
                  }}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <ul className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6" role="list">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
