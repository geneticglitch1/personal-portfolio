"use client";

import { PROJECTS } from "@/content/projects";
import { LAYERS, SPANS, formatTime } from "@/content/trace";

const bySlug = new Map(PROJECTS.map((p) => [p.slug, p]));

interface Lane {
  layer: (typeof LAYERS)[number];
  depth: number;
  spans: typeof SPANS;
}

/**
 * A trace needs horizontal room it doesn't have on a phone, so below the
 * breakpoint the same data collapses to a list grouped by layer, still ordered
 * product-down-to-silicon and still showing each project's span.
 */
export default function MobileList({
  lanes,
  onOpen,
}: {
  lanes: Lane[];
  onOpen: (slug: string) => void;
}) {
  return (
    <div className="mlist">
      {lanes.map(({ layer, depth, spans }) => (
        <section className="mlayer" key={layer.id}>
          <div className="h">
            <i style={{ background: layer.color }} />
            <b>{layer.label}</b>
            <span>depth {depth}</span>
          </div>
          {[...spans]
            .sort((a, b) => b.start - a.start)
            .map((s) => {
              const p = bySlug.get(s.slug);
              if (!p) return null;
              return (
                <button className="mrow" key={s.slug} onClick={() => onOpen(s.slug)}>
                  <span>
                    <span className="n">{p.name}</span>
                    <span className="d">{p.desc}</span>
                  </span>
                  <span className="t">{formatTime(s.start)}</span>
                </button>
              );
            })}
        </section>
      ))}
    </div>
  );
}
