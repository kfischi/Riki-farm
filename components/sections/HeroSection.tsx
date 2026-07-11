"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";

const BRAND_VIDEO_SRC =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783185123/0704_1_bpnr2e.mp4";
const BRAND_POSTER =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_jpg,q_auto,so_0/v1783185123/0704_1_bpnr2e.mp4";
const LYCHEE_VIDEO_WEBM =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_webm,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_VIDEO_MP4 =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_POSTER =
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg";

const CAPTIONS = [
  "מארזי שי בהתאמה אישית עם כל טוב ממשק שוסטרמן",
  "פירות העונה טריים ועסיסיים שלא תמצאו בסופר",
  "מתמחים בשיווק לחברות וארגונים",
  "תוצרת חקלאית מובחרת ממושב לימן בצפון הארץ",
  "מספקים תוצרת חקלאית ומארזים לוועדי עובדים, חברות, ארגונים ונקודות מכירה",
];

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
  const [isLychee, setIsLychee] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const brandRef = useRef<HTMLVideoElement>(null);
  const lycheeRef = useRef<HTMLVideoElement>(null);

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "שלום, אני רוצה להזמין ליצ'י 🌿"
  )}`;

  const openChat = () =>
    window.dispatchEvent(new CustomEvent("rickybot:open", {}));

  const switchToLychee = useCallback(() => {
    setIsLychee(true);
    if (lycheeRef.current) {
      lycheeRef.current.currentTime = 0;
      lycheeRef.current.play();
    }
  }, []);

  const switchToBrand = useCallback(() => {
    setIsLychee(false);
    if (brandRef.current) {
      brandRef.current.currentTime = 0;
      brandRef.current.play();
    }
  }, []);

  /* Rotate captions every 4 s — only during brand video */
  useEffect(() => {
    if (isLychee || prefersReduced) return;
    const id = setInterval(
      () => setCaptionIndex((i) => (i + 1) % CAPTIONS.length),
      4000
    );
    return () => clearInterval(id);
  }, [isLychee, prefersReduced]);

  return (
    <header
      id="main-content"
      className="relative h-[80svh] max-h-[720px] md:h-[88vh] overflow-hidden bg-forest"
      dir="rtl"
    >
      {/* Always-indexed H1 for SEO — visually hidden, always in DOM */}
      <h1 className="sr-only">
        ליצ&#39;י טרי ומארזים חקלאיים — משק שוסטרמן, מושב לימן, גבול הצפון
      </h1>
      {prefersReduced ? (
        <img
          src={LYCHEE_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <>
          {/* Brand video — plays first */}
          <video
            ref={brandRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={BRAND_POSTER}
            onEnded={switchToLychee}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isLychee ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden="true"
          >
            <source src={BRAND_VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Lychee video — plays second */}
          <video
            ref={lycheeRef}
            muted
            playsInline
            preload="metadata"
            poster={LYCHEE_POSTER}
            onEnded={switchToBrand}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-[0.9] origin-center ${
              isLychee ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <source src={LYCHEE_VIDEO_WEBM} type="video/webm" />
            <source src={LYCHEE_VIDEO_MP4} type="video/mp4" />
          </video>
        </>
      )}

      {/* Gradient — bottom only */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Brand segment — rotating captions + chatbot CTA */}
      <AnimatePresence>
        {!isLychee && !prefersReduced && (
          <motion.div
            key="brand-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0 bottom-0 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] max-w-xl mx-auto text-center"
          >
            {/* Rotating caption */}
            <div className="min-h-[3.5rem] flex items-end justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={captionIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-snug text-balance"
                >
                  {CAPTIONS[captionIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Chatbot CTA — pulsing */}
            <div className="relative inline-flex w-full sm:w-auto justify-center">
              <motion.span
                className="absolute inset-0 rounded-2xl bg-white/40"
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                aria-hidden="true"
              />
              <button
                onClick={openChat}
                className="relative btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-forest font-black text-sm md:text-base hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.35)]"
                aria-label="לשאלות והזמנות — פתח צ'אט"
              >
                <MessageCircle className="w-5 h-5" />
                להזמנות — לחצו כאן
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lychee segment — badge + headline + WhatsApp */}
      <AnimatePresence>
        {(isLychee || prefersReduced) && (
          <motion.div
            key="lychee-overlay"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0 bottom-0 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] max-w-xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/40 bg-green-400/10 text-green-300 text-sm font-bold tracking-[0.15em] mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse-dot" aria-hidden="true" />
              עכשיו בעונה
            </div>

            {/* Headline */}
            <p className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6 text-balance" aria-hidden="true">
              ליצ&#39;י מובחר, מתוק ועסיסי
            </p>

            {/* WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-sm md:text-base hover:bg-[#20b858] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
              aria-label="הזמינו ליצ'י עכשיו בוואטסאפ"
            >
              <WhatsAppIcon className="w-5 h-5" />
              הזמינו עכשיו בוואטסאפ
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
