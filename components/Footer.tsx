"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/branding";

const links = [
  { label: "About", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "Investors", href: "#investors" },
  { label: "Contact", href: "mailto:arthur@nexxogenn.com" },
];

const socials = [
  { label: "X", href: "https://x.com", icon: "x" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
];

function SocialIcon({ name }: { name: "x" | "linkedin" | "instagram" }) {
  const className = "h-[18px] w-[18px] shrink-0";

  if (name === "x") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-navy safe-bottom">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-electric to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <Image
                src={BRAND.logomark}
                alt="Trvrse"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain brightness-110 saturate-125 drop-shadow-[0_0_12px_rgba(6,214,160,0.45)]"
              />
              <span className="font-heading text-xl font-bold leading-none">Trvrse</span>
            </div>
            <p className="font-body text-sm text-subtext">A Nexxogenn LLP product</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-subtext transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-electric/30 bg-navy-light text-sm text-subtext transition-colors duration-200 hover:border-electric hover:text-white"
                aria-label={social.label}
              >
                <SocialIcon name={social.icon} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="font-body text-xs text-subtext sm:text-sm">
            © 2026 Nexxogenn LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
