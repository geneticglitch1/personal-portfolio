import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Two URLs, because that is genuinely all there is: one page and the PDF it
 * links to. `lastModified` is the build timestamp, which for this repo is the
 * deploy — the site is rebuilt from source on every push, so nothing can be
 * newer than the last build.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/resume.pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
