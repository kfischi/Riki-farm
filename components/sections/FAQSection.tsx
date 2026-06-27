"use client";

import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CONFIG } from "@/lib/config";

export function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(CONFIG.faq[0]?.id ?? null);

  const anim = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-16 lg:py-28 bg-offwhite overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-clay/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-0">
        <motion.div {...anim(0)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-clay" aria-hidden="true" />
          <span className="text-clay text-sm font-semibold uppercase tracking-[0.2em]">שאלות נפוצות</span>
        </motion.div>
        <motion.h2 {...anim(0.08)} id="faq-heading" className="text-3xl lg:text-5xl font-black text-forest leading-tight mb-12">
          כל מה שצריך לדעת
        </motion.h2>

        <div className="space-y-3">
          {CONFIG.faq.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                {...anim(0.12 + i * 0.05)}
                className="rounded-2xl bg-white border border-forest/8 overflow-hidden shadow-[0_2px_12px_rgba(27,67,50,0.05)] hover:shadow-[0_4px_20px_rgba(27,67,50,0.1)] transition-shadow"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  <span className="font-bold text-forest text-base">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-clay flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-forest/65 leading-relaxed text-sm">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
