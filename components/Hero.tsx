"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { PROFILE } from "@/content/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stampY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  const show = reduced ? undefined : "show";

  return (
    <header className="hero sec" id="top" ref={ref}>
      <div className="wrap">
        <motion.div
          className="folder"
          initial={reduced ? false : "hidden"}
          animate={show}
          variants={{
            hidden: {},
            show: { transition: { delayChildren: 0.12, staggerChildren: 0.06 } },
          }}
        >
          <motion.div
            className="filetab"
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            Portfolio · 2026
          </motion.div>

          <div className="hero-topmeta">
            {[
              ["CS + Math", "UIUC"],
              ["Graduating", "May 2027"],
              ["Based in", "Champaign · Chicago, IL"],
            ].map(([k, v]) => (
              <motion.span
                className="lbl"
                key={k}
                variants={{
                  hidden: { y: 14, opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                {k} <b>{v}</b>
              </motion.span>
            ))}
          </div>

          <h1 className="hero-name">
            {[PROFILE.name.first, PROFILE.name.last].map((line) => (
              <span className="ln" key={line}>
                <motion.span
                  variants={{
                    hidden: { y: "110%" },
                    show: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="hero-stamp"
              style={reduced ? undefined : { y: stampY }}
              variants={{
                hidden: { scale: 0, rotate: 22, opacity: 0 },
                show: {
                  scale: 1,
                  rotate: -8,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                },
              }}
            >
              Systems
              <small>Engineer</small>
            </motion.span>
          </h1>

          <div className="hero-foot">
            <motion.p
              className="lead"
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
              }}
            >
              {PROFILE.lead}
            </motion.p>
            <div className="specs">
              {PROFILE.specs.map((s) => (
                <motion.div
                  className="r"
                  key={s.k}
                  variants={{
                    hidden: { y: 18, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
                  <span className="k">{s.k}</span>
                  <span className="v">{s.v}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.a
          className="scrollcue"
          href="#work"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        >
          <span className="arw">↓</span> Selected work
        </motion.a>
      </div>
    </header>
  );
}
