"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CONFIG } from "@/lib/config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.47 1.68 6.34L3 29l6.84-1.65A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff" />
      <path d="M16 5.2A10.8 10.8 0 0 0 5.2 16c0 2.03.57 3.93 1.55 5.56l.2.32-1.18 4.32 4.44-1.16.31.18A10.8 10.8 0 1 0 16 5.2zm6.37 15.17c-.26.72-1.52 1.38-2.07 1.42-.52.04-1.02.23-3.44-.72-2.9-1.13-4.76-4.07-4.9-4.26-.14-.2-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .42-.07.65.5l.84 2.07c.1.22.06.48-.07.68l-.37.54c-.14.2-.28.41-.12.7.46.85 1.14 1.7 1.96 2.38.84.7 1.7 1.02 2.12 1.14.3.08.54-.03.74-.26l.53-.63c.2-.23.44-.28.69-.18l2.1.98c.25.12.41.18.47.27.07.1.07.56-.19 1.29z" fill="#25D366" />
    </svg>
  );
}

export function LycheeSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("שלום ריקי! אני רוצה להזמין ליצ'י טרי מהמשק 🌿")}`;

  const anim = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[80svh] flex flex-col justify-end"
      aria-label="ליצ'י טרי ממשק שוסטרמן"
    >
      {/* Background video — top stays clear so the fruit/Ricky shows */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source
            src="https://res.cloudinary.com/dptyfvwyo/video/upload/f_webm,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient only from bottom — keeps top of video clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content anchored to bottom so video shows at top */}
      <div className="relative px-6 pb-12 lg:pb-20 pt-16 text-center flex flex-col items-center max-w-3xl mx-auto w-full" dir="rtl">

        {/* "עכשיו בעונה" — larger, pulsing badge on mobile */}
        <motion.div
          {...anim(0)}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-400/40 bg-green-400/10 mb-6"
        >
          <span
            className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0"
            style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <span className="text-green-300 text-sm sm:text-base font-bold tracking-[0.15em] uppercase">
            עכשיו בעונה
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          {...anim(0.08)}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-3"
        >
          ליצ'י עסיסי,{" "}
          <span className="text-gradient-wheat">מתוק וטרי.</span>
        </motion.h2>

        {/* Sub-headline — small, elegant */}
        <motion.p
          {...anim(0.16)}
          className="text-white/70 text-base sm:text-lg font-medium mb-8"
        >
          מגיע מהעץ ישר אליכם
        </motion.p>

        {/* CTA */}
        <motion.a
          {...anim(0.24)}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sheen inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base sm:text-lg shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:bg-[#20b858] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
          aria-label="הזמינו ליצ'י עכשיו בוואטסאפ"
        >
          <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          הזמינו עכשיו בוואטסאפ
        </motion.a>

        {/* Trust signals */}
        <motion.div
          {...anim(0.35)}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-white/45 text-xs sm:text-sm"
        >
          <span>🚚 משלוחים לצפון ומרכז הארץ</span>
          <span>📦 ללא מינימום הזמנה</span>
          <span>🌿 ישירות מהמשק</span>
        </motion.div>
      </div>
    </section>
  );
}
