import { EXPERIENCE } from "@/content/profile";
import SectionHead from "./motion/SectionHead";

/**
 * Personal contributions and coauthored research results are presented
 * separately so each measurement has a clear attribution and baseline.
 */
export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <SectionHead n="02" eyebrow="Experience" title="Experience" />

        {EXPERIENCE.map((r) => (
          <article className="record" key={`${r.org}-${r.role}`}>
            <div className="record-top">
              <div className="ro">{r.org}</div>
              <div className="rmeta">
                {r.role}
                <br />
                {r.dates}
              </div>
            </div>

            <div className="record-body">
              <div className="rcol-l">
                <div className="record-field">
                  <span className="k">Location</span>
                  <span className="v">{r.location}</span>
                </div>
                <div className="record-field">
                  <span className="k">Type</span>
                  <span className="v">{r.type}</span>
                </div>
              </div>

              <div className="rcol-r">
                <p className="record-head-line">{r.headline}</p>

                <ul className="record-bullets">
                  {r.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="bn">{String(i + 1).padStart(2, "0")}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {r.research && (
                  <div className="record-publication">
                    <span className="lbl">Coauthored research · BoostedSOSA</span>
                    <a className="paper-link" href={r.research.href} target="_blank" rel="noopener noreferrer">
                      Read paper <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
