"use client";

import { profile } from "@/content/profile";
import { HeapStrip } from "./HeapStrip";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col pt-24"
    >
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 text-[10px] font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
        <div className="flex items-center gap-4">
          <span>Champaign · Chicago · Illinois</span>
          <span className="hidden md:inline opacity-50">/</span>
          <span className="hidden md:inline">40.1° N</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-alloc)]"
            style={{ boxShadow: "0 0 10px var(--color-alloc)" }}
          />
          heap live
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center md:justify-end px-6 md:px-12 pb-10 md:pb-12 pt-16 md:pt-0">
        <div className="eyebrow mb-6">SYS / 0x01 · PORTFOLIO.HEAP</div>
        <h1 className="display text-[clamp(4.5rem,16vw,14rem)] text-[color:var(--color-bone)]">
          Aryan
          <br />
          Singh
          <span className="caret" aria-hidden />
        </h1>

        <p className="mt-6 font-mono text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-[color:var(--color-bone-2)]">
          {profile.tagline}
        </p>

        <p className="mt-5 max-w-[42rem] text-[15px] md:text-[17px] leading-[1.55] text-[color:var(--color-bone-2)]">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
          <a
            href="#projects"
            className="px-4 py-2.5 border hairline-strong rounded-full text-[color:var(--color-bone)] hover:bg-[color:var(--color-alloc)] hover:border-[color:var(--color-alloc)] hover:text-[color:var(--color-ink)] transition-colors"
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
        </div>
      </div>

      <div className="relative z-10 border-t hairline">
        <div className="px-6 md:px-12 py-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
          <span>heap · 0x7ff0a0001000 · 256 cells</span>
          <span className="hidden md:inline">
            first-fit · address-sorted free list · coalescing
          </span>
          <span className="md:hidden">first-fit · coalescing</span>
        </div>
        <div className="h-[18vh] min-h-[120px] max-h-[220px] border-t hairline">
          <HeapStrip />
        </div>
      </div>
    </section>
  );
}
