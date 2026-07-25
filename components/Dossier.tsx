"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "@/content/projects";
import { getLenis } from "./motion/LenisProvider";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

interface DossierProps {
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Dossier({ index, onClose, onIndex }: DossierProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const isOpen = index !== null;
  const count = PROJECTS.length;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex]
  );

  // Lock the page behind the sheet and restore focus on the way out.
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [isOpen]);

  // Keyboard: escape closes, arrows page, tab stays inside the sheet.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        step(1);
        return;
      }
      if (e.key !== "Tab") return;

      const sheet = sheetRef.current;
      if (!sheet) return;
      const nodes = Array.from(
        sheet.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (current === first || !sheet.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, step]);

  const p = index === null ? null : PROJECTS[index];
  const prev = index === null ? null : PROJECTS[(index - 1 + count) % count];
  const next = index === null ? null : PROJECTS[(index + 1) % count];

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="dossier"
          role="dialog"
          aria-modal="true"
          aria-label={p.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="dossier-sheet"
            ref={sheetRef}
            initial={reduced ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={reduced ? undefined : { y: "100%" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="dossier-tab">Project</span>

            <div className="dossier-bar">
              <button className="closebtn" ref={closeRef} onClick={onClose}>
                ← Close
              </button>
              <div className="pn">
                <button onClick={() => step(-1)}>← Prev</button>
                <button onClick={() => step(1)}>Next →</button>
              </div>
            </div>

            <div className="dossier-body">
              <div className="da-top">
                <span className="lbl">
                  {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                <span className="lbl">{p.cat}</span>
              </div>

              <h1 className="da-title">{p.name}</h1>

              {p.metric && (
                <div className="da-metricrow">
                  <span className="da-metric">
                    <span className="v">{p.metric.value}</span>
                    <span className="l">{p.metric.label}</span>
                  </span>
                </div>
              )}

              <p className="da-intro">{p.intro}</p>

              <div className="da-quote">
                <blockquote>{p.quote}</blockquote>
                <cite>{p.name}</cite>
              </div>

              <div className="da-cols">
                <div className="da-body">
                  {p.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <aside className="da-side">
                  <div className="blk">
                    <span className="k">Stack</span>
                    <div className="da-stack">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="blk">
                    <span className="k">Links</span>
                    {p.links.github || p.links.live ? (
                      <div className="da-links">
                        {p.links.github && (
                          <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                            GitHub →
                          </a>
                        )}
                        {p.links.live && (
                          <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                            Live →
                          </a>
                        )}
                      </div>
                    ) : null}
                    {p.links.note && <p className="da-note">{p.links.note}</p>}
                  </div>
                  <div className="blk">
                    <span className="k">Year</span>
                    <div className="da-stack">
                      <span>{p.year}</span>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="da-foot">
                <button className="nav prev" onClick={() => step(-1)}>
                  <span className="k">← Previous</span>
                  <span className="t">{prev?.name}</span>
                </button>
                <button className="nav next" onClick={() => step(1)}>
                  <span className="k">Next →</span>
                  <span className="t">{next?.name}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
