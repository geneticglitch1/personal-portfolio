"use client";

import { motion } from "motion/react";
import { PROJECTS } from "@/content/projects";
import SectionHead from "./motion/SectionHead";
import { useDossier } from "./DossierProvider";

const ROW = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Ledger() {
  const { open } = useDossier();

  return (
    <section className="sec" id="index">
      <div className="wrap">
        <SectionHead
          n="02"
          eyebrow="Index"
          title="All projects"
          right={
            <>
              <span className="lbl">{PROJECTS.length} total</span>
              <span className="lbl">Hover a row</span>
            </>
          }
        />

        <div className="ledger">
          {PROJECTS.map((p, i) => {
            // Per-row phase gives the stack a riffle instead of a rigid slide.
            const phase = (((i * 7) % 5) + 1) * 1.8;
            const body = (
              <>
                <div className="lhead">
                  <span className="lacc">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lyear">{p.year}</span>
                  <span className="lname">{p.name}</span>
                  <span className="lcat">{p.cat}</span>
                  <span className="larr">{p.links.live ? "↗" : "→"}</span>
                </div>
                <div className="lmore">
                  <div>
                    <div className="lmore-in">
                      <div />
                      <div>
                        <p>{p.line}</p>
                        <div className="lt">
                          {p.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={p.slug}
                variants={ROW}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                style={{ ["--phase" as string]: phase }}
              >
                {p.links.live ? (
                  <a
                    className="lrow"
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <button className="lrow" onClick={() => open(i)}>
                    {body}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
