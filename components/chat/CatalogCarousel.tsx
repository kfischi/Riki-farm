"use client";

import Image from "next/image";
import type { Package } from "@/lib/types";

interface Props {
  packages: Package[];
  onOrder: (input: string) => void;
}

export function CatalogCarousel({ packages, onOrder }: Props) {
  return (
    <div
      className="catalog-carousel flex gap-3 pb-2"
      role="list"
      aria-label="מארזים זמינים"
    >
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          role="listitem"
          className="flex-shrink-0 w-48 bg-white rounded-2xl overflow-hidden shadow-green-sm border snap-start"
          style={{ borderColor: "rgba(27,67,50,0.05)" }}
        >
          <div className="relative h-28 w-full">
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              className="object-cover"
              sizes="192px"
              unoptimized
            />
            {pkg.tags && pkg.tags.length > 0 && (
              <div className="absolute top-1.5 right-1.5 flex gap-1">
                {pkg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: "#E9C46A", color: "#1B4332" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-sm font-bold leading-tight" style={{ color: "#1B4332" }}>{pkg.name}</h3>
            <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "rgba(27,67,50,0.6)" }}>
              {pkg.description}
            </p>
            {pkg.price && (
              <p className="text-sm font-bold mt-1.5" style={{ color: "#BC6C25" }}>{pkg.price}</p>
            )}
            <button
              onClick={() => onOrder(pkg.id)}
              className="mt-2 w-full text-xs py-1.5 rounded-lg text-white font-semibold transition-all active:scale-95"
              style={{ backgroundColor: "#1B4332" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B4332")}
            >
              בחר/י מארז זה
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
