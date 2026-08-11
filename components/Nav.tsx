"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { SECTIONS, PROFILE } from "@/content/profile";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let cur: string | null = null;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <motion.i style={{ scaleX: scrollYProgress }} />
      </div>

      <nav className="tabnav" aria-label="Sections">
        <div className="row">
          <a className="home" href="#top">
            <span className="seal-dot" />
            <b>
              {PROFILE.name.first} {PROFILE.name.last}
            </b>
          </a>
          <div className="tabs">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                className="tab"
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : "false"}
              >
                <span className="n">{s.n}</span> {s.label}
              </a>
            ))}
          </div>

          {/* Live status, not decoration: the page you're reading is served
              from the cluster in the About section. */}
          <span className="selfhost" title="Served from my own K3s cluster">
            <i className="blip" aria-hidden="true" />
            <b>Self-hosted</b>
          </span>
        </div>
      </nav>
    </>
  );
}
