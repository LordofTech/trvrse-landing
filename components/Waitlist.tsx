"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import { isValidEmail } from "@/lib/supabase";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country: "NG" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2D7DD2", "#06D6A0", "#FFFFFF"],
        });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <SectionWrapper
      id="waitlist"
      className="bg-gradient-to-br from-navy via-electric/20 to-electric/40"
    >
      <div className="mx-auto max-w-2xl text-center">
        <AnimatedHeading className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Be the first to use Trvrse
        </AnimatedHeading>
        <p className="mb-8 font-body text-subtext sm:text-lg">
          Join thousands of Nigerians already on the waitlist.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-0"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading" || status === "success"}
            className="flex-1 rounded-card border border-white/10 bg-navy/80 px-5 py-3.5 font-body text-white placeholder:text-subtext focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30 sm:rounded-r-none sm:py-4"
            required
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="touch-target rounded-card bg-electric px-8 py-3.5 font-body font-semibold text-white shadow-glow transition-all duration-200 hover:bg-electric/90 disabled:opacity-60 sm:rounded-l-none sm:py-4"
          >
            {status === "loading" ? "Joining..." : "Join Waitlist"}
          </button>
        </motion.form>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 font-body text-lg font-semibold text-emerald"
            role="status"
          >
            {message}
          </motion.p>
        )}
        {status === "error" && (
          <p className="mt-4 font-body text-red-400" role="alert">
            {message}
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
