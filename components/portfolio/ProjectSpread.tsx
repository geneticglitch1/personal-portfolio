"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { categoryLabel, type Project } from "@/content/projects";

function PullQuote({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 0.96]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.5]
  );

  return (
    <motion.div ref={ref} style={{ y, scale, opacity }} className="will-change-transform">
      <blockquote className="pull-quote text-center px-2 md:px-8">
        <span className="text-[color:var(--color-accent)] mr-1">“</span>
        {text}
        <span className="text-[color:var(--color-accent)] ml-1">”</span>
      </blockquote>
    </motion.div>
  );
}

function HeroMetricBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-baseline gap-6 md:gap-10"
    >
      <span className="hero-metric-value">{value}</span>
      <span className="hero-metric-label max-w-[24ch]">{label}</span>
    </motion.div>
  );
}

export function ProjectSpread({ project }: { project: Project }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0.3]);

  return (
    <article className="relative px-6 md:px-12 pt-32 pb-24 overflow-hidden">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center justify-between small-caps">
            <Link
              href="/#projects"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              ← Back to work
            </Link>
            <span>
              {categoryLabel[project.category]} · {project.year}
            </span>
          </div>
        </div>

        <motion.header
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          className="mt-10 grid grid-cols-12 gap-x-6 gap-y-6"
        >
          <h1 className="col-span-12 md:col-span-10 md:col-start-2 display text-[clamp(2.6rem,7vw,6rem)] leading-[0.96] text-[color:var(--color-bone)]">
            {project.name}
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10"
        >
          <p className="col-span-12 md:col-span-8 md:col-start-3 spread-intro">
            {project.intro}
          </p>
        </motion.div>

        {project.heroMetric && (
          <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6 border-y hairline py-14 relative">
            <div
              className="absolute inset-0 dot-grid opacity-50 pointer-events-none"
              aria-hidden
            />
            <div className="col-span-12 md:col-span-8 md:col-start-3 relative">
              <HeroMetricBlock
                value={project.heroMetric.value}
                label={project.heroMetric.label}
              />
            </div>
          </div>
        )}

        <figure className="mt-24 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <PullQuote text={project.pullQuote} />
          </div>
        </figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 grid grid-cols-12 gap-x-6 gap-y-6"
        >
          <div className="col-span-12 md:col-span-8 md:col-start-3 body-prose">
            {project.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 border-t hairline pt-14">
          <div className="col-span-12 md:col-span-3 md:col-start-3">
            <div className="small-caps mb-4">Stack</div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 border hairline rounded-full text-[color:var(--color-bone-2)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hot)] transition-colors"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="small-caps mb-4">Links</div>
            <ul className="space-y-3">
              {project.links.github && (
                <li>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[15px] text-[color:var(--color-bone)] hover:text-[color:var(--color-accent-hot)] transition-colors"
                  >
                    <span className="small-caps text-[color:var(--color-muted)]">
                      Source
                    </span>
                    <span>{project.links.github.replace(/^https?:\/\//, "")}</span>
                    <span className="text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </li>
              )}
              {project.links.live && (
                <li>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[15px] text-[color:var(--color-bone)] hover:text-[color:var(--color-accent-hot)] transition-colors"
                  >
                    <span className="small-caps text-[color:var(--color-muted)]">
                      Live
                    </span>
                    <span>{project.links.live.replace(/^https?:\/\//, "")}</span>
                    <span className="text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </li>
              )}
              {project.links.note && (
                <li className="text-[14px] text-[color:var(--color-muted)] italic">
                  {project.links.note}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 border-t hairline pt-8 flex items-center justify-between small-caps">
            <Link
              href="/#projects"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              ← All projects
            </Link>
            <Link
              href="/#contact"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
