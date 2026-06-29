"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function AnimatedHeading({ children, className, as = "h2" }: AnimatedHeadingProps) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={cn("font-heading font-bold tracking-tight text-white", className)}
    >
      {children}
    </Tag>
  );
}
