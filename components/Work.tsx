"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { PROJECTS, FEATURED, type Project } from "@/content/projects";
import SectionHead from "./motion/SectionHead";
import CountUp from "./CountUp";
import { useDossier } from "./DossierProvider";

/**
 * Scattered resting positions, as a fraction of board width plus a px offset.
 * The lefts are spaced by just over one card width so the pile reads as a pile
 * without any card covering the one beneath it — the rotations and vertical
 * offsets carry the scatter instead.
 */
const LAYOUT = [
  { left: 0.0, top: 10, rot: -3.5 },
  { left: 0.24, top: 150, rot: 2.4 },
  { left: 0.48, top: 45, rot: -1.6 },
  { left: 0.72, top: 215, rot: 3.2 },
];
/** Where the deck sits squared up before it's dealt. */
const STACK = { left: 0.3, top: 110 };
/** Below this board width the pile stops being legible; cards go to a column. */
const STACK_BREAKPOINT = 900;

export default function Work() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [topZ, setTopZ] = useState(10);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ["start 0.85", "start 0.25"],
  });

  const featured = PROJECTS.slice(0, FEATURED);
  const narrow = width > 0 && width < STACK_BREAKPOINT;
  const dealt = !narrow && !reduced && width > 0;

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <SectionHead
          n="01"
          eyebrow="Work"
          title="Selected work"
          right={
            <>
              <span className="lbl">{String(FEATURED).padStart(2, "0")} projects</span>
              <span className="lbl">{narrow ? "Tap to open" : "Drag to browse"}</span>
            </>
          }
        />
        <div className="board">
          <div className={`cards${narrow ? " stack" : ""}`} ref={boardRef}>
            {featured.map((p, i) => (
              <DealtCard
                key={p.slug}
                project={p}
                i={i}
                width={width}
                progress={scrollYProgress}
                dealt={dealt}
                narrow={narrow}
                topZ={topZ}
                bumpZ={() => setTopZ((z) => z + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DealtCardProps {
  project: Project;
  i: number;
  width: number;
  progress: MotionValue<number>;
  dealt: boolean;
  narrow: boolean;
  topZ: number;
  bumpZ: () => void;
}

function DealtCard({
  project,
  i,
  width,
  progress,
  dealt,
  narrow,
  topZ,
  bumpZ,
}: DealtCardProps) {
  const slot = LAYOUT[i % LAYOUT.length];
  const { open } = useDossier();
  const [z, setZ] = useState(i + 1);

  // Offsets from the resting position back to the squared-up deck. Driving the
  // card from its final position means scrolling up re-stacks it.
  const dx = STACK.left * width - slot.left * width;
  const dy = STACK.top - slot.top;
  const deckRot = -1.2 + i * 0.8;

  const x = useTransform(progress, [0, 1], [dx, 0]);
  const y = useTransform(progress, [0, 1], [dy, 0]);
  const rotate = useTransform(progress, [0, 1], [deckRot, slot.rot]);
  const opacity = useTransform(progress, [0, 0.12], [0, 1]);

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);

  const slotStyle = narrow
    ? undefined
    : {
        left: `${slot.left * 100}%`,
        top: slot.top,
        zIndex: z,
      };

  return (
    <motion.div
      className="card-slot"
      style={dealt ? { ...slotStyle, x, y, rotate, opacity } : slotStyle}
    >
      <motion.article
        className="card"
        drag={dealt}
        dragMomentum={false}
        dragElastic={0.12}
        whileHover={dealt ? { scale: 1.03 } : undefined}
        whileDrag={{ scale: 1.05 }}
        onPointerDown={() => {
          if (!dealt) return;
          bumpZ();
          setZ(topZ + 1);
        }}
      >
        <span className="punch" />
        <div className="chead">
          <span className="cno">{String(i + 1).padStart(2, "0")}</span>
          <span className="cyear">{project.year}</span>
        </div>
        <div className="cbody">
          <h3 className="ctitle">{project.name}</h3>
          <p className="cdesc">{project.desc}</p>
          {project.metric && (
            <span className="cmetric">
              <CountUp metric={project.metric} />
              <span className="l">{project.metric.label}</span>
            </span>
          )}
          <div className="ctags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="cfoot">
            <button
              className="openbtn"
              onClick={() => open(index)}
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
              Open →
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
