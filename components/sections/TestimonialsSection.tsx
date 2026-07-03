"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const WA_SCREENSHOTS = [
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087728/Screenshot_20260703_170526_WhatsAppBusiness_tger62.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087726/Screenshot_20260703_170456_WhatsAppBusiness_czrw5v.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087725/Screenshot_20260703_170401_WhatsAppBusiness_ki8gbx.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087721/Screenshot_20260703_170330_WhatsAppBusiness_tsmmyi.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087720/Screenshot_20260703_170306_WhatsAppBusiness_nmvkhj.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783087720/Screenshot_20260703_170239_WhatsAppBusiness_hrjyla.jpg",
];

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
      dir="rtl"
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-wheat/8 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div {...anim(0)} className="flex items-center gap-3 mb-4 justify-center">
          <div className="w-8 h-px bg-wheat/50" aria-hidden="true" />
          <span className="text-wheat text-sm font-semibold uppercase tracking-[0.2em]">מה אומרים עלינו</span>
          <div className="w-8 h-px bg-wheat/50" aria-hidden="true" />
        </motion.div>
        <motion.h2
          {...anim(0.08)}
          id="testimonials-heading"
          className="text-3xl lg:text-5xl font-black text-white text-center leading-tight mb-4"
        >
          לקוחות <span className="text-gradient-wheat">מדברים</span>
        </motion.h2>
        <motion.p {...anim(0.12)} className="text-white/55 text-center text-sm sm:text-base mb-12">
          ביקורות אמיתיות מלקוחות מרוצים — ישירות מהווטסאפ
        </motion.p>

        {/* Screenshot grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {WA_SCREENSHOTS.map((src, i) => (
            <motion.div
              key={src}
              {...anim(0.1 + i * 0.07)}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/8"
            >
              <Image
                src={src}
                alt={`ביקורת לקוח ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
