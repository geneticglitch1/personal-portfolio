"use client";

import { motion } from "motion/react";
import { SKILLS } from "@/content/profile";
import SectionHead from "./motion/SectionHead";

export default function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <SectionHead
          n="03"
          eyebrow="Skills"
          title="What I work with"
          right={<span className="lbl">{SKILLS.length} groups</span>}
        />

        <motion.div
          className="drawers"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {SKILLS.map((g, i) => (
            <motion.div
              className="drawer"
              key={g.label}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <span className="pull" />
              <span className="dno">{String(i + 1).padStart(2, "0")}</span>
              <div className="dlabel">{g.label}</div>
              <div className="dtags">
                {g.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
