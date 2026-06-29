"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  const staggerContainer = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        },
      };

  const staggerItem = prefersReducedMotion
    ? { variants: { hidden: {}, visible: {} } }
    : {
        variants: {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };

  return { prefersReducedMotion, fadeInUp, staggerContainer, staggerItem };
}
