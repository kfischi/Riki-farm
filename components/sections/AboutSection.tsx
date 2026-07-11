"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { withFaceCrop } from "@/lib/cloudinary";
import { ShareButton } from "@/components/ShareButton";

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
        <motion.div {...anim(0)} className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-clay" aria-hidden="true" />
          <span className="text-clay text-sm font-semibold uppercase tracking-[0.2em]">
            הסיפור שמאחורי המשק
          </span>
        </motion.div>

        {/* ===== Intro block + lychee banner ===== */}
        <motion.div {...anim(0.05)} className="mb-16 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12" dir="rtl">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl lg:text-3xl font-black text-forest mb-5">
              משק שוסטרמן – חקלאות ישראלית מהלב
            </h2>
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-forest/70 leading-[1.85]">
                ברוכים הבאים למשק שוסטרמן במושב לימן. המשק שלנו מביא אליכם חקלאות ישראלית שורשית, טרייה ואיכותית כבר למעלה מ-22 שנה.
              </p>
              <p className="text-base lg:text-lg text-forest/70 leading-[1.85]">
                אנו מתמחים בגידול מגוון רחב של פירות וירקות מובחרים, ומציעים שירות ייחודי של מארזים בהתאמה אישית הישר מהשדה. המארזים שלנו משלבים בגאווה את התוצרת המשקית שלנו לצד גידולים מעולים של חקלאי קו העימות, מתוך רוח של ערבות הדדית ותמיכה בצפון.
              </p>
              <p className="text-base lg:text-lg text-forest/70 leading-[1.85]">
                אנו מספקים תוצרת חקלאית ומארזים לוועדי עובדים, חברות, ארגונים ונקודות מכירה, לצד שירות ללקוחות פרטיים.
              </p>
            </div>
          </div>

          {/* Lychee season banner — pulsing lychee-color glow */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 0px rgba(180,32,64,0.6)", "0 0 0 10px rgba(180,32,64,0)", "0 0 0 0px rgba(180,32,64,0.6)"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="flex-shrink-0 self-start rounded-2xl w-full lg:w-[240px]"
          >
            <button
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full rounded-2xl overflow-hidden hover:-translate-y-1 active:scale-[0.97] transition-transform duration-300 block"
              aria-label="עונת הליצ'י בעיצומה – עברו לסרטון"
            >
              <div className="relative">
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1783772618/3_qw4w3h.jpg"
                  alt="ליצ'י מהמשק"
                  width={240}
                  height={180}
                  className="w-full h-[166px] object-cover"
                  unoptimized
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#b42040]/90 via-[#b42040]/30 to-transparent" />
                {/* Badge */}
                <div className="absolute top-2 right-2">
                  <motion.span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#b42040] text-white text-[10px] font-bold tracking-wide"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                    עכשיו בעונה
                  </motion.span>
                </div>
                {/* Text overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 text-center">
                  <p className="text-white text-sm font-black leading-tight">
                    עונת הליצ&apos;י בעיצומה
                  </p>
                  <p className="text-white/85 text-xs font-semibold mt-0.5 underline underline-offset-2">
                    לחצו כאן לפרטים
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* ===== ROW 1: Greenhouse photo + Opening story ===== */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-20 items-center mb-12 lg:mb-24">
          {/* Photo */}
          <motion.div {...anim(0.1)} className="relative card-lift">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(27,67,50,0.18)] hover:shadow-[0_16px_56px_rgba(27,67,50,0.26)] transition-shadow duration-400">
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
            <div className="absolute -bottom-4 right-2 lg:-right-4 glass-light rounded-2xl shadow-[0_4px_20px_rgba(27,67,50,0.12)] px-4 py-3">
              <p className="text-sm font-bold text-forest">{CONFIG.brand.ownerName}</p>
              <p className="text-xs text-forest/50">{CONFIG.brand.ownerTitle}</p>
            </div>
          </motion.div>

          {/* Story */}
          <div>
            <motion.h2
              {...anim(0.2)}
              id="about-heading"
              className="text-4xl lg:text-6xl font-black text-forest leading-[1.05] tracking-tight mb-8"
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
            {CONFIG.about.story[2] && (
              <motion.h3
                {...anim(0.05)}
                className="text-xl lg:text-2xl font-black text-forest mb-4"
              >
                {CONFIG.about.story[2]}
              </motion.h3>
            )}
            <motion.p
              {...anim(0.1)}
              className="text-base lg:text-lg text-forest/70 leading-[1.85] mb-10"
            >
              {CONFIG.about.story[3] ?? CONFIG.about.story[2]}
            </motion.p>

            {/* Pull quote — standalone */}
            <motion.div {...anim(0.2)} className="bg-forest rounded-2xl px-8 py-7">
              <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed">
                &ldquo;{CONFIG.about.pullQuotes[1]}&rdquo;
              </p>
              <p className="text-white/50 text-sm mt-4 font-medium">— {CONFIG.brand.ownerName}</p>
            </motion.div>
            <motion.div {...anim(0.3)} className="mt-6">
              <ShareButton
                title={`${CONFIG.brand.name} — ${CONFIG.about.headline}`}
                text={`"${CONFIG.about.pullQuotes[0]}" | ${CONFIG.brand.name}`}
              />
            </motion.div>
          </div>

          {/* Northern hills photo */}
          <motion.div {...anim(0.15)} className="relative card-lift">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(27,67,50,0.15)] hover:shadow-[0_16px_56px_rgba(27,67,50,0.22)] transition-shadow duration-400">
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
