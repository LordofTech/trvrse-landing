"use client";

import { motion } from "framer-motion";
import ParticleNetwork from "./ParticleNetwork";
import PhoneMockup from "./PhoneMockup";
import { COUNTRIES } from "@/lib/utils";

const headline = ["The", "Last", "Wallet", "You'll", "Ever", "Need."];

export default function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden bg-navy px-4 pb-24 pt-28 safe-top sm:px-6 sm:pt-32 md:justify-center md:px-8 md:pb-20 md:pt-24">
      <ParticleNetwork />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center md:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-2 sm:mb-10 sm:max-w-fit sm:px-5 sm:py-2.5"
        >
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald" />
          <span className="text-center font-body text-xs leading-snug text-subtext sm:whitespace-nowrap sm:text-sm">
            by Nexxogen · Cross-border fintech
          </span>
        </motion.div>

        <h1 className="mb-4 max-w-4xl font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="mr-[0.25em] inline-block"
            >
              {word === "Wallet" ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8 max-w-2xl font-body text-base text-subtext sm:text-lg md:text-xl"
        >
          Convert any currency. Pay any bank. Anywhere on earth. Instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-12 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <button
            onClick={scrollToWaitlist}
            className="touch-target rounded-card bg-electric px-8 py-3.5 font-body text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:scale-105 hover:bg-electric/90 sm:text-base"
          >
            Join Waitlist
          </button>
          <button
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            className="touch-target rounded-card border border-electric/50 bg-transparent px-8 py-3.5 font-body text-sm font-semibold text-white transition-all duration-200 hover:border-electric hover:bg-electric/10 sm:text-base"
          >
            Watch Demo
          </button>
        </motion.div>

        <div className="relative w-full max-w-lg">
          <PhoneMockup />
          {COUNTRIES.map((country, i) => {
            const angle = (i / COUNTRIES.length) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={country.code}
                className="absolute left-1/2 top-1/2 hidden text-2xl sm:block md:text-3xl"
                style={{ marginLeft: x - 16, marginTop: y - 16 }}
                animate={{
                  rotate: 360,
                  x: [x, x + 10, x],
                  y: [y, y - 10, y],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  x: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                }}
                aria-hidden="true"
              >
                {country.flag}
              </motion.div>
            );
          })}
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:hidden">
            {COUNTRIES.map((c) => (
              <span key={c.code} className="text-xl" aria-hidden="true">
                {c.flag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 safe-bottom"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs text-subtext">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-subtext/50 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-auto h-2 w-1 rounded-full bg-electric"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
