"use client";

import { motion } from "framer-motion";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import { useMotionSafe } from "@/lib/motion";

const problems = [
  {
    icon: "🚫",
    title: "Your Nigerian card gets declined abroad.",
    description: "International merchants reject local cards, leaving you stranded at checkout.",
  },
  {
    icon: "💸",
    title: "Hidden exchange fees drain your money.",
    description: "Banks and apps hide markups in unfavorable rates — you lose up to 5% per transaction.",
  },
  {
    icon: "😵",
    title: "Multiple apps, multiple cards, zero clarity.",
    description: "Juggling remittance apps, forex bureaus, and travel cards creates financial chaos.",
  },
];

export default function Problem() {
  const { staggerContainer, staggerItem } = useMotionSafe();

  return (
    <SectionWrapper id="problem" className="grid-bg bg-navy scroll-mt-28">
      <AnimatedHeading className="mb-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Traveling abroad shouldn&apos;t feel like a{" "}
        <span className="text-red-400">financial nightmare.</span>
      </AnimatedHeading>
      <p className="mx-auto mb-12 max-w-2xl text-center font-body text-subtext sm:text-lg">
        Millions of Africans face these pain points every time they cross a border.
      </p>

      <motion.div
        {...staggerContainer}
        className="grid gap-6 md:grid-cols-3"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            {...staggerItem}
            className="glass group rounded-card p-6 shadow-glow-red transition-all duration-200 hover:scale-[1.02] sm:p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-3xl">
              {problem.icon}
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-white sm:text-xl">
              {problem.title}
            </h3>
            <p className="font-body text-sm text-subtext sm:text-base">
              {problem.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
