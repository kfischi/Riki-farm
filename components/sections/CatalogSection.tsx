"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { MessageCircle } from "lucide-react";
import type { Package } from "@/lib/types";
import { COLLAGE_SLOTS, type SiteMedia } from "@/lib/mediaSlots";
import { PackageGrid } from "./PackageGrid";

// The photo each collage cell ships with, in the grid's own order. The cell's
// width and crop come from COLLAGE_SLOTS, so a cell cannot be resized here and
// keep asking Sanity for the old shape.
// Row 1: farm shot + Riki & Ron wider shot; Row 2: three equal images.
const SHIPPED_COLLAGE = [
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651765/5_pzixdg.jpg" },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108965/Photo_from_Kfir_grvbgv.jpg", objectPosition: "center 30%" },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/4_jnhksq.jpg" },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108986/Photo_from_Kfir_1_iwc64y.jpg" },
  { src: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783109230/14_cbwmfj.jpg" },
];

interface Props {
  packages?: Package[];
  /** Photos placed from the Studio. Each cell falls back on its own. */
  media?: SiteMedia;
}

export function CatalogSection({ packages: packagesProp, media }: Props) {
  // Sanity is the source of truth; CONFIG is what ships when it is unreachable.
  const packages = packagesProp?.length ? packagesProp : CONFIG.packages;
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
            מארזים מהמשק
          </motion.h2>
        </div>

        {/* ===== Packages collage ===== */}
        <motion.div {...anim(0.28)}>
          <h3 className="text-2xl lg:text-3xl font-black text-forest mb-5" dir="rtl">
            מארזי תוצרת חקלאית
          </h3>
          <div
            className="grid gap-2 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(27,67,50,0.12)] h-[45vh] md:h-[55vh] mb-6"
            style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "1fr 1fr" }}
          >
            {COLLAGE_SLOTS.map(({ slot, span }, i) => {
              const placed = media?.[slot];
              const shipped = SHIPPED_COLLAGE[i];
              // Sanity already returned this cell's crop, so the shipped photo's
              // manual framing must not be applied on top of it.
              const objectPosition = placed ? undefined : shipped.objectPosition;
              return (
                <div key={slot} className="relative overflow-hidden" style={{ gridColumn: `span ${span}` }}>
                  <Image
                    src={placed?.url ?? shipped.src}
                    alt={placed?.alt ?? `מארז תוצרת חקלאית ממשק שוסטרמן ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    style={objectPosition ? { objectPosition } : undefined}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              );
            })}
          </div>

          <div className="mb-10">
            <PackageGrid packages={packages} />
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
