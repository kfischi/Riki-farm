"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CONFIG } from "@/lib/config";

export function USPStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="relative bg-forest py-10 lg:py-12 overflow-hidden" aria-label="היתרונות שלנו">
      <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {CONFIG.usps.map((usp, i) => (
          <motion.div
            key={usp.title}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center text-center gap-2 lg:flex-row lg:text-right lg:items-start lg:gap-3"
          >
            <span className="text-3xl lg:text-2xl flex-shrink-0" aria-hidden="true">{usp.icon}</span>
            <div>
              <p className="text-white font-bold text-sm lg:text-base leading-tight">{usp.title}</p>
              <p className="text-white/55 text-xs lg:text-sm mt-1 leading-snug">{usp.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
