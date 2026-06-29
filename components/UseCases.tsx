"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import { useMotionSafe } from "@/lib/motion";

const useCases = [
  {
    emoji: "✈️",
    title: "Chioma lands in Toronto",
    summary: "Converts her naira to CAD in seconds.",
    detail:
      "Chioma flies from Lagos to Toronto for a conference. As she lands, Trvrse detects her location and offers instant NGN→CAD conversion at live rates. She pays for her Uber and hotel without a declined card.",
  },
  {
    emoji: "💻",
    title: "Tunde gets paid in USD",
    summary: "Sends money home to Lagos instantly.",
    detail:
      "Tunde works remotely for a US company. Every payday, he converts USD to NGN and sends directly to his family's Nigerian bank account — no middlemen, no 3-day waits.",
  },
  {
    emoji: "🏢",
    title: "Zainab runs a global business",
    summary: "Pays suppliers in GBP and USD.",
    detail:
      "Zainab imports textiles from the UK and electronics from the US. She holds multi-currency balances and pays suppliers in their local currency with a single tap.",
  },
  {
    emoji: "🎓",
    title: "Adekunle's tuition from Nigeria",
    summary: "Dad sends tuition to his UK account.",
    detail:
      "Adekunle studies at a UK university. His father in Abuja funds his wallet in NGN, and Adekunle converts to GBP for rent and tuition — all from one app.",
  },
];

export default function UseCases() {
  const { staggerContainer, staggerItem } = useMotionSafe();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <SectionWrapper id="use-cases" className="bg-navy grid-bg">
      <AnimatedHeading className="mb-4 text-center text-2xl sm:text-3xl md:text-4xl">
        Built for Real People
      </AnimatedHeading>
      <p className="mx-auto mb-12 max-w-xl text-center font-body text-subtext">
        Tap or hover a card to learn more.
      </p>

      <motion.div
        {...staggerContainer}
        className="grid gap-6 sm:grid-cols-2"
      >
        {useCases.map((useCase, i) => (
          <motion.div
            key={useCase.title}
            {...staggerItem}
            className="perspective-1000 h-48 sm:h-52"
            onClick={() => setFlipped(flipped === i ? null : i)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setFlipped(i);
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) setFlipped(null);
            }}
          >
            <div
              className="relative h-full w-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped === i ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div
                className="glass absolute inset-0 flex cursor-pointer flex-col justify-center rounded-card p-6 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="mb-3 text-3xl">{useCase.emoji}</span>
                <h3 className="mb-1 font-heading text-lg font-semibold">{useCase.title}</h3>
                <p className="font-body text-sm text-subtext">{useCase.summary}</p>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-center rounded-card border border-electric/30 bg-navy-light p-6"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="font-body text-sm leading-relaxed text-subtext sm:text-base">
                  {useCase.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
