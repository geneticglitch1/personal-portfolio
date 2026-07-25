import { EXPERIENCE } from "@/content/profile";
import SectionHead from "./motion/SectionHead";
import ReadHead from "./motion/ReadHead";

export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <SectionHead n="03" eyebrow="Experience" title="Experience" />

        {EXPERIENCE.map((r) => (
          <ReadHead key={r.org}>
            <article className="record">
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
                </div>
              </div>
            </article>
          </ReadHead>
        ))}
      </div>
    </section>
  );
}
