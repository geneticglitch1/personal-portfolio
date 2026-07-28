"use client";

import { motion } from "motion/react";
import { AWARDS } from "@/content/profile";
import SectionHead from "./motion/SectionHead";

export default function Recognition() {
  return (
    <section className="sec" id="recognition">
      <div className="wrap">
        <SectionHead
          n="04"
          eyebrow="Recognition"
          title="Recognition"
          right={<span className="lbl">{AWARDS.length} entries</span>}
        />

        <div className="awards">
          {AWARDS.map((a) => (
            <motion.div
              className="award"
              key={a.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              <motion.span
                className="seal-ico"
                variants={{
                  hidden: { scale: 0, rotate: -30, opacity: 0 },
                  show: {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                  },
                }}
              >
                {a.rank}
              </motion.span>
              <span className="atitle">{a.title}</span>
              <span className="adetail">{a.detail}</span>
              <span className="ayear">{a.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
