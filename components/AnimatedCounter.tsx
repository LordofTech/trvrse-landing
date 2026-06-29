"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value, prefersReduced]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.floor(display).toLocaleString();

  return (
    <div ref={ref} className={className}>
      <div className="relative">
        <div className="absolute inset-0 rounded-card bg-electric/10 blur-2xl" />
        <p className="relative font-heading text-3xl font-bold text-electric sm:text-4xl md:text-5xl">
          {prefix}
          {formatted}
          {suffix}
        </p>
      </div>
      <p className="mt-2 font-body text-sm text-subtext sm:text-base">{label}</p>
    </div>
  );
}
