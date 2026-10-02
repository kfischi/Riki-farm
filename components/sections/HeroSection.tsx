"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { resolveWhatsapp } from "@/lib/contact";

// The last two Cloudinary URLs in the project, and they stay on purpose.
// Every image moved to Sanity — see docs/decisions.md — but video did not,
// for two reasons Sanity cannot cover: f_mp4,q_auto transcodes per browser,
// and BRAND_POSTER is a FRAME EXTRACTED FROM THE VIDEO ITSELF (f_jpg,so_0),
// which is a video-to-image transform. Sanity stores files; it does not
// transcode and cannot pull a frame out of one.
//
// Moving the video would mean a plain file download with no adaptive quality
// plus a separately exported poster image. This account belongs to Kfir, not
// to the farm, so nothing here is Ricky's to lose.
const BRAND_VIDEO_SRC =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783185123/0704_1_bpnr2e.mp4";
const BRAND_POSTER =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_jpg,q_auto,so_0/v1783185123/0704_1_bpnr2e.mp4";

const CAPTIONS = [
  "מארזי שי בהתאמה אישית עם כל טוב ממשק שוסטרמן",
  "פירות העונה טריים ועסיסיים שלא תמצאו בסופר",
  "מתמחים בשיווק לחברות וארגונים",
  "תוצרת חקלאית מובחרת ממושב לימן בצפון הארץ",
  "מספקים תוצרת חקלאית ומארזים לוועדי עובדים, חברות, ארגונים ונקודות מכירה",
];

/** The copy the site shipped with — used whenever the Studio field is empty. */
const DEFAULT_HEADLINE = "מארזים עונתיים ישירות מהמשק";
const DEFAULT_CTA_LABEL = "להזמנות — לחצו כאן";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.47 1.68 6.34L3 29l6.84-1.65A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff" />
      <path d="M16 5.2A10.8 10.8 0 0 0 5.2 16c0 2.03.57 3.93 1.55 5.56l.2.32-1.18 4.32 4.44-1.16.31.18A10.8 10.8 0 1 0 16 5.2zm6.37 15.17c-.26.72-1.52 1.38-2.07 1.42-.52.04-1.02.23-3.44-.72-2.9-1.13-4.76-4.07-4.9-4.26-.14-.2-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .42-.07.65.5l.84 2.07c.1.22.06.48-.07.68l-.37.54c-.14.2-.28.41-.12.7.46.85 1.14 1.7 1.96 2.38.84.7 1.7 1.02 2.12 1.14.3.08.54-.03.74-.26l.53-.63c.2-.23.44-.28.69-.18l2.1.98c.25.12.41.18.47.27.07.1.07.56-.19 1.29z" fill="#25D366" />
    </svg>
  );
}

/**
 * Hero copy as the Studio stores it. Every field is optional; an empty one
 * keeps the text the site already shipped with, so clearing a field in the
 * Studio never leaves a blank hero.
 */
export interface HeroContent {
  headline?: string;
  tagline?: string;
  ctaLabel?: string;
  /** When set, the primary button becomes a link instead of opening the chat. */
  ctaHref?: string;
}

export function HeroSection({
  hero,
  whatsappNumber,
}: {
  hero?: HeroContent;
  whatsappNumber?: string;
}) {
  const prefersReduced = useReducedMotion();

  // A cleared field arrives as an empty string, not as undefined.
  const headline = hero?.headline?.trim() || DEFAULT_HEADLINE;
  const tagline  = hero?.tagline?.trim()  || "";
  const ctaLabel = hero?.ctaLabel?.trim() || DEFAULT_CTA_LABEL;
  const ctaHref  = hero?.ctaHref?.trim()  || "";
  const waNumber = resolveWhatsapp(whatsappNumber);
  const [captionIndex, setCaptionIndex] = useState(0);

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "שלום ריקי! אני רוצה להזמין מארז מהמשק 🌿"
  )}`;

  const openChat = () =>
    window.dispatchEvent(new CustomEvent("rickybot:open", {}));

  /* Rotate captions every 4 s */
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(
      () => setCaptionIndex((i) => (i + 1) % CAPTIONS.length),
      4000
    );
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <header
      id="main-content"
      className="relative h-[80svh] max-h-[720px] md:h-[88vh] overflow-hidden bg-forest"
      dir="rtl"
    >
      {/* Always-indexed H1 for SEO — visually hidden, always in DOM */}
      <h1 className="sr-only">
        מארזים ותוצרת חקלאית — משק שוסטרמן, מושב לימן, גבול הצפון
      </h1>
      {prefersReduced ? (
        <img
          src={BRAND_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        /* Brand video — loops for as long as the hero is on screen */
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={BRAND_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={BRAND_VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Gradient — bottom only */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Rotating eyebrow + headline + tagline + both CTAs.
          Three weights, deliberately: the eyebrow rotates and is the lightest,
          the headline is the anchor, the tagline sits between them. Stacking
          the eyebrow under the headline instead would give two sub-lines of
          near-identical weight and no hierarchy at all. */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] max-w-xl mx-auto text-center">
        {/* Rotating eyebrow — skipped entirely for reduced motion */}
        {!prefersReduced && (
          <div className="min-h-[2.5rem] flex items-end justify-center mb-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={captionIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="text-white/70 text-xs sm:text-sm font-semibold tracking-[0.08em] leading-snug text-balance"
              >
                {CAPTIONS[captionIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {/* Headline — mirrors the sr-only H1, so it is aria-hidden */}
        <p
          className={`text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight text-balance ${
            tagline ? "mb-3" : "mb-6"
          }`}
          aria-hidden="true"
        >
          {headline}
        </p>

        {/* Sub-headline — only rendered when the Studio field holds text */}
        {tagline && (
          <p className="text-base md:text-lg text-white/85 leading-snug text-balance mb-6">
            {tagline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-center items-stretch sm:items-center gap-3">
          {/* Chatbot CTA — pulsing */}
          <div className="relative inline-flex w-full sm:w-auto justify-center">
            <motion.span
              className="absolute inset-0 rounded-2xl bg-white/40"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
            {ctaHref ? (
              <a
                href={ctaHref}
                {...(ctaHref.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="relative btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-forest font-black text-sm md:text-base hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.35)]"
              >
                <MessageCircle className="w-5 h-5" />
                {ctaLabel}
              </a>
            ) : (
              <button
                onClick={openChat}
                className="relative btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-forest font-black text-sm md:text-base hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.35)]"
                aria-label="לשאלות והזמנות — פתח צ'אט"
              >
                <MessageCircle className="w-5 h-5" />
                {ctaLabel}
              </button>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-sm md:text-base hover:bg-[#20b858] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
            aria-label="הזמינו עכשיו בוואטסאפ"
          >
            <WhatsAppIcon className="w-5 h-5" />
            הזמינו עכשיו בוואטסאפ
          </a>
        </div>
      </div>
    </header>
  );
}
