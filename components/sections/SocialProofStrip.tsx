"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CONFIG } from "@/lib/config";
import { Building2 } from "lucide-react";

export function SocialProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  const hasLogos = CONFIG.clientLogos.some((l) => l.logo);

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

        {hasLogos ? (
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
        ) : (
          /* Placeholder until real logos are provided */
          <div className="flex flex-wrap justify-center items-center gap-6">
            {CONFIG.clientLogos.map((client, i) => (
              <motion.div
                key={client.name}
                initial={prefersReduced ? {} : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest/4 border border-forest/8"
              >
                <Building2 className="w-4 h-4 text-forest/30" />
                <span className="text-sm text-forest/35 font-medium">{client.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
