"use client";

import { motion } from "framer-motion";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import { useMotionSafe } from "@/lib/motion";

const features = [
  {
    icon: "💱",
    title: "Real-Time Currency Conversion",
    description:
      "Land in any country, convert instantly at live rates. No hidden markups, no waiting.",
    animation: "animate-pulse",
  },
  {
    icon: "🌍",
    title: "Direct Bank Transfers Globally",
    description:
      "Send money to any bank account in any country. Nigeria to London in seconds.",
    animation: "animate-float",
  },
  {
    icon: "💳",
    title: "Virtual Cards in Every Currency",
    description:
      "Pay online and in stores anywhere on earth. One app, every currency you need.",
    animation: "",
  },
];

export default function Solution() {
  const { staggerContainer, staggerItem } = useMotionSafe();

  return (
    <SectionWrapper id="features" className="bg-navy-lighter">
      <AnimatedHeading className="mb-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Trvrse fixes all of that.
      </AnimatedHeading>
      <p className="mx-auto mb-12 max-w-2xl text-center font-body text-subtext sm:text-lg">
        One wallet. Every currency. Every country. Zero friction.
      </p>

      <motion.div
        {...staggerContainer}
        className="grid gap-6 md:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            {...staggerItem}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass group cursor-default rounded-card p-6 transition-all duration-200 hover:scale-[1.03] hover:shadow-glow sm:p-8"
          >
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-electric/20 text-3xl ${feature.animation}`}
            >
              {feature.icon}
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold text-white sm:text-xl">
              {feature.title}
            </h3>
            <p className="font-body text-sm text-subtext sm:text-base">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
