"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isTouch, setIsTouch] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none)").matches;
    setIsTouch(touch);

    if (touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <div className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-xl" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/60" />
    </motion.div>
  );
}
