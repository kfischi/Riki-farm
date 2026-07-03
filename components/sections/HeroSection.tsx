"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CONFIG } from "@/lib/config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.47 1.68 6.34L3 29l6.84-1.65A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff" />
      <path d="M16 5.2A10.8 10.8 0 0 0 5.2 16c0 2.03.57 3.93 1.55 5.56l.2.32-1.18 4.32 4.44-1.16.31.18A10.8 10.8 0 1 0 16 5.2zm6.37 15.17c-.26.72-1.52 1.38-2.07 1.42-.52.04-1.02.23-3.44-.72-2.9-1.13-4.76-4.07-4.9-4.26-.14-.2-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .42-.07.65.5l.84 2.07c.1.22.06.48-.07.68l-.37.54c-.14.2-.28.41-.12.7.46.85 1.14 1.7 1.96 2.38.84.7 1.7 1.02 2.12 1.14.3.08.54-.03.74-.26l.53-.63c.2-.23.44-.28.69-.18l2.1.98c.25.12.41.18.47.27.07.1.07.56-.19 1.29z" fill="#25D366" />
    </svg>
  );
}

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("שלום ריקי! אני רוצה להזמין ליצ'י טרי מהמשק 🌿")}`;

  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <header className="bg-forest grain-overlay overflow-hidden">
      {/* ===== VIDEO ===== */}
      <div className="relative w-full h-[100svh] md:h-auto md:aspect-[64/29] overflow-hidden">
        <video
          src="/mashak-shusterman-brand.mp4"
          poster="/mashak-shusterman-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="סרטון תדמית — משק שוסטרמן"
        />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-forest to-transparent pointer-events-none" />
      </div>

      {/* ===== TEXT BELOW VIDEO ===== */}
      <div className="relative px-5 py-7 sm:py-14 lg:py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-wheat/5 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 w-full">
          {/* Badge — live seasonal status */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wheat/15 border border-wheat/25 text-wheat text-sm font-medium mb-5"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden="true" />
            <span>עונת הליצ'י פתוחה · מושב לימן</span>
          </motion.div>

          {/* Brand name */}
          <motion.p {...fadeUp(0.15)} className="text-white/45 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {CONFIG.brand.name}
          </motion.p>

          {/* Vision headline */}
          <motion.h1 {...fadeUp(0.25)} className="text-xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-3">
            {CONFIG.about.heroLine}
          </motion.h1>

          {/* Divider */}
          <motion.div {...fadeUp(0.32)} className="w-10 h-0.5 bg-wheat/50 mx-auto mb-4" aria-hidden="true" />

          {/* Urgency line */}
          <motion.p {...fadeUp(0.35)} className="text-wheat/90 text-sm font-semibold mb-3">
            נקטף הבוקר · משלוח 24–48 שעות לכל הארץ
          </motion.p>

          {/* Sub-tagline */}
          <motion.p {...fadeUp(0.38)} className="text-white/60 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xl mx-auto">
            ליצ'י טרי ומארזים עונתיים ישירות מהמשק — נקטף אצלנו, מגיע אליכם.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.48)} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#20b858] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.55)]"
              aria-label="הזמינו ליצ'י עכשיו בוואטסאפ"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              הזמינו עכשיו
            </a>
            <a
              href="#catalog"
              className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border border-white/20 text-white font-semibold text-sm sm:text-base hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              לקטלוג
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.6)} className="flex justify-center gap-6 sm:gap-12 pt-6 sm:pt-8 border-t border-white/10">
            {[
              { num: "22", label: "שנות חקלאות" },
              { num: "100%", label: "תוצרת ישראלית" },
              { num: "מושב לימן", label: "גבול הצפון" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl sm:text-2xl font-black text-wheat tabular-nums">{s.num}</p>
                <p className="text-xs text-white/45 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
