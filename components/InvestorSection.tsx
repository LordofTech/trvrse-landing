"use client";

import { motion } from "framer-motion";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import Globe3D from "./Globe3D";
import { getGmailComposeUrl } from "@/lib/contact";

const metrics = [
  { value: "190B", label: "Global remittance market size" },
  { value: "50M", label: "Nigerian diaspora worldwide" },
  { value: "15%", label: "Annual growth rate of African cross-border payments" },
];

export default function InvestorSection() {
  return (
    <SectionWrapper
      id="investors"
      className="bg-gradient-to-b from-navy via-[#0D1A2D] to-navy"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <AnimatedHeading className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Built for a{" "}
            <span className="gradient-text">$190 Billion</span> Market
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 font-body text-subtext sm:text-lg"
          >
            Cross-border payments in Africa are growing at 15% annually. Trvrse
            is positioned to capture the diaspora and travel payment corridor.
          </motion.p>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-card p-4 text-center sm:p-5"
              >
                <p className="font-heading text-2xl font-bold text-electric sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 font-body text-xs text-subtext sm:text-sm">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mb-6 font-heading text-lg font-semibold text-white">
            We are raising our seed round. Get in early.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/trvrse-pitch-deck.pdf"
              download="Traverse_Universal_Investor_Pitch_Deck.pdf"
              className="touch-target rounded-card bg-electric px-6 py-3.5 text-center font-body text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:scale-105 sm:text-base"
            >
              Download Pitch Deck
            </a>
            <a
              href={getGmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target rounded-card border border-electric/50 px-6 py-3.5 text-center font-body text-sm font-semibold text-white transition-all duration-200 hover:border-electric hover:bg-electric/10 sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Globe3D />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
