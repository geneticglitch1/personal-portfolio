/**
 * Facts about the deployment rather than the person. Kept apart from
 * profile.ts because the metadata, the sitemap and the JSON-LD all need the
 * origin, and none of them should be the one that owns it.
 */

export const SITE_URL = "https://aryan-singh.dev";

/** Used verbatim as <title>, the OG title and the JSON-LD name. */
export const SITE_TITLE = "Aryan Singh — Software & Systems Engineer";

export const SITE_DESCRIPTION =
  "UIUC Computer Science and Mathematics student with experience in full stack development, DevOps, Linux infrastructure, C/C++, CUDA, and FPGA research.";

/** 1200×630, generated once into public/. */
export const OG_IMAGE = "/og.png";
