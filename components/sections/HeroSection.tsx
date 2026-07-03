"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CONFIG } from "@/lib/config";

const LYCHEE_VIDEO_WEBM =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_webm,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_VIDEO_MP4 =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_POSTER =
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg";

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

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "שלום, אני מעוניין בהצעת מחיר למארזי שי לחברה"
  )}`;

  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <header
      className="relative h-[80svh] max-h-[720px] md:h-[88vh] overflow-hidden bg-forest"
      dir="rtl"
    >
      {/* Video — full-bleed background */}
      {prefersReduced ? (
        <img
          src={LYCHEE_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={LYCHEE_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={LYCHEE_VIDEO_WEBM} type="video/webm" />
          <source src={LYCHEE_VIDEO_MP4} type="video/mp4" />
        </video>
      )}

      {/* Gradient — bottom only, lychee stays visible at top */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content — anchored to bottom third */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] max-w-xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden="true" />
          <span>עונת הליצ&#39;י · מארזי שי לחברות</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-3xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4 text-balance"
        >
          קטיף העונה, במיתוג של החברה שלכם
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-white/80 text-sm md:text-lg leading-relaxed mb-7 text-balance"
        >
          מארזי ליצ&#39;י פרימיום לעובדים, ללקוחות ולאירועי חברה — קטיף טרי מהמטע, מיתוג לוגו, ואספקה מתואמת בפריסה ארצית.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-sm md:text-base hover:bg-[#20b858] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
            aria-label="לקבלת הצעת מחיר לחברה בוואטסאפ"
          >
            <WhatsAppIcon className="w-4 h-4" />
            לקבלת הצעת מחיר לחברה
          </a>
          <a
            href="#catalog"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl border border-white/25 text-white font-semibold text-sm md:text-base hover:border-white/50 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            לצפייה במארזים
            <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </header>
  );
}
