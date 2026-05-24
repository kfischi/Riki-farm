"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { MessageCircle } from "lucide-react";
import type { Package } from "@/lib/types";

interface Props {
  packages?: Package[];
}
export function CatalogSection({ packages: packagesProp }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pkgs = packagesProp ?? CONFIG.packages;

  const openChatWithPkg = (_pkgId: string) => {
    window.dispatchEvent(new CustomEvent("rickybot:open"));
  };

  return (
    <section
      ref={ref}
      id="catalog"
      aria-labelledby="catalog-heading"
      className="py-28 relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm uppercase tracking-widest mb-3 block" style={{ color: "#BC6C25" }}>
            מארזים נבחרים
          </span>
          <h2
            id="catalog-heading"
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1B4332" }}
          >
            הקטלוג שלנו
          </h2>
          <p className="mt-4 text-lg max-w-md mx-auto" style={{ color: "rgba(27,67,50,0.6)" }}>
            כל מארז נוצר בקפידה — טעם, נראות, ואריזה ברמה אחרת
          </p>
        </motion.div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
          role="list"
          aria-label="קטלוג מארזים"
        >
          {pkgs.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, type: "spring", stiffness: 200 }}
              className="rounded-3xl overflow-hidden shadow-green-sm hover:shadow-green-md border group flex flex-col transition-all duration-300"
              style={{ backgroundColor: "#FAF9F6", borderColor: "rgba(27,67,50,0.05)" }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
                {pkg.tags && pkg.tags.length > 0 && (
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {pkg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full font-bold shadow-sm"
                        style={{ backgroundColor: "#E9C46A", color: "#1B4332" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold" style={{ color: "#1B4332" }}>{pkg.name}</h3>
                <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: "rgba(27,67,50,0.6)" }}>
                  {pkg.description}
                </p>
                {pkg.price && (
                  <p className="text-xl font-black mt-3" style={{ color: "#BC6C25" }}>{pkg.price}</p>
                )}
                <button
                  onClick={() => openChatWithPkg(pkg.id)}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-[0.98]"
                  style={{ backgroundColor: "#1B4332" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B4332")}
                  aria-label={`שאל את ריקי על ${pkg.name}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  שאל/י את ריקי על המארז
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
