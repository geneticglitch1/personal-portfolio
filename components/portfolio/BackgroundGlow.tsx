"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function BackgroundGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for the glowing orb following the mouse
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
    
    // Initial center position
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-[color:var(--color-ink)]">
      {/* Interactive Deep Purple Flare - follows mouse fluidly */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-30"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--color-purple) 0%, transparent 60%)",
        }}
      />

      {/* Floating Ambient Deep Blue Glow */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-split) 0%, transparent 60%)",
        }}
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Ambient Amber Glow */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, var(--color-alloc) 0%, transparent 60%)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
      
      {/* Center anchor cosmic pink/purple flare to map it all together */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-20"
        style={{
          background: "radial-gradient(circle, #e879f9 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Noise texture overlay for a premium matte finish */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}