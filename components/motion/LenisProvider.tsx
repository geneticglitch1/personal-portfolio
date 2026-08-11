"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/** Set by the provider so other components can stop/start the scroll. */
let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

/**
 * Wraps the app in a Lenis smooth-scroll loop and upgrades in-page anchor
 * links (`<a href="#id">`) to smooth scrolls. Fully disabled when the user
 * prefers reduced motion — native scrolling takes over.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices already scroll natively, with momentum the browser tunes
    // per-platform. Running Lenis on top of that adds a per-frame rAF loop and
    // a second opinion about scroll position for no visible gain, and it's a
    // reliable source of iOS scroll misbehaviour.
    const coarse = window.matchMedia("(hover: none), (max-width: 900px)").matches;
    const useLenis = !reduced && !coarse;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (useLenis) {
      // `lerp` rather than `duration`: a duration-based ease runs a fixed
      // ~1s animation for every wheel tick, so the page keeps arriving after
      // you've stopped scrolling. Interpolating toward the target instead
      // stays smooth but tracks the wheel closely enough not to read as lag.
      lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
      instance = lenis;
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Anchors get smooth scrolling either way — through Lenis when it's
    // running, natively when it isn't.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.1 });
      } else {
        (el as HTMLElement).scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
