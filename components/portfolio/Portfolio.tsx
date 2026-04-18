"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { LenisProvider } from "./LenisProvider";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useApp } from "@/lib/store";
import { CustomCursor } from "./CustomCursor";
import { BackgroundGlow } from "./BackgroundGlow";

const navLinks = [
  { id: "about",      label: "About",      num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "projects",   label: "Work",       num: "03" },
  { id: "skills",     label: "Stack",      num: "04" },
  { id: "contact",    label: "Contact",    num: "05" },
];

function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useApp((s) => s.activeSection);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
    mass: 0.3,
  });

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-14"
        style={{
          background: scrolled ? "rgba(7,7,13,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(1.3)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-hairline)"
            : "1px solid transparent",
          transition:
            "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        }}
      >
        <a
          href="#home"
          className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-alloc)]"
            style={{ boxShadow: "0 0 8px var(--color-alloc)" }}
          />
          <span>AS</span>
          <span className="text-[color:var(--color-muted)]">/</span>
          <span className="text-[color:var(--color-muted)] hidden sm:inline">
            aryan.singh
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ id, label, num }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="relative px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[color:var(--color-ink-3)] border hairline-strong"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? "text-[color:var(--color-bone)]"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-bone-2)]"
                  }`}
                >
                  <span className="text-[color:var(--color-muted)] mr-1.5">
                    {num}
                  </span>
                  {label}
                </span>
              </a>
            );
          })}
        </nav>

        <a
          href={profile.resume}
          className="text-[10px] font-mono uppercase tracking-[0.22em] border hairline rounded-full px-3.5 py-1.5 text-[color:var(--color-bone-2)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-alloc)] hover:border-[color:var(--color-alloc)] transition-colors"
        >
          Résumé ↓
        </a>
      </motion.header>

      <motion.div
        className="fixed top-14 inset-x-0 h-[1.5px] z-50 origin-left bg-[color:var(--color-alloc)]"
        style={{ scaleX: progressScale }}
      />
    </>
  );
}

function useActiveSection() {
  const setActiveSection = useApp((s) => s.setActiveSection);
  useEffect(() => {
    const ids = ["home", "about", "experience", "projects", "skills", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0, 0.15, 0.3, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [setActiveSection]);
}

function ActiveSectionHost() {
  useActiveSection();
  return null;
}

function Footer() {
  const total = projects.reduce((a, p) => {
    const b = parseInt(p.bytes, 16);
    return a + (isNaN(b) ? 0 : b);
  }, 0);
  return (
    <footer className="relative px-6 md:px-12 py-10 border-t hairline">
      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12 md:col-span-6 font-mono text-[11px] text-[color:var(--color-muted)] uppercase tracking-[0.2em] flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            className="inline-flex items-center gap-2 text-[color:var(--color-bone-2)]"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-alloc)]"
              style={{ boxShadow: "0 0 8px var(--color-alloc)" }}
            />
            k3s · 6 nodes · 99.9% uptime
          </span>
          <span>·</span>
          <span>heap resident: 0x{total.toString(16)}</span>
          <span>·</span>
          <span>built in a basement in chicago</span>
        </div>
        <div className="col-span-12 md:col-span-6 font-mono text-[11px] text-[color:var(--color-muted)] uppercase tracking-[0.2em] md:text-right">
          © 2026 Aryan Singh ·{" "}
          <a
            href="https://github.com/geneticglitch1"
            className="hover:text-[color:var(--color-bone)]"
          >
            github
          </a>{" "}
          ·{" "}
          <a
            href={profile.socials.linkedin}
            className="hover:text-[color:var(--color-bone)]"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  return (
    <main className="relative overflow-x-hidden">
      <CustomCursor />
      <BackgroundGlow />
      <LenisProvider />
      <ActiveSectionHost />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
