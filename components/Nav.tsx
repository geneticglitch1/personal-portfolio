"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { SECTIONS, PROFILE, CONTACT_LINKS } from "@/content/profile";
import { RESUME_PDF } from "@/content/resume";

function LinkIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "GitHub" ? (
        <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      ) : name === "LinkedIn" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7.5 10v7M11.5 17v-7m0 3a3 3 0 0 1 6 0v4" />
          <circle cx="7.5" cy="7" r=".6" fill="currentColor" />
        </>
      ) : (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
    </svg>
  );
}

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

          <div className="nav-actions" aria-label="Profile links">
            <a className="nav-resume" href={RESUME_PDF} data-resume="" target="_blank" rel="noopener noreferrer">
              Résumé <span aria-hidden="true">↗</span>
            </a>
            {CONTACT_LINKS.filter((link) => ["GitHub", "LinkedIn", "Email"].includes(link.key)).map((link) => (
              <a
                className="nav-social"
                key={link.key}
                href={link.href}
                aria-label={link.key}
                title={link.key === "Email" ? link.value : link.key}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <LinkIcon name={link.key} />
                <span>{link.key}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
