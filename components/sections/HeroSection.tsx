"use client";

import { motion } from "framer-motion";
import { MessageCircle, Leaf } from "lucide-react";
import { CONFIG } from "@/lib/config";

export function HeroSection() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("rickybot:open"));
  };

  return (
    <header className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient grain-overlay">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(45,106,79,0.2)" }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(233,196,106,0.1)" }} />
        <div className="absolute left-1/4 w-[200px] h-[200px] rounded-full blur-2xl" style={{ top: "33%", backgroundColor: "rgba(188,108,37,0.1)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center py-24" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-white max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-8"
            style={{ backgroundColor: "rgba(233,196,106,0.2)", borderColor: "rgba(233,196,106,0.3)", color: "#E9C46A" }}
          >
            <Leaf className="w-4 h-4" />
            תוצרת טרייה ישירות מהשדה
          </motion.div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {CONFIG.brand.name}
          </h1>

          <p className="text-xl leading-relaxed font-light mb-4 max-w-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
            {CONFIG.brand.tagline}
          </p>

          <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
            מארזים חקלאיים יוקרתיים לחגים, אירועים, ומתנות עסקיות — שירות אישי, טעם אמיתי.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={openChat}
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-lg transition-all shadow-green-lg hover:shadow-green-xl active:scale-[0.98]"
              style={{ backgroundColor: "#E9C46A", color: "#1B4332" }}
              aria-label="פתח/י שיחה עם ריקי"
            >
              <MessageCircle className="w-5 h-5" />
              דברו עם ריקי
            </button>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 text-white font-semibold text-lg transition-all"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              לקטלוג המארזים
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative stat cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex flex-col gap-4"
        >
          {[
            { num: "500+", label: "חברות מרוצות" },
            { num: "100%", label: "תוצרת ישראלית" },
            { num: "24h", label: "אספקה מהירה" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="backdrop-blur-sm border rounded-2xl px-6 py-4 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              <p className="text-3xl font-black" style={{ color: "#E9C46A" }}>{stat.num}</p>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))" }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
      </motion.div>
    </header>
  );
}
