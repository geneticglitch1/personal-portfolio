"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RESUME_PAGES, RESUME_PDF } from "@/content/resume";
import { getLenis } from "./motion/LenisProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The résumé, read in place.
 *
 * Clicking the folder's résumé tab pulls the document up onto the desk instead
 * of handing the visitor to the browser's PDF plugin. The tab that opened it
 * comes with it, so the gesture reads as pulling one document out of the file.
 *
 * Opening is delegated: any `<a data-resume>` anywhere on the page triggers it,
 * which means server components only have to add an attribute and there's no
 * context to thread through. Those anchors keep their real href, so with
 * scripting off they just open the PDF — and modified clicks (cmd, middle) are
 * left alone so "open in new tab" still works.
 *
 * Mounted only while open, so the page images aren't fetched until someone
 * actually asks for them.
 */
export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  /* Delegated opener. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement)?.closest?.(
        "a[data-resume]"
      ) as HTMLElement | null;
      if (!link) return;
      e.preventDefault();
      opener.current = link;
      setPage(1);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* Escape, scroll lock, and focus. Lenis runs its own scroll loop, so telling
     the body to stop overflowing isn't enough on its own. */
  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      opener.current?.focus();
    };
  }, [open, close]);

  /* Which sheet is in view, for the counter in the bar. */
  useEffect(() => {
    if (!open) return;
    const root = bodyRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPage(Number((entry.target as HTMLElement).dataset.page));
          }
        }
      },
      { root, threshold: 0.5 }
    );
    root.querySelectorAll<HTMLElement>("[data-page]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="rv" role="dialog" aria-modal="true" aria-label="Résumé">
          <motion.button
            type="button"
            className="rv-scrim"
            aria-label="Close résumé"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          />

          <motion.div
            className="rv-sheet"
            initial={reduced ? { opacity: 0 } : { y: "100%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            exit={reduced ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: reduced ? 0.2 : 0.6, ease: EASE }}
          >
            <span className="rv-filetab" aria-hidden="true">
              Résumé
            </span>

            <div className="rv-bar">
              <span className="rv-count lbl">
                Sheet <b>{page}</b> of {RESUME_PAGES.length}
              </span>

              <div className="rv-actions">
                <a href={RESUME_PDF} download>
                  Download
                  <span aria-hidden="true">↓</span>
                </a>
                <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer">
                  Open PDF
                  <span aria-hidden="true">↗</span>
                </a>
                <button type="button" onClick={close} ref={closeRef}>
                  Close
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>

            {/* `data-lenis-prevent`: a stopped Lenis still calls
                preventDefault on wheel, so without this the sheets can't
                scroll while the viewer is open. */}
            <div className="rv-body" ref={bodyRef} data-lenis-prevent>
              {RESUME_PAGES.map((p) => (
                <figure className="rv-page" key={p.page} data-page={p.page}>
                  {/* Plain <img>: the export is unoptimized anyway, and these
                      only ever load once the viewer is open. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/resume/page-${p.page}.webp`}
                    width={p.w}
                    height={p.h}
                    alt={`Résumé, page ${p.page} of ${RESUME_PAGES.length}`}
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
