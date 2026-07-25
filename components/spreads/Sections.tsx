import { PROJECTS } from "@/content/projects";
import { FEATURED_SLUGS } from "@/content/spreads";
import {
  PROFILE,
  EXPERIENCE,
  AWARDS,
  CONTACT_LINKS,
  SKILLS,
} from "@/content/profile";

export function TopBar() {
  return (
    <>
      {/* Reading progress, driven by scroll() in CSS. */}
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <TopBarInner />
    </>
  );
}

function TopBarInner() {
  return (
    <header className="topbar">
      <div className="row">
        <span className="who">
          {PROFILE.name.first} {PROFILE.name.last}
        </span>
        <span className="role">{PROFILE.role}</span>
        <nav>
          <a href="#work">Work</a>
          <a href="#more">Index</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export function Opening() {
  return (
    <section className="opening">
      <div className="wrap">
        <h1>
          {PROFILE.name.first}
          <br />
          {PROFILE.name.last}
        </h1>
        <div className="opening-foot r-stagger">
          <p className="thesis">{PROFILE.lead}</p>
          <div className="facts">
            {PROFILE.specs.map((s) => (
              <div className="f" key={s.k}>
                <span className="k">{s.k}</span>
                <span className="v">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Everything that doesn't get a spread. Each row expands to the full write-up
 * — these sixteen projects have the same prose the featured five do, and
 * leaving it at a one-liner made it unreachable.
 *
 * <details> rather than React state: no JS, keyboard and screen-reader
 * behaviour for free, and it still works if the bundle never loads.
 */
export function IndexList() {
  const rest = PROJECTS.filter((p) => !FEATURED_SLUGS.includes(p.slug));
  return (
    <section className="closing" id="more">
      <div className="wrap">
        <div className="section-head r-up">
          <h2>Everything else</h2>
          <span className="lbl">{rest.length} more · click to open</span>
        </div>
        <div className="idx r-stagger">
          {rest.map((p, i) => (
            <details className="idx-item" key={p.slug}>
              <summary className="idx-row">
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="nm">{p.name}</span>
                  <span className="ln">{p.line}</span>
                </span>
                <span className="ct">{p.cat}</span>
                <span className="yr">{p.year}</span>
                <span className="chev" aria-hidden="true">
                  ›
                </span>
              </summary>

              <div className="idx-body">
                <div>
                  <blockquote>{p.quote}</blockquote>
                  <p>{p.intro}</p>
                  {p.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
                <aside>
                  <div className="blk">
                    <span className="k">Stack</span>
                    <div className="stack">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="blk">
                    <span className="k">Source</span>
                    {p.links.github || p.links.live ? (
                      <div className="links">
                        {p.links.github && (
                          <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                            GitHub →
                          </a>
                        )}
                        {p.links.live && (
                          <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                            Live →
                          </a>
                        )}
                      </div>
                    ) : null}
                    {p.links.note && <p className="note">{p.links.note}</p>}
                  </div>
                </aside>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="closing" id="experience">
      <div className="wrap">
        <div className="section-head r-up">
          <h2>Experience</h2>
        </div>
        {EXPERIENCE.map((r) => (
          <div className="role-card r-up" key={r.org}>
            <div className="side">
              <span className="k">Organisation</span>
              <span className="v">{r.org}</span>
              <span className="k">Role</span>
              <span className="v">{r.role}</span>
              <span className="k">Dates</span>
              <span className="v">{r.dates}</span>
              <span className="k">Location</span>
              <span className="v">{r.location}</span>
            </div>
            <div>
              <p className="lead">{r.headline}</p>
              <ul>
                {r.bullets.map((b, i) => (
                  <li key={i}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="closing" id="about">
      <div className="wrap">
        <div className="section-head r-up">
          <h2>About</h2>
        </div>
        <div className="about-body r-up">
          <p className="say">{PROFILE.about}</p>
          <div>
            <div className="facts">
              {PROFILE.education.map((e) => (
                <div key={e.k}>
                  <span className="k">{e.k}</span>
                  <span className="v">{e.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-head r-up" style={{ marginTop: "clamp(36px,6vh,72px)" }}>
          <h2>What I work with</h2>
        </div>
        <div className="r-stagger">
          {SKILLS.map((g) => (
            <div className="skill-row" key={g.label}>
              <span className="k">{g.label}</span>
              <span className="v">{g.tags.join(" · ")}</span>
            </div>
          ))}
        </div>

        <div className="awards r-stagger">
          {AWARDS.map((a) => (
            <div className="a" key={a.title}>
              <span className="r">{a.rank}</span>
              <span>
                <span className="t">{a.title}</span>
                <span className="d">{a.detail}</span>
              </span>
              <span className="y">{a.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="closing" id="contact">
      <div className="wrap">
        <div className="section-head r-up">
          <h2>Get in touch</h2>
          <span className="lbl">Open to 2026 internships</span>
        </div>
        <div className="contact-links r-stagger">
          {CONTACT_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="k">{l.key}</span>
              <span className="v">{l.value} →</span>
            </a>
          ))}
        </div>
        <div className="footline">
          <span className="lbl">
            © 2026 · {PROFILE.name.first} {PROFILE.name.last}
          </span>
          <span className="lbl">Built and deployed from my own cluster</span>
        </div>
      </div>
    </section>
  );
}
