"use client";

import { motion } from "framer-motion";
import type { Currency } from "@/lib/currencies";
import { CURRENCIES, formatRate } from "@/lib/currencies";

interface PhoneMockupProps {
  variant?: "home" | "converter";
  className?: string;
  /** Live converter props — syncs with ticker selection */
  activeCurrency?: Currency;
  ngnAmount?: number;
  ngnPerUnit?: number;
  convertedAmount?: number;
}

export default function PhoneMockup({
  variant = "home",
  className = "",
  activeCurrency,
  ngnAmount = 1_500_000,
  ngnPerUnit,
  convertedAmount,
}: PhoneMockupProps) {
  return (
    <motion.div
      className={`relative mx-auto w-[260px] sm:w-[280px] md:w-[300px] ${className}`}
      animate={{ rotateY: [0, 5, 0, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div className="absolute -inset-8 rounded-full bg-electric/20 blur-3xl" />
      <div className="relative rounded-[2.5rem] border-[3px] border-gray-700 bg-gray-900 p-2 shadow-glow">
        <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-gray-800" />
        <div className="overflow-hidden rounded-[2rem] bg-navy-light">
          {variant === "home" ? (
            <HomeScreen />
          ) : (
            <ConverterScreen
              currency={activeCurrency}
              ngnAmount={ngnAmount}
              ngnPerUnit={ngnPerUnit}
              convertedAmount={convertedAmount}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function HomeScreen() {
  return (
    <div className="aspect-[9/19] p-4 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-subtext">Good morning</p>
          <p className="font-heading text-sm font-semibold">Chioma A.</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-electric/30" />
      </div>
      <div className="mb-4 rounded-card bg-navy p-3">
        <p className="text-[10px] text-subtext">Total Balance</p>
        <p className="font-heading text-xl font-bold">₦2,450,000</p>
        <p className="text-[10px] text-emerald">≈ $1,633.33 USD</p>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {["Send", "Convert", "Cards", "More"].map((action) => (
          <div key={action} className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/20 text-xs">
              {action[0]}
            </div>
            <span className="text-[8px] text-subtext">{action}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-medium text-subtext">Recent</p>
        {[
          { name: "Amazon US", amount: "-$45.99", flag: "🇺🇸" },
          { name: "Transfer to UK", amount: "£200", flag: "🇬🇧" },
        ].map((tx) => (
          <div key={tx.name} className="flex items-center justify-between rounded-lg bg-navy/50 p-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{tx.flag}</span>
              <span className="text-[10px]">{tx.name}</span>
            </div>
            <span className="text-[10px] font-medium">{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ConverterScreenProps {
  currency?: Currency;
  ngnAmount: number;
  ngnPerUnit?: number;
  convertedAmount?: number;
}

function ConverterScreen({
  currency,
  ngnAmount,
  ngnPerUnit,
  convertedAmount,
}: ConverterScreenProps) {
  const active = currency ?? CURRENCIES[0];
  const rate = ngnPerUnit ?? active.fallbackRate;
  const converted = convertedAmount ?? ngnAmount / rate;
  const decimals = rate >= 100 ? 2 : rate >= 10 ? 2 : 0;
  const formattedConverted = converted.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className="aspect-[9/19] p-4 pt-8">
      <p className="mb-4 text-center font-heading text-sm font-semibold">Convert</p>
      <div className="mb-3 rounded-card bg-navy p-3">
        <p className="text-[10px] text-subtext">From</p>
        <div className="flex items-center justify-between">
          <span className="text-lg">🇳🇬</span>
          <p className="font-heading text-lg font-bold">
            {ngnAmount.toLocaleString()}
          </p>
        </div>
        <p className="text-right text-[10px] text-subtext">NGN</p>
      </div>
      <div className="mb-3 flex justify-center">
        <div className="rounded-full bg-electric/20 p-2 text-electric">↓</div>
      </div>
      <div className="mb-4 rounded-card bg-navy p-3">
        <p className="text-[10px] text-subtext">To</p>
        <div className="flex items-center justify-between">
          <span className="text-lg">{active.flag}</span>
          <motion.p
            key={converted}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="font-heading text-lg font-bold text-emerald"
          >
            {formattedConverted}
          </motion.p>
        </div>
        <p className="text-right text-[10px] text-subtext">{active.code}</p>
      </div>
      <div className="rounded-lg bg-electric/10 p-2 text-center">
        <p className="text-[10px] text-subtext">Live rate</p>
        <motion.p
          key={rate}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-electric"
        >
          1 {active.code} = {formatRate(rate)} NGN
        </motion.p>
      </div>
    </div>
  );
}
