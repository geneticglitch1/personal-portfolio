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
        <div className="opening-foot">
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

/** Everything that doesn't get a spread. */
export function IndexList() {
  const rest = PROJECTS.filter((p) => !FEATURED_SLUGS.includes(p.slug));
  return (
    <section className="closing" id="more">
      <div className="wrap">
        <div className="section-head">
          <h2>Everything else</h2>
          <span className="lbl">{rest.length} more</span>
        </div>
        <div className="idx">
          {rest.map((p, i) => {
            const inner = (
              <>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="nm">{p.name}</span>
                  <span className="ln">{p.line}</span>
                </span>
                <span className="ct">{p.cat}</span>
                <span className="yr">{p.year}</span>
              </>
            );
            const href = p.links.live ?? p.links.github;
            return href ? (
              <a
                className="idx-row"
                key={p.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div className="idx-row" key={p.slug}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="closing" id="experience">
      <div className="wrap">
        <div className="section-head">
          <h2>Experience</h2>
        </div>
        {EXPERIENCE.map((r) => (
          <div className="role-card" key={r.org}>
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
        <div className="section-head">
          <h2>About</h2>
        </div>
        <div className="about-body">
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

        <div className="section-head" style={{ marginTop: "clamp(36px,6vh,72px)" }}>
          <h2>What I work with</h2>
        </div>
        <div className="about-body" style={{ display: "block" }}>
          {SKILLS.map((g) => (
            <div className="idx-row" key={g.label} style={{ gridTemplateColumns: "180px 1fr" }}>
              <span className="ct">{g.label}</span>
              <span className="ln" style={{ marginTop: 0, maxWidth: "none" }}>
                {g.tags.join(" · ")}
              </span>
            </div>
          ))}
        </div>

        <div className="awards">
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
        <div className="section-head">
          <h2>Get in touch</h2>
          <span className="lbl">Open to 2026 internships</span>
        </div>
        <div className="contact-links">
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
