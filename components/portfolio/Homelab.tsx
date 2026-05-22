"use client";

import { NetworkMap } from "./NetworkMap";

export function Homelab() {
  return (
    <section
      id="homelab"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">06</span>
            <span className="eyebrow">Infrastructure</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <h2 className="display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[24ch]">
            Every project on this site lives on a K3s cluster I run myself.
          </h2>

          <p className="mt-8 text-[16px] leading-[1.72] text-[color:var(--color-bone-2)] max-w-[60ch]">
            Six nodes on Proxmox, behind an OPNsense firewall, exposed to the
            internet only through Cloudflare mTLS tunnels. Longhorn replicates
            persistent volumes across three physical nodes. Traefik handles
            ingress; Fleet handles GitOps deploys. Including the site you are
            reading right now.
          </p>

          <div className="mt-14 border hairline rounded-lg overflow-hidden bg-[color:var(--color-ink-2)]/40">
            <div className="px-4 py-3 border-b hairline flex items-center gap-3 small-caps">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-green)]"
                style={{ boxShadow: "0 0 6px var(--color-green)" }}
              />
              <span>Live topology</span>
              <span className="ml-auto hidden sm:inline text-[color:var(--color-muted)]">
                Oswego, IL · 41.7°N · 88.3°W
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[640px] h-[260px] md:h-[300px]">
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

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t hairline pt-10">
            <div>
              <div className="hero-metric-value">6</div>
              <div className="hero-metric-label mt-2">Cluster nodes</div>
            </div>
            <div>
              <div className="hero-metric-value">99.9%</div>
              <div className="hero-metric-label mt-2">Uptime, 12 mo.</div>
            </div>
            <div>
              <div className="hero-metric-value">3×</div>
              <div className="hero-metric-label mt-2">Storage replicas</div>
            </div>
            <div>
              <div className="hero-metric-value">0</div>
              <div className="hero-metric-label mt-2">Exposed public IPs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
