"use client";

import { useEffect, useRef } from "react";
import {
  PROFILE,
  SKILLS,
  EXPERIENCE,
  AWARDS,
  CONTACT_LINKS,
} from "@/content/profile";

export type InfoSection = "experience" | "skills" | "about" | "contact";

export default function InfoOverlay({
  section,
  onClose,
}: {
  section: InfoSection;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, [section]);

  return (
    <div className="info" role="dialog" aria-modal="true" aria-label={section}>
      <button className="info-close" ref={closeRef} onClick={onClose}>
        Close ✕
      </button>
      <div className="info-in">
        {section === "about" && (
          <>
            <h3>About</h3>
            <p className="lede">{PROFILE.about}</p>
            <div className="grid2">
              <div className="card">
                <span className="k">Education</span>
                <div className="rows">
                  {PROFILE.education.map((e) => (
                    <div className="r" key={e.k}>
                      <span className="k">{e.k}</span>
                      <span className="v">{e.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <span className="k">Memberships</span>
                <div className="tags">
                  {PROFILE.memberships.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {section === "skills" && (
          <>
            <h3>What I work with</h3>
            <p className="lede">
              Grouped the way the trace is: the further down the list, the further
              under the abstraction.
            </p>
            <div className="grid2">
              {SKILLS.map((g) => (
                <div className="card" key={g.label}>
                  <span className="k">{g.label}</span>
                  <div className="tags">
                    {g.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "experience" && (
          <>
            <h3>Experience</h3>
            {EXPERIENCE.map((r) => (
              <div key={r.org} style={{ marginBottom: 40 }}>
                <p className="lede" style={{ marginBottom: 12 }}>
                  {r.headline}
                </p>
                <div className="rows">
                  <div className="r">
                    <span className="k">Org</span>
                    <span className="v">{r.org}</span>
                  </div>
                  <div className="r">
                    <span className="k">Role</span>
                    <span className="v">{r.role}</span>
                  </div>
                  <div className="r">
                    <span className="k">Dates</span>
                    <span className="v">{r.dates}</span>
                  </div>
                  <div className="r">
                    <span className="k">Location</span>
                    <span className="v">{r.location}</span>
                  </div>
                </div>
                <ul className="bullets">
                  {r.bullets.map((b, i) => (
                    <li key={i}>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <h3 style={{ fontSize: 22, marginTop: 10 }}>Recognition</h3>
            <div className="rows">
              {AWARDS.map((a) => (
                <div className="r" key={a.title}>
                  <span className="k">
                    {a.rank} · {a.year}
                  </span>
                  <span className="v">
                    {a.title}
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "var(--dim)",
                        fontFamily: "var(--mono)",
                        marginTop: 4,
                      }}
                    >
                      {a.detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "contact" && (
          <>
            <h3>Get in touch</h3>
            <p className="lede">
              Open to 2026 internships. Champaign or Chicago, or remote.
            </p>
            <div className="rows">
              {CONTACT_LINKS.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="k">{l.key}</span>
                  <span className="v">{l.value} →</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
