"use client";

/**
 * Thin fixed banner above the nav indicating the site is self-hosted.
 * Height: h-8 (32px). Nav must be offset to top-8 to clear it.
 */
export function SelfHostedBanner() {
  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-8 flex items-center justify-between px-6 md:px-12 border-b"
      style={{
        background: "rgba(9,8,19,0.88)",
        backdropFilter: "blur(10px)",
        borderColor: "color-mix(in srgb, var(--color-k3s) 28%, transparent)",
      }}
    >
      {/* Left: live status */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-green)]"
          style={{ boxShadow: "0 0 6px var(--color-green)", animation: "caret-blink 2s steps(1) infinite" }}
        />
        <span className="text-[color:var(--color-bone-2)]">self-hosted</span>
        <span className="text-[color:var(--color-hairline)]">·</span>
        <span className="text-[color:var(--color-muted)] hidden sm:inline">
          k3s · 6 nodes · oswego, il
        </span>
        <span className="text-[color:var(--color-muted)] sm:hidden">k3s · 6 nodes</span>
      </div>

      {/* Right: infra chain summary */}
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
        <span style={{ color: "var(--color-cf)" }}>cloudflare</span>
        <span>→</span>
        <span>xfinity</span>
        <span>→</span>
        <span style={{ color: "var(--color-alloc)" }}>opnsense</span>
        <span>→</span>
        <span style={{ color: "var(--color-k3s)" }}>k3s</span>
      </div>
    </div>
  );
}
