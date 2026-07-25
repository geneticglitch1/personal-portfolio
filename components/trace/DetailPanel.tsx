"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/content/projects";
import { LAYERS, SPANS, formatTime } from "@/content/trace";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  slug: string;
  onClose: () => void;
  onStep: (delta: number) => void;
}

export default function DetailPanel({ slug, onClose, onStep }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const project = PROJECTS.find((p) => p.slug === slug);
  const span = SPANS.find((s) => s.slug === slug);
  const layer = span ? LAYERS[span.depth] : null;

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => lastFocus.current?.focus?.();
  }, []);

  // Keep Tab inside the panel while it's open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = ref.current;
      if (!el) return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (cur === first || !el.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!project || !span || !layer) return null;

  return (
    <aside
      className="panel"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div className="panel-bar">
        <button ref={closeRef} onClick={onClose}>
          ← Close
        </button>
        <div className="pn">
          <button onClick={() => onStep(-1)}>← Earlier</button>
          <button onClick={() => onStep(1)}>Later →</button>
        </div>
      </div>

      <div className="panel-body">
        <div className="panel-eyebrow">
          <i style={{ background: layer.color }} />
          {layer.label} · depth {span.depth}
        </div>

        <h2>{project.name}</h2>

        <div className="meta">
          <span>
            Span <b>{formatTime(span.start)} → {formatTime(span.end)}</b>
          </span>
          <span>
            Category <b>{project.cat}</b>
          </span>
        </div>

        {project.metric && (
          <div className="metric">
            <span className="v">{project.metric.value}</span>
            <span className="l">{project.metric.label}</span>
          </div>
        )}

        <p className="intro">{project.intro}</p>

        <blockquote>{project.quote}</blockquote>

        <div className="body">
          {project.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="blk">
          <span className="k">Stack</span>
          <div className="tags">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="blk">
          <span className="k">Links</span>
          {project.links.github || project.links.live ? (
            <div className="links">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  Live →
                </a>
              )}
            </div>
          ) : null}
          {project.links.note && <p className="note">{project.links.note}</p>}
        </div>
      </div>
    </aside>
  );
}
