"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { withFaceCrop } from "@/lib/cloudinary";

interface Props {
  about?: { headline: string; body: string };
}

export function AboutSection({ about: aboutProp }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        };

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-16 lg:py-28 bg-offwhite overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-forest/4 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-wheat/25 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section label */}
        <motion.div {...anim(0)} className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-clay" aria-hidden="true" />
          <span className="text-clay text-sm font-semibold uppercase tracking-[0.2em]">
            הסיפור שמאחורי המשק
          </span>
        </motion.div>

        {/* ===== ROW 1: Greenhouse photo + Opening story ===== */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-20 items-center mb-12 lg:mb-24">
          {/* Photo */}
          <motion.div {...anim(0.1)} className="relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(27,67,50,0.18)]">
              <Image
                src={withFaceCrop(CONFIG.images.aboutPrimary, "3:4")}
                alt="ריקי שוסטרמן בחממה — חקלאית מגבול הצפון"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 35vw"
              />
              {/* Subtle warm tone overlay for consistency */}
              <div className="absolute inset-0 bg-[#BC6C25]/10 mix-blend-multiply" />
            </div>
            {/* Floating name badge */}
            <div className="absolute -bottom-4 right-2 lg:-right-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(27,67,50,0.12)] px-4 py-3 border border-forest/5">
              <p className="text-sm font-bold text-forest">{CONFIG.brand.ownerName}</p>
              <p className="text-xs text-forest/50">{CONFIG.brand.ownerTitle}</p>
            </div>
          </motion.div>

          {/* Story */}
          <div>
            <motion.h2
              {...anim(0.2)}
              id="about-heading"
              className="text-4xl lg:text-5xl font-black text-forest leading-[1.1] mb-8"
            >
              {aboutProp?.headline ?? CONFIG.about.headline}
            </motion.h2>

            <div className="space-y-5">
              {CONFIG.about.story.slice(0, 2).map((para, i) => {
                // Second paragraph is the pull-quote
                if (para.startsWith('"')) {
                  return (
                    <motion.blockquote
                      key={i}
                      {...anim(0.25 + i * 0.08)}
                      className="relative pr-5 py-1"
                      style={{ borderRight: "3px solid #BC6C25" }}
                    >
                      <p className="text-lg lg:text-xl text-forest font-semibold leading-relaxed italic">
                        {para.replace(/^"|"$/g, "")}
                      </p>
                    </motion.blockquote>
                  );
                }
                return (
                  <motion.p
                    key={i}
                    {...anim(0.25 + i * 0.08)}
                    className="text-base lg:text-lg text-forest/70 leading-[1.85]"
                  >
                    {para}
                  </motion.p>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== ROW 2: Northern hills photo + Final story paragraph ===== */}
        {/* Sensitivity: presents with dignity, no dramatization */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <motion.p
              {...anim(0.1)}
              className="text-base lg:text-lg text-forest/70 leading-[1.85] mb-10"
            >
              {CONFIG.about.story[2]}
            </motion.p>

            {/* Pull quote — standalone */}
            <motion.div {...anim(0.2)} className="bg-forest rounded-2xl px-8 py-7">
              <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed">
                &ldquo;{CONFIG.about.pullQuotes[1]}&rdquo;
              </p>
              <p className="text-white/50 text-sm mt-4 font-medium">— {CONFIG.brand.ownerName}</p>
            </motion.div>
          </div>

          {/* Northern hills photo */}
          <motion.div {...anim(0.15)} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(27,67,50,0.15)]">
              <Image
                src={withFaceCrop(CONFIG.images.aboutNorth, "4:3")}
                alt="נוף גבול הצפון — מושב לימן, שדות המשק"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 30vw"
              />
              <div className="absolute inset-0 bg-[#BC6C25]/8 mix-blend-multiply" />
            </div>
            {/* ⚠️ Dev note: verify this photo is not AI-processed before go-live */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
