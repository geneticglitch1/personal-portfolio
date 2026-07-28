import { EXPERIENCE } from "@/content/profile";
import SectionHead from "./motion/SectionHead";
import Offload from "./diagrams/offload";

/**
 * The one record, treated as the centrepiece rather than a list item.
 *
 * All of the motion here is CSS scroll-driven — the strip draws itself, the
 * two plates resolve, the bullets arrive one at a time against a rule that
 * inks in behind them. No `ReadHead`, so nothing about this section depends
 * on script having run.
 */
export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <SectionHead n="02" eyebrow="Experience" title="Experience" />

        {EXPERIENCE.map((r) => (
          <article className="record" key={r.org}>
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

                <div className="statplate stat-thr">
                  <span className="v" />
                  <span className="l">of the CPU baseline, same workload</span>
                </div>
                <div className="statplate stat-lat">
                  <span className="v">
                    <s>ms</s> µs
                  </span>
                  <span className="l">to dispatch an urgent job, once the queue was hardware</span>
                </div>
              </div>

              <div className="rcol-r">
                <p className="record-head-line">{r.headline}</p>

                <div className="offload">
                  <Offload />
                </div>

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
        ))}
      </div>
    </section>
  );
}
