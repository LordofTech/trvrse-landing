"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { AnimatedHeading } from "./SectionWrapper";
import PhoneMockup from "./PhoneMockup";
import {
  CURRENCIES,
  NGN_AMOUNT,
  formatConverted,
  formatRate,
  convertNgnToCurrency,
  initLiveRates,
  type LiveRates,
} from "@/lib/currencies";

const REFRESH_MS = 60 * 60 * 1000; // refresh hourly

export default function LiveDemo() {
  const [rates, setRates] = useState<LiveRates>(initLiveRates);
  const [activeCode, setActiveCode] = useState("USD");
  const [showModal, setShowModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [source, setSource] = useState<string>("loading");
  const [loading, setLoading] = useState(true);

  const active = CURRENCIES.find((c) => c.code === activeCode) ?? CURRENCIES[0];
  const activeRate = rates[active.code] ?? active.fallbackRate;
  const converted = convertNgnToCurrency(NGN_AMOUNT, activeRate);

  const loadRates = useCallback(async () => {
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      if (data.rates) setRates(data.rates);
      if (data.lastUpdated) setLastUpdated(data.lastUpdated);
      if (data.source) setSource(data.source);
    } catch {
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, REFRESH_MS);
    return () => clearInterval(interval);
  }, [loadRates]);

  return (
    <>
      <SectionWrapper id="demo" className="bg-navy-lighter">
        <AnimatedHeading className="mb-12 text-center text-2xl sm:text-3xl md:text-4xl">
          See It In Action
        </AnimatedHeading>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="w-full lg:w-5/12">
            <PhoneMockup
              variant="converter"
              activeCurrency={active}
              ngnAmount={NGN_AMOUNT}
              ngnPerUnit={activeRate}
              convertedAmount={converted}
            />
          </div>

          <div className="w-full lg:w-7/12">
            <div className="glass mb-4 rounded-card p-5 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-body text-sm text-subtext">Live Forex Ticker</p>
                {loading ? (
                  <span className="font-body text-xs text-subtext">Updating rates…</span>
                ) : (
                  <span className="font-body text-xs text-subtext">
                    {source === "ExchangeRate-API" ? "Live" : "Cached"} ·{" "}
                    {lastUpdated
                      ? new Date(lastUpdated).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "just now"}
                  </span>
                )}
              </div>

              <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto pb-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setActiveCode(c.code)}
                    className={`touch-target shrink-0 rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
                      activeCode === c.code
                        ? "bg-electric text-white shadow-glow-sm"
                        : "border border-white/10 bg-navy/50 text-subtext hover:border-electric/40 hover:text-white"
                    }`}
                  >
                    {c.flag} {c.code}
                  </button>
                ))}
              </div>

              <div className="mb-2 flex items-baseline gap-2 font-heading text-2xl font-bold text-electric sm:text-3xl">
                <span>NGN/{active.code}</span>
                <motion.span
                  key={`${active.code}-${formatRate(activeRate)}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {formatRate(activeRate)}
                </motion.span>
              </div>

              <div
                key={activeCode}
                className="mb-5 rounded-lg bg-navy/40 px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="font-body text-xs text-subtext sm:text-sm">
                  Converting ₦{NGN_AMOUNT.toLocaleString()} NGN to {active.name}
                </p>
                <motion.p
                  key={formatConverted(converted, active, activeRate)}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 font-heading text-xl font-bold text-white sm:text-2xl"
                >
                  = {formatConverted(converted, active, activeRate)}{" "}
                  <span className="text-emerald">{active.code}</span>
                </motion.p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="mb-3 font-body text-xs text-subtext sm:text-sm">
                  All live rates from ₦{NGN_AMOUNT.toLocaleString()} NGN
                </p>
                <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 sm:max-h-56">
                  {CURRENCIES.map((c) => {
                    const rate = rates[c.code] ?? c.fallbackRate;
                    const amount = convertNgnToCurrency(NGN_AMOUNT, rate);
                    const isActive = c.code === activeCode;
                    return (
                      <button
                        key={c.code}
                        onClick={() => setActiveCode(c.code)}
                        className={`rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                          isActive
                            ? "bg-electric/20 ring-1 ring-electric/50"
                            : "bg-navy/40 hover:bg-navy/70"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{c.flag}</span>
                          <span className="font-body text-xs font-medium text-white">
                            {c.code}
                          </span>
                        </div>
                        <p className="font-heading text-sm font-semibold text-electric">
                          {formatRate(rate)}
                        </p>
                        <p className="truncate font-body text-[10px] text-subtext sm:text-xs">
                          {formatConverted(amount, c, rate)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="mt-4 font-body text-xs text-subtext sm:text-sm">
                Live rates via{" "}
                <a
                  href="https://www.exchangerate-api.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:underline"
                >
                  ExchangeRate-API
                </a>{" "}
                · {CURRENCIES.length} currencies · refreshes hourly
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="touch-target w-full rounded-card bg-electric px-8 py-3.5 font-body font-semibold text-white shadow-glow transition-all duration-200 hover:scale-[1.02] sm:w-auto"
            >
              See Full Demo
            </button>
          </div>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold">Currency Converter</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="touch-target flex h-10 w-10 items-center justify-center rounded-full bg-navy text-subtext hover:text-white"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <p className="mb-4 font-body text-sm text-subtext">
                ₦{NGN_AMOUNT.toLocaleString()} NGN converted across {CURRENCIES.length}{" "}
                currencies
              </p>
              <div className="space-y-2">
                {CURRENCIES.map((c) => {
                  const rate = rates[c.code] ?? c.fallbackRate;
                  const amount = convertNgnToCurrency(NGN_AMOUNT, rate);
                  return (
                    <div
                      key={c.code}
                      className="flex items-center justify-between rounded-lg bg-navy/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <p className="font-body text-sm font-medium">{c.name}</p>
                          <p className="font-body text-xs text-subtext">
                            1 {c.code} = {formatRate(rate)} NGN
                          </p>
                        </div>
                      </div>
                      <p className="font-heading font-semibold text-emerald">
                        {formatConverted(amount, c, rate)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
