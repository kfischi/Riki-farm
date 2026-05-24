"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Leaf, ArrowLeft } from "lucide-react";
import Image from "next/image";
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
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <header className="relative min-h-screen bg-forest overflow-hidden grain-overlay">
      {/* ===== DESKTOP: SPLIT LAYOUT ===== */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] min-h-screen">
        {/* LEFT — Photo column */}
        <div className="relative overflow-hidden">
          <Image
            src={CONFIG.images.hero}
            alt="ריקי שוסטרמן, חקלאית מגבול הצפון"
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
          {/* Subtle warm overlay — unifies color temperature */}
          <div className="absolute inset-0 bg-gradient-to-l from-forest/60 via-forest/10 to-transparent" />
          {/* Bottom fade into forest green */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-forest to-transparent" />
        </div>

        {/* RIGHT — Text column */}
        <div className="relative flex flex-col justify-center px-16 xl:px-24 py-20 bg-forest">
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-forest-mid/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-wheat/8 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-xl">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wheat/15 border border-wheat/25 text-wheat text-sm font-medium mb-10">
              <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
              <span>מושב לימן · גבול הצפון</span>
            </motion.div>

            {/* Brand name — small, refined */}
            <motion.p {...fadeUp(0.15)} className="text-white/50 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {CONFIG.brand.name}
            </motion.p>

            {/* Vision headline — THE emotional hook */}
            <motion.h1 {...fadeUp(0.25)} className="text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              {CONFIG.about.heroLine}
            </motion.h1>

            {/* Divider */}
            <motion.div {...fadeUp(0.35)} className="w-12 h-0.5 bg-wheat/50 mb-6" aria-hidden="true" />

            {/* Sub-tagline */}
            <motion.p {...fadeUp(0.4)} className="text-white/65 text-lg leading-relaxed mb-10 max-w-md">
              מארזים חקלאיים יוקרתיים לחברות — תוצרת טרייה ואמיתית, ישירות מהשדה.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4">
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
            <motion.div {...fadeUp(0.65)} className="flex gap-8 mt-14 pt-8 border-t border-white/10">
              {[
                { num: "500+", label: "חברות מרוצות" },
                { num: "100%", label: "תוצרת ישראלית" },
                { num: "דור ג׳", label: "חקלאות משפחתית" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-wheat tabular-nums">{s.num}</p>
                  <p className="text-xs text-white/45 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: STACKED LAYOUT ===== */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Image — top portion */}
        <div className="relative h-[55vh] flex-shrink-0">
          <Image
            src={CONFIG.images.hero}
            alt="ריקי שוסטרמן, חקלאית מגבול הצפון"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-transparent to-forest/80" />
        </div>

        {/* Text — bottom, overlaps image slightly */}
        <div className="relative -mt-16 z-10 flex-1 bg-forest rounded-t-[2rem] px-6 pt-8 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wheat/15 border border-wheat/25 text-wheat text-xs font-medium mb-6">
            <Leaf className="w-3 h-3" />
            מושב לימן · גבול הצפון
          </div>
          <p className="text-white/45 text-xs font-semibold tracking-widest uppercase mb-3">{CONFIG.brand.name}</p>
          <h1 className="text-3xl font-black text-white leading-tight mb-5">{CONFIG.about.heroLine}</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            מארזים חקלאיים יוקרתיים לחברות — תוצרת טרייה ואמיתית, ישירות מהשדה.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={openChat}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-wheat text-forest font-bold text-base active:scale-[0.98] transition-all"
              aria-label="פתח/י שיחה עם ריקי"
            >
              <MessageCircle className="w-5 h-5" />
              דברו עם ריקי
            </button>
            <a
              href="#catalog"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-white/20 text-white font-semibold text-sm"
            >
              לקטלוג המארזים
            </a>
          </div>
          {/* Mobile stats */}
          <div className="flex gap-6 mt-10 pt-6 border-t border-white/10">
            {[{ num: "500+", label: "חברות" }, { num: "100%", label: "ישראלי" }, { num: "ג׳", label: "דור" }].map((s) => (
              <div key={s.label} className="text-center flex-1">
                <p className="text-xl font-black text-wheat">{s.num}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
