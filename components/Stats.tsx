"use client";

import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 180, suffix: "+", label: "Countries Supported", prefix: "" },
  { value: 0.5, suffix: "%", label: "Transaction Fee", prefix: "", decimals: 1 },
  { value: 100, suffix: "%", label: "Real-Time Forex Rates", prefix: "" },
  { value: 256, suffix: "-bit", label: "Bank Encryption", prefix: "" },
];

export default function Stats() {
  return (
    <SectionWrapper id="stats" className="bg-navy-lighter">
      <AnimatedHeading className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl">
        Traction &amp; Stats
      </AnimatedHeading>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <AnimatedCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
            decimals={stat.decimals}
            label={stat.label}
            className="text-center"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
