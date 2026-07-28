import type { Project } from "@/content/projects";
import { DIAGRAMS } from "./diagrams";

/**
 * The card is the whole story. There is no detail view behind it, so
 * everything a reader gets is here: one line, the drawing, the metric, three
 * tags. When the project has a link the entire card is that link; when the
 * source is private it isn't clickable at all, so nothing invites a click that
 * leads nowhere.
 *
 * Deliberately a server component — no state, no effects, nothing that has to
 * run for the card to render.
 */
export default function ProjectCard({ p, n }: { p: Project; n: number }) {
  const Diagram = DIAGRAMS[p.diagram];
  const href = p.links.live ?? p.links.github;

  const body = (
    <>
      <span className="punch" aria-hidden="true" />
      <div className="pmeta">
        <span>
          {String(n).padStart(2, "0")} · <span className="pcat">{p.cat}</span>
        </span>
        <span>{p.year}</span>
      </div>

      <h3 className="ptitle">{p.name}</h3>
      <p className="pdesc">{p.desc}</p>

      <div className="pfig">{Diagram ? <Diagram /> : null}</div>

      <div className="pfoot">
        {p.metric && (
          <span className="pmetric">
            <span className="v">{p.metric.value}</span>
            <span className="l">{p.metric.label}</span>
          </span>
        )}
        {!p.metric && p.links.note && <span className="pnote">{p.links.note}</span>}
        <span className="ptags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </div>

      {href && (
        <span className="parrow" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  return href ? (
    <a className="pcard" href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <article className="pcard">{body}</article>
  );
}
