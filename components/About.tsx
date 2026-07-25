"use client";

import { motion } from "motion/react";
import { PROFILE } from "@/content/profile";
import SectionHead from "./motion/SectionHead";
import ReadHead from "./motion/ReadHead";

export default function About() {
  const words = PROFILE.about.split(/\s+/);

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SectionHead n="06" eyebrow="About" title="About" />

        <div className="about-grid">
          {/* One observer on the paragraph staggers every word, rather than an
              observer per word. */}
          <motion.p
            className="about-para"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.014 } } }}
          >
            {words.map((w, i) => (
              <motion.span
                className="w"
                key={i}
                variants={{
                  hidden: { opacity: 0.3 },
                  show: { opacity: 1, transition: { duration: 0.35 } },
                }}
              >
                {w}{" "}
              </motion.span>
            ))}
          </motion.p>

          <ReadHead bare>
            <aside className="about-card">
              <span className="pin" />
              <div className="ach">Education</div>
              <div className="about-meta">
                {PROFILE.education.map((c) => (
                  <div className="cell" key={c.k}>
                    <span className="k">{c.k}</span>
                    <span className="v">{c.v}</span>
                  </div>
                ))}
              </div>
              <div className="about-members">
                <span className="ml">Memberships</span>
                {PROFILE.memberships.map((m) => (
                  <span className="tg" key={m}>
                    {m}
                  </span>
                ))}
              </div>
            </aside>
          </ReadHead>
        </div>
      </div>
    </section>
  );
}
