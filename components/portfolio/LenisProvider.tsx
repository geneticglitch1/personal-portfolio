"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const shouldUseLenis = desktopPointer && !prefersReduced;

    const clearLenisClasses = () => {
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
        "lenis-scrolling"
      );
      document.body.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
        "lenis-scrolling"
      );
    };

    // Keep native scrolling for anything that is not a desktop-like pointer.
    if (!shouldUseLenis) {
      clearLenisClasses();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
        clearLenisClasses();
    };
  }, []);

  return null;
}
