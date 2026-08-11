/**
 * Facts about the deployment rather than the person. Kept apart from
 * profile.ts because the metadata, the sitemap and the JSON-LD all need the
 * origin, and none of them should be the one that owns it.
 */

export const SITE_URL = "https://aryan-singh.dev";

/** Used verbatim as <title>, the OG title and the JSON-LD name. */
export const SITE_TITLE = "Aryan Singh — Systems Engineer";

export const SITE_DESCRIPTION =
  "CS and Math at UIUC, class of 2028. CUDA kernels, memory allocators, FPGA offload, and the self-hosted infrastructure it all runs on.";

/** 1200×630, generated once into public/. */
export const OG_IMAGE = "/og.png";
