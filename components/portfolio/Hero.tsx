"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { profile } from "@/content/profile";

const MARQUEE_ITEMS = [
  "Available for Summer 2026",
  "Systems",
  "ML Infrastructure",
  "Full-Stack",
  "Hardware",
  "Self-hosted on K3s",
  "UIUC · CS + Math",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const gradientX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const marqueeX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -240]),
    { stiffness: 80, damping: 26, mass: 0.4 }
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] flex flex-col pt-[5.5rem] overflow-hidden"
    >
      <motion.div
        style={{ opacity: eyebrowOpacity }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-green)]"
            style={{ boxShadow: "0 0 10px var(--color-green)" }}
          />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Portfolio · Issue 02 · 2026</span>
        </div>
      </motion.div>

      <motion.div
        style={{ y: nameY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 flex-1 flex flex-col justify-center md:justify-end px-6 md:px-12 pb-16 md:pb-20 pt-16 md:pt-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span
            className="inline-block w-6 h-px"
            style={{ background: "var(--color-accent)" }}
          />
          Hi, I&apos;m Aryan
        </motion.div>

        <motion.h1
          style={{
            backgroundPosition: gradientX,
          }}
          className="display display-grad text-[clamp(4rem,16vw,14rem)]"
        >
          Aryan
          <br />
          Singh<span style={{ color: "var(--color-accent)" }}>.</span>
        </motion.h1>

        <motion.p
          style={{ y: taglineY }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-10 max-w-[58ch] text-[color:var(--color-bone-2)] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.55]"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-12 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full text-[color:var(--color-ink)] bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hot)] transition-colors"
            style={{
              boxShadow: "0 12px 40px -10px color-mix(in srgb, var(--color-accent) 70%, transparent)",
            }}
          >
            View my work
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href={profile.resume}
            className="px-5 py-3 border hairline-strong rounded-full text-[color:var(--color-bone)] hover:border-[color:var(--color-bone)] hover:bg-[color:var(--color-bone)] hover:text-[color:var(--color-ink)] transition-colors"
          >
            Résumé ↓
          </a>
          <a
            href="#contact"
            className="px-5 py-3 border hairline rounded-full text-[color:var(--color-bone-2)] hover:border-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-t hairline overflow-hidden">
        <motion.div
          style={{ x: marqueeX }}
          className="flex items-center gap-12 py-5 whitespace-nowrap"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="display text-[clamp(1.5rem,4vw,3rem)] leading-none text-[color:var(--color-bone-2)] flex items-center gap-12"
            >
              {item}
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
