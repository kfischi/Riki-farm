"use client";

import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
  const [lightbox, setLightbox] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  const anim = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <>
      <section
        ref={ref}
        id="testimonials"
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
            הנה טעימה מהפידבקים שקיבלנו
          </motion.p>

          {/* Screenshot grid */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {WA_SCREENSHOTS.map((src, i) => (
              <motion.button
                key={src}
                {...anim(0.1 + i * 0.07)}
                onClick={() => setLightbox(src)}
                className="break-inside-avoid w-full rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/8 cursor-zoom-in hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 block"
                aria-label={`הגדל ביקורת לקוח ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`ביקורת לקוח ${i + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="תמונה מוגדלת"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" aria-hidden="true" />

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="ביקורת לקוח מוגדלת"
                width={480}
                height={800}
                className="w-full h-auto rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.7)]"
                unoptimized
              />

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-forest flex items-center justify-center shadow-lg hover:bg-white/90 active:scale-95 transition-all duration-150"
                aria-label="סגור"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
