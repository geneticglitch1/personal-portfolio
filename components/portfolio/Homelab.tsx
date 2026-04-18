"use client";

import { NetworkMap } from "./NetworkMap";

/**
 * Pre-footer epilogue — no section number, no sticky label.
 * Sits between Contact and Footer as a live telemetry block.
 */
export function Homelab() {
  return (
    <section
      id="homelab"
      className="relative px-6 md:px-12 pt-24 pb-16 border-t hairline"
    >
      {/* Header row */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-10">
        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <p className="eyebrow mb-4" style={{ color: "var(--color-k3s)" }}>
            infra / homelab
          </p>
          <h2 className="display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.06] text-[color:var(--color-bone)] max-w-[38ch]">
            Self-hosted on a K3s cluster in a basement in Oswego, IL.
          </h2>
          <p className="mt-4 font-mono text-[12px] text-[color:var(--color-muted)] max-w-[62ch] leading-[1.7]">
            6 nodes · OPNsense firewall · Cloudflare tunnel · Longhorn distributed
            storage · Traefik ingress · Keycloak SSO · WireGuard VPN · Fleet GitOps
          </p>
        </div>
      </div>

      {/* Network map canvas — scrollable on narrow viewports */}
      <div
        className="border hairline rounded-lg overflow-hidden"
        style={{ background: "rgba(9,8,25,0.55)" }}
      >
        {/* Toolbar */}
        <div className="px-4 py-2 border-b hairline flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-green)]"
            style={{ boxShadow: "0 0 6px var(--color-green)" }}
          />
          <span>live network topology</span>
          <span className="ml-auto hidden sm:inline">
            oswego, il · 41.7°n · 88.3°w
          </span>
        </div>

        {/* Scroll wrapper for narrow screens */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] h-[260px] md:h-[300px]">
            <NetworkMap />
          </div>
        </div>

        {/* Legend */}
        <div className="px-4 py-2 border-t hairline flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          <span className="hidden md:inline">
            internet → cloudflare → xfinity → opnsense → k3s
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-k3s)" }}
              />
              ctrl-plane
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-green)" }}
              />
              workers
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-alloc)" }}
              />
              firewall
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
