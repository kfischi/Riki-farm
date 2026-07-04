"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CONFIG } from "@/lib/config";

export function SocialProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  const hasLogos = CONFIG.clientLogos.some((l) => l.logo);

  // Hide strip until real logos are available — name-drops without logos undermine trust
  if (!hasLogos) return null;

  return (
    <div
      ref={ref}
      className="py-14 bg-offwhite border-y border-forest/6"
      aria-label="לקוחות עסקיים"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-forest/40 text-sm font-medium uppercase tracking-[0.2em] mb-10"
        >
          חברות שכבר סומכות על המשק
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
          {CONFIG.clientLogos.filter((l) => l.logo).map((client, i) => (
            <motion.div
              key={client.name}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.06 }}
              className="h-10 flex items-center opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={client.logo} alt={client.name} className="h-full w-auto object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
