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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Mesh-like color field for richer purple/blue atmosphere */}
      <motion.div
        className="absolute inset-[-18%] blur-[120px] opacity-45 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 50%, rgba(168, 85, 247, 0.55), rgba(59, 130, 246, 0.32), rgba(236, 72, 153, 0.45), rgba(168, 85, 247, 0.55))",
        }}
        animate={{
          rotate: [0, 18, 0],
          scale: [1, 1.08, 1],
          opacity: [0.34, 0.5, 0.34],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Interactive Deep Purple Flare - follows mouse fluidly */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full blur-[96px] opacity-90 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.72, 0.95, 0.72],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Ambient Deep Blue Glow */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[92px] opacity-80 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
          scale: [1, 1.25, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Ambient Amber Glow */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[110px] opacity-75 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
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
        className="absolute top-[30%] left-[30%] w-[55vw] h-[55vw] rounded-full blur-[108px] opacity-80 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.6, 0.9, 0.6],
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