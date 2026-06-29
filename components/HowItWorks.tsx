"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: "📱",
    title: "Fund your wallet",
    description: "Fund your wallet from your local Nigerian bank.",
  },
  {
    number: "02",
    icon: "📍",
    title: "Auto-detect location",
    description: "App detects your location and switches currency automatically.",
  },
  {
    number: "03",
    icon: "✅",
    title: "Pay instantly",
    description: "Send money or pay with your virtual card instantly.",
  },
];

export default function HowItWorks() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !lineRef.current || !sectionRef.current) return;

    const line = lineRef.current;
    const length = line.getTotalLength?.() ?? 1000;
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 50%",
        scrub: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <SectionWrapper id="how-it-works" className="bg-navy">
      <AnimatedHeading className="mb-4 text-center text-2xl sm:text-3xl md:text-4xl">
        How It Works
      </AnimatedHeading>
      <p className="mx-auto mb-16 max-w-xl text-center font-body text-subtext">
        Three simple steps to financial freedom anywhere in the world.
      </p>

      <div ref={sectionRef} className="relative">
        {/* Connecting line - desktop */}
        <svg
          className="absolute left-0 right-0 top-16 hidden h-2 w-full md:block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            ref={lineRef}
            x1="16%"
            y1="50%"
            x2="84%"
            y2="50%"
            stroke="#2D7DD2"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            opacity="0.5"
          />
        </svg>

        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative text-center"
            >
              <span className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 font-heading text-6xl font-bold text-electric/10 sm:text-7xl">
                {step.number}
              </span>
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-electric/30 bg-navy-light text-2xl shadow-glow-sm">
                {step.icon}
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mx-auto max-w-xs font-body text-sm text-subtext sm:text-base">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="mx-auto my-6 h-8 w-0.5 bg-electric/30 md:hidden" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
