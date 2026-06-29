"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/branding";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Investors", href: "#investors" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 safe-top transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/5 bg-navy/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <Image
            src={BRAND.logomark}
            alt="Trvrse"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 object-contain brightness-110 saturate-125 drop-shadow-[0_0_10px_rgba(6,214,160,0.45)]"
            priority
          />
          <span className="font-heading text-lg font-bold leading-none">Trvrse</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-body text-sm text-subtext transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#waitlist")}
            className="rounded-card bg-electric px-5 py-2 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-electric/90"
          >
            Join Waitlist
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="touch-target flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-navy/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="touch-target rounded-lg px-4 py-3 text-left font-body text-base text-subtext transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#waitlist")}
                className="touch-target mt-2 rounded-card bg-electric px-4 py-3 font-body font-semibold text-white"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
