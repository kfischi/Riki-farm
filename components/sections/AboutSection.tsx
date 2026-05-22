"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CONFIG } from "@/lib/config";
import { Leaf, Sun, Heart } from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Organic background shape */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(27,67,50,0.04)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "rgba(233,196,106,0.2)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        <div className="grid lg:grid-cols-[auto_1fr] gap-16 lg:gap-24 items-center">
          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-2 gap-4 max-w-xs mx-auto lg:mx-0"
          >
            {[
              { icon: Leaf, label: "חקלאות בת-קיימא", bg: "#1B4332" },
              { icon: Sun, label: "תוצרת עונתית", bg: "#BC6C25" },
              { icon: Heart, label: "שירות אישי", bg: "#E9C46A" },
              { icon: Leaf, label: "ישירות מהשדה", bg: "#2D6A4F" },
            ].map(({ icon: Icon, label, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                className={`rounded-2xl p-6 flex flex-col items-center gap-3 ${i % 2 === 1 ? "mt-6" : ""}`}
                style={{ backgroundColor: bg }}
              >
                <Icon className="w-7 h-7 text-white" />
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <span className="font-semibold text-sm uppercase tracking-widest mb-3 block" style={{ color: "#BC6C25" }}>
              האנשים שמאחורי המארזים
            </span>
            <h2
              id="about-heading"
              className="text-4xl font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1B4332" }}
            >
              {CONFIG.about.headline}
            </h2>
            <p className="text-lg leading-[1.8] max-w-lg" style={{ color: "rgba(27,67,50,0.7)" }}>
              {CONFIG.about.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
