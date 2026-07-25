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
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    instance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

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
      lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
