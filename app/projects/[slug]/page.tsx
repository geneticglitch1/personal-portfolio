import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug, categoryLabel } from "@/content/projects";
import { profile } from "@/content/profile";
import { ProjectSpread } from "@/components/portfolio/ProjectSpread";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name}`;
  const description = project.tagline;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${profile.name}`,
      description,
      type: "article",
      tags: [categoryLabel[project.category], project.year, ...project.stack],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description,
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function Page(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return <ProjectSpread project={project} />;
}
