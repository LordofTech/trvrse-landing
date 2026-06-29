"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: true });
const Problem = dynamic(() => import("@/components/Problem"));
const Solution = dynamic(() => import("@/components/Solution"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const LiveDemo = dynamic(() => import("@/components/LiveDemo"));
const UseCases = dynamic(() => import("@/components/UseCases"));
const Stats = dynamic(() => import("@/components/Stats"));
const InvestorSection = dynamic(() => import("@/components/InvestorSection"));
const Waitlist = dynamic(() => import("@/components/Waitlist"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <LiveDemo />
      <UseCases />
      <Stats />
      <InvestorSection />
      <Waitlist />
      <Footer />
    </main>
  );
}
