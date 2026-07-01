"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { CONFIG } from "@/lib/config";

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

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
      aria-labelledby="testimonials-heading"
      className="relative py-16 lg:py-28 bg-forest grain-overlay overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-wheat/8 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div {...anim(0)} className="flex items-center gap-3 mb-4 justify-center">
          <div className="w-8 h-px bg-wheat/50" aria-hidden="true" />
          <span className="text-wheat text-sm font-semibold uppercase tracking-[0.2em]">מה אומרים עלינו</span>
          <div className="w-8 h-px bg-wheat/50" aria-hidden="true" />
        </motion.div>
        <motion.h2
          {...anim(0.08)}
          id="testimonials-heading"
          className="text-3xl lg:text-5xl font-black text-white text-center leading-tight mb-14"
        >
          חברות שבחרו לתת <span className="text-gradient-wheat">מתנה אמיתית</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {CONFIG.testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              {...anim(0.15 + i * 0.1)}
              className="card-lift relative rounded-3xl p-7 glass-dark hover:border-wheat/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
            >
              <Quote className="w-8 h-8 text-wheat/40 mb-4" aria-hidden="true" />
              <blockquote className="text-white/90 text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-1 mb-3" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-wheat text-wheat" />
                ))}
              </div>
              <figcaption className="border-t border-white/10 pt-4">
                <p className="font-bold text-white text-sm">{t.author}</p>
                {t.role && <p className="text-white/50 text-xs mt-0.5">{t.role}</p>}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
