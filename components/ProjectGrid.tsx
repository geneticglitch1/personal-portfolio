"use client";

import { useState } from "react";
import { PROJECTS, ORDERED, CATEGORIES, type Category } from "@/content/projects";
import SectionHead from "./motion/SectionHead";
import ProjectCard from "./ProjectCard";

/**
 * One grid, every project, filtered by category.
 *
 * The filter is the only piece of state on the page. It starts at "all", which
 * is what gets prerendered — so with scripting off every card is present and
 * the chips simply don't respond. Nothing is hidden behind the filter.
 *
 * The grid is keyed on the active category so React remounts it on a change,
 * which replays the cards' scroll-driven entrance rather than having them
 * snap into place.
 */
export default function ProjectGrid() {
  const [cat, setCat] = useState<Category | null>(null);
  const shown = cat ? ORDERED.filter((p) => p.cat === cat) : ORDERED;

  const countFor = (c: Category) => PROJECTS.filter((p) => p.cat === c).length;

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <SectionHead
          n="01"
          eyebrow="Work"
          title="What I've built"
          right={<span className="lbl">{PROJECTS.length} projects</span>}
        />

        <div className="filters">
          <button
            className="chip"
            aria-pressed={cat === null}
            onClick={() => setCat(null)}
          >
            All<span className="n">{PROJECTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className="chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
              <span className="n">{countFor(c)}</span>
            </button>
          ))}
        </div>

        <div className="grid" key={cat ?? "all"}>
          {shown.map((p) => (
            <ProjectCard key={p.slug} p={p} n={ORDERED.indexOf(p) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
