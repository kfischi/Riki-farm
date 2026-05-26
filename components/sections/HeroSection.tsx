"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Leaf, ArrowLeft } from "lucide-react";
import { CONFIG } from "@/lib/config";

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("rickybot:open"));
  };

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
      <div className="w-full h-[62vh] min-h-[320px] md:h-auto md:aspect-video relative overflow-hidden">
        <video
          src="/mashak-shusterman-brand.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-label="סרטון תדמית — משק שוסטרמן"
        />
        {/* Bottom fade into forest green */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-forest to-transparent pointer-events-none" />
      </div>

      {/* ===== TEXT BELOW VIDEO ===== */}
      <div className="relative px-6 py-14 lg:py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-wheat/5 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 w-full">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wheat/15 border border-wheat/25 text-wheat text-sm font-medium mb-8">
            <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
            <span>מושב לימן · גבול הצפון</span>
          </motion.div>

          {/* Brand name */}
          <motion.p {...fadeUp(0.15)} className="text-white/45 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {CONFIG.brand.name}
          </motion.p>

          {/* Vision headline */}
          <motion.h1 {...fadeUp(0.25)} className="text-4xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            {CONFIG.about.heroLine}
          </motion.h1>

          {/* Divider */}
          <motion.div {...fadeUp(0.32)} className="w-12 h-0.5 bg-wheat/50 mx-auto mb-5" aria-hidden="true" />

          {/* Sub-tagline */}
          <motion.p {...fadeUp(0.38)} className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            מארזים חקלאיים יוקרתיים לחברות — תוצרת טרייה ואמיתית, ישירות מהשדה.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.48)} className="flex flex-wrap justify-center gap-4 mb-14">
            <button
              onClick={openChat}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-wheat text-forest font-bold text-base hover:bg-wheat/90 active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(233,196,106,0.25)] hover:shadow-[0_8px_32px_rgba(233,196,106,0.35)]"
              aria-label="פתח/י שיחה עם ריקי"
            >
              <MessageCircle className="w-5 h-5" />
              דברו עם ריקי
            </button>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-base hover:border-white/40 hover:bg-white/5 transition-all"
            >
              לקטלוג
              <ArrowLeft className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.6)} className="flex justify-center gap-12 pt-8 border-t border-white/10">
            {[
              { num: "500+", label: "חברות מרוצות" },
              { num: "100%", label: "תוצרת ישראלית" },
              { num: "דור ג׳", label: "חקלאות משפחתית" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-wheat tabular-nums">{s.num}</p>
                <p className="text-xs text-white/45 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
