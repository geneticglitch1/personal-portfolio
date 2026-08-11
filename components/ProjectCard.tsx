import type { Project } from "@/content/projects";
import { DIAGRAMS } from "./diagrams";

/**
 * Two states, one card.
 *
 * Open — the six flagships — carries the drawing, which is the part that does
 * the persuading. Closed carries the same facts without the figure, so the
 * rest of the work is still readable without turning the grid into a wall of
 * twenty-three diagrams.
 *
 * When the project has a link the entire card is that link; when the source is
 * private it isn't clickable at all, so nothing invites a click that leads
 * nowhere.
 *
 * Deliberately a server component — no state, no effects, nothing that has to
 * run for the card to render.
 */
export default function ProjectCard({ p, n }: { p: Project; n: number }) {
  const open = Boolean(p.featured);
  const Diagram = open ? DIAGRAMS[p.diagram] : null;
  const href = p.links.live ?? p.links.github;

  const body = (
    <>
      {open && <span className="punch" aria-hidden="true" />}
      <div className="pmeta">
        <span>
          {String(n).padStart(2, "0")} · <span className="pcat">{p.cat}</span>
        </span>
        <span>{p.year}</span>
      </div>

      <h3 className="ptitle">{p.name}</h3>
      <p className="pdesc">{p.desc}</p>

      {Diagram && (
        <div className="pfig">
          <Diagram />
        </div>
      )}

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

  const cls = `pcard ${open ? "open" : "closed"}`;

  return href ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <article className={cls}>{body}</article>
  );
}
