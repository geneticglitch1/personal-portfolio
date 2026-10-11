"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROFILE, CONTACT_LINKS } from "@/content/profile";
import { RESUME_PDF } from "@/content/resume";
import usePrefersReducedMotion from "./motion/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_LINKS = ["Résumé", "GitHub", "LinkedIn", "Email"]
  .map((key) => CONTACT_LINKS.find((link) => link.key === key))
  .filter((link) => link !== undefined);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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
          {/* The second folder tab opens the résumé in place. */}
          <motion.div
            className="foldertabs"
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <span className="filetab">Portfolio · 2026</span>
            <a
              className="filetab tab-cta"
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              data-resume=""
            >
              Résumé
              <span className="arw" aria-hidden="true">
                ↗
              </span>
            </a>
          </motion.div>

          <div className="hero-topmeta">
            {[
              ["CS + Math", "UIUC"],
              ["Graduating", "May 2028"],
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

          <div className="hero-mid">
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
            </h1>

            <div className="hero-aside">
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
                Software
                <small>&amp; Systems</small>
              </motion.span>
            </div>
          </div>

          <div className="hero-foot">
            <div className="hero-actions" aria-label="Profile links">
              {HERO_LINKS.map((link) => (
                <a
                  className={`hero-action${link.href === RESUME_PDF ? " hero-action-resume" : ""}`}
                  href={link.href}
                  key={link.key}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(link.href === RESUME_PDF ? { "data-resume": "" } : {})}
                >
                  {link.key}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
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
