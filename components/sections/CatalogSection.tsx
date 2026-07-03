"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import {
  MessageCircle,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { Package } from "@/lib/types";
import { ShareButton } from "@/components/ShareButton";

const LYCHEE_COLLAGE = [
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108965/Photo_from_Kfir_grvbgv.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0083_i9m3hk.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0088_bpaxlk.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108986/Photo_from_Kfir_1_iwc64y.jpg",
  "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783109230/14_cbwmfj.jpg",
];

function PremiumPlaceholder({ icon: Icon = Sprout }: { icon?: LucideIcon }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-forest via-forest-mid to-forest relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-wheat/8 pointer-events-none" />
      <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full border border-wheat/6 pointer-events-none" />
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
  const pkgs = packagesProp ?? CONFIG.packages;

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
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-8 items-start lg:items-end mb-12 lg:mb-16">
          <div>
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
            <motion.p {...anim(0.13)} className="text-clay font-semibold text-sm mt-2">
              עונת הליצ'י בעיצומה. נקטף אצלינו ומגיע עד אליכם - טרי, עסיסי וטעים בטירוף
            </motion.p>
          </div>
        </div>

        {/* ===== Lychee photo collage ===== */}
        <motion.div
          {...anim(0.2)}
          className="grid grid-cols-3 gap-2 mb-12 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(27,67,50,0.12)] h-[45vh] md:h-[55vh]"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          {LYCHEE_COLLAGE.map((src, i) => (
            <div key={src} className="relative overflow-hidden">
              <Image
                src={src}
                alt={`ליצ'י ממשק שוסטרמן ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 33vw, 33vw"
                unoptimized
              />
            </div>
          ))}
        </motion.div>

        {/* ===== Featured order cards ===== */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12" role="list" aria-label="הזמנות">
          {pkgs.slice(0, 2).map((pkg, i) => (
            <motion.article
              key={`order-${pkg.id}`}
              role="listitem"
              {...anim(0.28 + i * 0.1)}
              className="card-lift group flex flex-col sm:flex-row bg-offwhite rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.1)] border border-forest/5 hover:shadow-[0_16px_44px_rgba(27,67,50,0.16)] hover:border-wheat/40"
            >
              <div className="relative h-52 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden">
                {pkg.image && !pkg.image.includes("placehold.co") ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 192px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full">
                    <PremiumPlaceholder />
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-black text-forest mb-2">{pkg.name}</h3>
                  <p className="text-sm text-forest/60 leading-relaxed line-clamp-3">{pkg.description}</p>
                </div>
                <button
                  onClick={() => openChatWithPkg(pkg.id)}
                  className="btn-sheen mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-forest text-white font-bold text-sm hover:bg-forest-mid hover:shadow-[0_4px_16px_rgba(27,67,50,0.3)] active:scale-[0.98] transition-all duration-300"
                  aria-label={`שאל את ריקי על ${pkg.name}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  שאל/י את ריקי
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ===== Package grid ===== */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="קטלוג מארזים"
        >
          {pkgs.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              role="listitem"
              {...anim(0.08 * i + 0.3)}
              className="card-lift group flex flex-col bg-offwhite rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(27,67,50,0.08)] hover:shadow-[0_16px_44px_rgba(27,67,50,0.18)] border border-forest/4 hover:border-wheat/40"
            >
              <div className="relative h-48 overflow-hidden">
                {pkg.image && !pkg.image.includes("placehold.co") ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="group-hover:scale-105 transition-transform duration-500 w-full h-full">
                    <PremiumPlaceholder />
                  </div>
                )}
                {pkg.tags && pkg.tags.length > 0 && (
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {pkg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-wheat/90 text-forest font-bold backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-forest">{pkg.name}</h3>
                <p className="text-sm text-forest/55 mt-2 leading-relaxed flex-1 line-clamp-3">
                  {pkg.description}
                </p>
                <button
                  onClick={() => openChatWithPkg(pkg.id)}
                  className="btn-sheen mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-forest text-white font-semibold text-sm hover:bg-forest-mid hover:shadow-[0_4px_16px_rgba(27,67,50,0.3)] active:scale-[0.98] transition-all duration-300"
                  aria-label={`שאל את ריקי על ${pkg.name}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  שאל/י את ריקי
                </button>
                <ShareButton
                  title={`${pkg.name} — ${CONFIG.brand.name}`}
                  text={`${pkg.name} | ${CONFIG.brand.name} — ${pkg.description.slice(0, 60)}...`}
                  className="mt-2 justify-center"
                />
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
