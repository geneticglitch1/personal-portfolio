"use client";

/**
 * BackgroundGlow — one slowly-rotating conic gradient.
 *
 * Performance rules obeyed:
 * - Single element (was 5)
 * - CSS transform animation only → GPU-composited after one raster pass
 * - No mix-blend-mode (prevented GPU shortcut in the old version)
 * - No mouse tracking (was firing blur-96px repaint on every mousemove)
 * - will-change: transform promotes to its own layer before animation starts
 *
 * The static radial gradients in globals.css already handle the ambient
 * purple/blue atmosphere — this just adds slow rotation on top.
 */
export function BackgroundGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-22%] opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 220deg at 42% 48%, rgba(168,85,247,0.8), rgba(59,130,246,0.5), rgba(236,72,153,0.6), rgba(230,166,85,0.4), rgba(168,85,247,0.8))",
          filter: "blur(72px)",
          willChange: "transform",
          animation: "bg-glow-spin 45s linear infinite",
        }}
      />
    </div>
  );
}
