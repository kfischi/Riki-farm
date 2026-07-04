"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { MessageCircle, Sprout, type LucideIcon } from "lucide-react";
import type { Package } from "@/lib/types";

const LYCHEE_VIDEO_WEBM =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_webm,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_VIDEO_MP4 =
  "https://res.cloudinary.com/dptyfvwyo/video/upload/f_mp4,q_auto/v1783080373/%D7%9C%D7%99%D7%A6%D7%99_cjabjq.mp4";
const LYCHEE_POSTER =
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg";

// Row 1: farm shot (span 2) + Riki & Ron wider shot (span 4); Row 2: three equal images (span 2 each)
const PACKAGES_COLLAGE = [
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651765/5_pzixdg.jpg",        span: 2 },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108965/Photo_from_Kfir_grvbgv.jpg", span: 4, objectPosition: "center 30%" },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/4_jnhksq.jpg",        span: 2 },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108986/Photo_from_Kfir_1_iwc64y.jpg", span: 2 },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783109230/14_cbwmfj.jpg",       span: 2 },
];

function PremiumPlaceholder({ icon: Icon = Sprout }: { icon?: LucideIcon }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-forest via-forest-mid to-forest relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grain-overlay" />
      <Icon className="w-16 h-16 text-wheat/20 relative z-10" strokeWidth={0.75} />
    </div>
  );
}

interface Props {
  packages?: Package[];
}

export function CatalogSection({ packages: packagesProp }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const openChatWithPkg = (pkgId: string) => {
    window.dispatchEvent(new CustomEvent("rickybot:open", { detail: { pkgId } }));
  };

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
      id="catalog"
      aria-labelledby="catalog-heading"
      className="relative py-16 lg:py-28 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        {/* ===== Section header ===== */}
        <div className="mb-12 lg:mb-16">
          <motion.div {...anim(0)} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-clay" aria-hidden="true" />
            <span className="text-clay text-sm font-semibold uppercase tracking-[0.2em]">
              הזמנת מארזים עם תוצרת חקלאית ופירות העונה
            </span>
          </motion.div>
          <motion.h2
            {...anim(0.1)}
            id="catalog-heading"
            className="text-4xl lg:text-5xl font-black text-forest leading-tight"
          >
            ליצ'י טרי ומארזים מהמשק
          </motion.h2>
        </div>

        {/* ===== Lychee video block ===== */}
        <motion.div {...anim(0.18)} className="mb-10">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_32px_rgba(27,67,50,0.2)]">
            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={LYCHEE_POSTER}
              className="w-full h-[50vh] md:h-[62vh] object-cover"
              aria-hidden="true"
            >
              <source src={LYCHEE_VIDEO_WEBM} type="video/webm" />
              <source src={LYCHEE_VIDEO_MP4} type="video/mp4" />
            </video>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Caption + CTA */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-center" dir="rtl">
              <p className="text-white text-lg md:text-2xl font-bold mb-5 drop-shadow-md">
                עונת הליצ&apos;י בעיצומה. נקטף אצלינו ומגיע עד אליכם — טרי, עסיסי וטעים בטירוף
              </p>
              <button
                onClick={() => openChatWithPkg("lychee-fresh")}
                className="btn-sheen inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-forest font-black text-sm md:text-base hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.3)]"
                aria-label="הזמן ליצ'י טרי"
              >
                <MessageCircle className="w-5 h-5" />
                הזמן ליצ&apos;י טרי
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== Packages collage ===== */}
        <motion.div {...anim(0.28)}>
          <h3 className="text-2xl lg:text-3xl font-black text-forest mb-5" dir="rtl">
            מארזי תוצרת חקלאית
          </h3>
          <div
            className="grid gap-2 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(27,67,50,0.12)] h-[45vh] md:h-[55vh] mb-6"
            style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "1fr 1fr" }}
          >
            {PACKAGES_COLLAGE.map(({ src, span, objectPosition }, i) => (
              <div key={src} className="relative overflow-hidden" style={{ gridColumn: `span ${span}` }}>
                <Image
                  src={src}
                  alt={`מארז תוצרת חקלאית ממשק שוסטרמן ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  style={objectPosition ? { objectPosition } : undefined}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openChatWithPkg("fresh-box-custom")}
              className="btn-sheen inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-forest text-white font-black text-sm md:text-base hover:bg-forest-mid hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(27,67,50,0.3)] active:scale-[0.98] transition-all duration-300"
              aria-label="הזמן מארז תוצרת חקלאית"
            >
              <MessageCircle className="w-5 h-5" />
              הזמן מארז
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
