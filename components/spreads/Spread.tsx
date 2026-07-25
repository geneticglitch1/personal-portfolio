import { PROJECTS } from "@/content/projects";
import type { Spread as SpreadMeta } from "@/content/spreads";
import { DIAGRAMS } from "./Diagrams";

/**
 * One headline project: the claim in large type on the left, the drawing that
 * explains it on the right, and the full write-up underneath.
 *
 * Deliberately static — nothing here is revealed by script, so there is no
 * state in which the page renders empty.
 */
export default function Spread({ meta, n }: { meta: SpreadMeta; n: number }) {
  const p = PROJECTS.find((x) => x.slug === meta.slug);
  if (!p) return null;
  const Diagram = DIAGRAMS[meta.diagram];

  return (
    <section className="spread" id={p.slug}>
      <div className="wrap">
        <div className="spread-grid">
          <div className="spread-head">
            <span className="num">
              {String(n).padStart(2, "0")} — {p.cat} · {p.year}
            </span>
            <h2>{p.name}</h2>
            <p className="claim">{p.desc}</p>

            {p.metric && (
              <div className="metric">
                <span className="v">{p.metric.value}</span>
                <span className="l">{p.metric.label}</span>
              </div>
            )}

            <div className="tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <figure className="figure">
            <div className="plate">
              <Diagram />
            </div>
            <figcaption>{meta.caption}</figcaption>
          </figure>
        </div>

        <div className="prose">
          <div className="col">
            <blockquote>{p.quote}</blockquote>
            <p>{p.intro}</p>
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
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
      </div>
    </section>
  );
}
