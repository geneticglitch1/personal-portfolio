import type { NextConfig } from "next";
import os from "node:os";

function localDevOrigins() {
  const hosts = new Set<string>(["localhost", "127.0.0.1", "::1", "*.local"]);

  for (const infos of Object.values(os.networkInterfaces())) {
    if (!infos) continue;
    for (const info of infos) {
      if (!info || info.internal) continue;
      hosts.add(info.address);
    }
  }

  return Array.from(hosts);
}

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: localDevOrigins(),
};

export default nextConfig;
