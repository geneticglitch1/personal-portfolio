import Link from "next/link";
import { categoryLabel, type Project } from "@/content/projects";

export function ProjectSpread({ project }: { project: Project }) {
  return (
    <article className="relative px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center justify-between small-caps">
            <Link
              href="/#projects"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              ← Back to work
            </Link>
            <span>
              {categoryLabel[project.category]} · {project.year}
            </span>
          </div>
        </div>

        <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-6">
          <h1 className="col-span-12 md:col-span-10 md:col-start-2 display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] text-[color:var(--color-bone)]">
            {project.name}
          </h1>
        </header>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10">
          <p className="col-span-12 md:col-span-8 md:col-start-3 spread-intro">
            {project.intro}
          </p>
        </div>

        {project.heroMetric && (
          <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6 border-y hairline py-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-baseline gap-6 md:gap-10">
              <span className="hero-metric-value text-[color:var(--color-bone)]">
                {project.heroMetric.value}
              </span>
              <span className="hero-metric-label max-w-[24ch]">
                {project.heroMetric.label}
              </span>
            </div>
          </div>
        )}

        <figure className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6">
          <blockquote className="col-span-12 md:col-span-10 md:col-start-2 pull-quote text-center px-2 md:px-8">
            <span className="text-[color:var(--color-accent)] mr-1">“</span>
            {project.pullQuote}
            <span className="text-[color:var(--color-accent)] ml-1">”</span>
          </blockquote>
        </figure>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 body-prose">
            {project.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-10 border-t hairline pt-12">
          <div className="col-span-12 md:col-span-3 md:col-start-3">
            <div className="small-caps mb-4">Stack</div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 border hairline rounded-full text-[color:var(--color-bone-2)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="small-caps mb-4">Links</div>
            <ul className="space-y-3">
              {project.links.github && (
                <li>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[15px] text-[color:var(--color-bone)] hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    <span className="small-caps text-[color:var(--color-muted)]">
                      Source
                    </span>
                    <span>{project.links.github.replace(/^https?:\/\//, "")}</span>
                    <span className="text-[color:var(--color-muted)] group-hover:text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </li>
              )}
              {project.links.live && (
                <li>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-[15px] text-[color:var(--color-bone)] hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    <span className="small-caps text-[color:var(--color-muted)]">
                      Live
                    </span>
                    <span>{project.links.live.replace(/^https?:\/\//, "")}</span>
                    <span className="text-[color:var(--color-muted)] group-hover:text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </li>
              )}
              {project.links.note && (
                <li className="text-[14px] text-[color:var(--color-muted)] italic">
                  {project.links.note}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 border-t hairline pt-8 flex items-center justify-between small-caps">
            <Link
              href="/#projects"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              ← All projects
            </Link>
            <Link
              href="/#contact"
              className="hover:text-[color:var(--color-bone)] transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
