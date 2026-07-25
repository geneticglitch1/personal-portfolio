import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is static: emit plain HTML/CSS/JS into out/ so nginx can
  // serve it with no Node process at runtime.
  output: "export",
  images: { unoptimized: true },
  // Static export has no server to resolve extensionless paths, so emit
  // directory-style routes (out/index.html) that nginx serves directly.
  trailingSlash: true,
};

export default nextConfig;
