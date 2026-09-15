"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Package } from "@/lib/types";

/**
 * Renders a list of packages as cards. Deliberately generic: it holds no copy,
 * no image URLs and no knowledge of this farm — everything it shows arrives in
 * `packages`. That is what lets the same grid serve another site whose content
 * lives in its own dataset.
 *
 * Callers pass data that has already been through the fallback chain in
 * lib/sanity, so `image` is always a usable URL and only `price`, `tags` and
 * `imageAlt` can be absent.
 */

/** Brand accent. Burgundy — no yellow or amber anywhere in this component. */
const ACCENT = "#80182c";

export interface PackageGridProps {
  packages: Package[];
  /** Omit to render cards without an action button. */
  onOrder?: (packageId: string) => void;
  /** Label for the action button. */
  orderLabel?: string;
  /** Shown instead of the grid when there is nothing to display. */
  emptyLabel?: string;
}

export function PackageGrid({
  packages,
  onOrder,
  orderLabel = "להזמנה",
  emptyLabel,
}: PackageGridProps) {
  if (!packages.length) {
    return emptyLabel ? (
      <p className="text-center text-forest/60 py-8" dir="rtl">
        {emptyLabel}
      </p>
    ) : null;
  }

  return (
    <ul
      dir="rtl"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0"
    >
      {packages.map((pkg) => (
        <li key={pkg.id}>
          <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-forest/10 shadow-[0_2px_16px_rgba(27,67,50,0.08)] hover:shadow-[0_8px_28px_rgba(27,67,50,0.16)] hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] bg-forest/5">
              <Image
                src={pkg.image}
                // The editor supplies the description; the name is a reasonable
                // stand-in so the image is never announced as unlabelled.
                alt={pkg.imageAlt?.trim() || pkg.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h4 className="text-lg font-black text-forest leading-snug mb-2">
                {pkg.name}
              </h4>

              {pkg.description && (
                <p className="text-sm text-forest/75 leading-relaxed mb-4">
                  {pkg.description}
                </p>
              )}

              {pkg.tags && pkg.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mb-4 list-none p-0 m-0">
                  {pkg.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[11px] font-semibold text-forest/70 bg-forest/8 rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {/* Pushes the price and button to the bottom so cards of
                  different text lengths still line up. */}
              <div className="mt-auto flex items-center justify-between gap-3">
                {pkg.price ? (
                  <span
                    className="text-base font-black"
                    style={{ color: ACCENT }}
                  >
                    {pkg.price}
                  </span>
                ) : (
                  <span aria-hidden="true" />
                )}

                {onOrder && (
                  <button
                    type="button"
                    onClick={() => onOrder(pkg.id)}
                    aria-label={`${orderLabel} — ${pkg.name}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-sm font-bold hover:bg-forest-mid active:scale-[0.98] transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {orderLabel}
                  </button>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
