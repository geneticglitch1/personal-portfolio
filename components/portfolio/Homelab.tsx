"use client";

import { motion } from "framer-motion";
import { NetworkMap } from "./NetworkMap";

const METRICS = [
  { value: "6", label: "Cluster nodes" },
  { value: "99.9%", label: "Uptime, 12 mo." },
  { value: "3×", label: "Storage replicas" },
  { value: "0", label: "Exposed public IPs" },
];

export function Homelab() {
  return (
    <section
      id="homelab"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">06</span>
            <span className="eyebrow">My infrastructure</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.04] text-[color:var(--color-bone)] max-w-[24ch]">
            Every project on this site lives on a{" "}
            <span className="display-grad">K3s cluster I run myself.</span>
          </h2>

          <p className="mt-8 text-[16px] leading-[1.72] text-[color:var(--color-bone-2)] max-w-[60ch]">
            I run six nodes on Proxmox, behind an OPNsense firewall, exposed
            to the internet only through Cloudflare mTLS tunnels. Longhorn
            replicates persistent volumes across three physical nodes. Traefik
            handles ingress; Fleet handles GitOps deploys. Including the site
            you&apos;re reading right now.
          </p>

          <div className="mt-14 border hairline rounded-xl overflow-hidden bg-[color:var(--color-ink-2)]/40">
            <div className="px-4 py-3 border-b hairline flex items-center gap-3 small-caps">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-green)]"
                style={{ boxShadow: "0 0 8px var(--color-green)" }}
              />
              <span>Live topology</span>
              <span className="ml-auto hidden sm:inline text-[color:var(--color-muted)]">
                Oswego, IL · 41.7°N · 88.3°W
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[640px] h-[260px] md:h-[320px]">
                <NetworkMap />
              </div>
            </div>

            <div className="px-4 py-3 border-t hairline flex flex-wrap items-center gap-x-6 gap-y-1 small-caps">
              <span className="hidden md:inline">
                Internet → Cloudflare → OPNsense → K3s
              </span>
              <div className="flex items-center gap-4 ml-auto">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-k3s)" }}
                  />
                  Control plane
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-green)" }}
                  />
                  Workers
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  Firewall
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t hairline pt-10">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="hero-metric-value">{m.value}</div>
                <div className="hero-metric-label mt-2">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
