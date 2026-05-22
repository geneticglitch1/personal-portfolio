"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col pt-[5.5rem]"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
      >
        <div className="flex items-center gap-3">
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Portfolio · Issue 02 · 2026</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 flex-1 flex flex-col justify-center md:justify-end px-6 md:px-12 pb-16 md:pb-20 pt-16 md:pt-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="eyebrow mb-6"
        >
          Aryan Singh · Portfolio
        </motion.div>

        <h1 className="display text-[clamp(4rem,15vw,13rem)] text-[color:var(--color-bone)]">
          Aryan
          <br />
          Singh
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-8 max-w-[60ch] text-[color:var(--color-bone-2)] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55]"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          <a
            href="#projects"
            className="px-4 py-2.5 border hairline-strong rounded-full text-[color:var(--color-bone)] hover:bg-[color:var(--color-bone)] hover:text-[color:var(--color-ink)] transition-colors"
          >
            View Work →
          </a>
          <a
            href={profile.resume}
            className="px-4 py-2.5 border hairline rounded-full text-[color:var(--color-bone-2)] hover:border-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors"
          >
            Résumé ↓
          </a>
          <a
            href="#contact"
            className="px-4 py-2.5 border hairline rounded-full text-[color:var(--color-bone-2)] hover:border-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-t hairline">
        <div className="px-6 md:px-12 py-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
          <span>Computer Science & Mathematics · UIUC</span>
          <span className="hidden md:inline">
            Self-hosted · K3s · Cloudflare mTLS
          </span>
          <span className="md:hidden">Self-hosted on K3s</span>
        </div>
      </div>
    </section>
  );
}
