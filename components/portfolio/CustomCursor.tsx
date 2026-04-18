"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the movement using spring physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  // We hide default cursor globally and render ours
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body, a, button, [role="button"], p, h1, h2, h3, h4, span, div { 
          cursor: none !important; 
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          default: {
            scale: 1,
            backgroundColor: "rgba(236, 233, 224, 0)",
            border: "1px solid rgba(236, 233, 224, 0.4)",
          },
          hover: {
            scale: 1.5,
            backgroundColor: "rgba(236, 233, 224, 1)",
            border: "1px solid rgba(236, 233, 224, 0)",
            mixBlendMode: "exclusion",
          },
          click: {
            scale: 0.8,
            backgroundColor: "rgba(236, 233, 224, 1)",
            border: "1px solid rgba(236, 233, 224, 0)",
          },
        }}
        animate={clicked ? "click" : hovered ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Tiny dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[color:var(--color-alloc)] rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
