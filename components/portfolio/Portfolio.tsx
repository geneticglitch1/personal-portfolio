"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { LenisProvider } from "./LenisProvider";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "./Skills";
import { Awards } from "./Awards";
import { Contact } from "./Contact";
import { profile } from "@/content/profile";
import { useApp } from "@/lib/store";
import { CustomCursor } from "./CustomCursor";
import { BackgroundGlow } from "./BackgroundGlow";
import { Homelab } from "./Homelab";
import { Marquee } from "./Marquee";

const navLinks = [
  { id: "about",      label: "About",      num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "projects",   label: "Work",       num: "03" },
  { id: "skills",     label: "Stack",      num: "04" },
  { id: "awards",     label: "Awards",     num: "05" },
  { id: "homelab",    label: "Infra",      num: "06" },
  { id: "contact",    label: "Contact",    num: "07" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

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
        className="fixed top-4 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-14"
        style={{
          background: scrolled ? "rgba(7,7,13,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.3)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-hairline)"
            : "1px solid transparent",
          transition:
            "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        }}
      >
        <a
          href="/#home"
          className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors group"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 10px var(--color-accent)",
            }}
          />
          <span className="display text-[18px] leading-none text-[color:var(--color-bone)] group-hover:text-[color:var(--color-accent-hot)] transition-colors">
            Aryan Singh
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ id, label, num }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`/#${id}`}
                className="relative px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "color-mix(in srgb, var(--color-accent) 18%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--color-accent) 50%, transparent)",
                    }}
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
                  <span
                    className={`mr-1.5 ${
                      isActive
                        ? "text-[color:var(--color-accent-hot)]"
                        : "text-[color:var(--color-muted)]"
                    }`}
                  >
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
          className="text-[10px] font-mono uppercase tracking-[0.22em] rounded-full px-4 py-2 text-[color:var(--color-ink)] bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hot)] transition-colors"
        >
          Résumé ↓
        </a>
      </motion.header>

      <motion.div
        className="fixed top-[4.5rem] inset-x-0 h-[2px] z-50 origin-left"
        style={{
          scaleX: progressScale,
          background:
            "linear-gradient(90deg, var(--color-accent), var(--color-magenta), var(--color-cyan))",
        }}
      />
    </>
  );
}

function useActiveSection() {
  const setActiveSection = useApp((s) => s.setActiveSection);
  useEffect(() => {
    const ids = [
      "home",
      "about",
      "experience",
      "projects",
      "skills",
      "awards",
      "homelab",
      "contact",
    ];
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

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionReveal}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-14 border-t hairline">
      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12 md:col-span-8 small-caps flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[color:var(--color-bone-2)]">
            © 2026 Aryan Singh
          </span>
          <span>·</span>
          <a href="#homelab" className="hover:text-[color:var(--color-accent-hot)] transition-colors">
            Self-hosted on K3s
          </a>
          <span>·</span>
          <span>Set in Instrument Serif &amp; Inter</span>
        </div>
        <div className="col-span-12 md:col-span-4 small-caps md:text-right flex flex-wrap md:justify-end items-center gap-x-4 gap-y-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[color:var(--color-bone)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[color:var(--color-bone)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[color:var(--color-bone)] transition-colors"
          >
            Email
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
      <motion.div
        initial={false}
        animate="visible"
        variants={sectionReveal}
        custom={0.02}
      >
        <Hero />
      </motion.div>
      <RevealBlock delay={0.05}><About /></RevealBlock>
      <RevealBlock delay={0.08}><Experience /></RevealBlock>
      <Marquee
        items={[
          "Selected Work",
          "15 projects",
          "Systems",
          "ML",
          "Hardware",
          "Infrastructure",
        ]}
        speed={45}
        accent="var(--color-accent)"
      />
      <RevealBlock delay={0.11}><Projects /></RevealBlock>
      <RevealBlock delay={0.14}><Skills /></RevealBlock>
      <Marquee
        items={[
          "CUDA",
          "Rust",
          "K3s",
          "Next.js",
          "FastAPI",
          "PyTorch",
          "TypeScript",
          "C++",
          "PostgreSQL",
        ]}
        speed={55}
        reverse
        accent="var(--color-magenta)"
      />
      <RevealBlock delay={0.16}><Awards /></RevealBlock>
      <RevealBlock delay={0.18}><Homelab /></RevealBlock>
      <Marquee
        items={[
          "Available for Summer 2026",
          "Systems",
          "ML Infrastructure",
          "Full-Stack",
          "Let's build something",
        ]}
        speed={50}
        accent="var(--color-accent-hot)"
      />
      <RevealBlock delay={0.2}><Contact /></RevealBlock>
      <RevealBlock delay={0.22}><Footer /></RevealBlock>
    </main>
  );
}
