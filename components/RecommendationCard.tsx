"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus, Tag } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { saveLead } from "@/lib/saveLead";

export interface RecommendationPayload {
  packageId: string;
  packageName: string;
  description: string;
  tags: string[];
  suggestedQuantity: number;
}

export function RecommendationCard({
  packageName,
  description,
  tags,
  suggestedQuantity,
}: RecommendationPayload) {
  const [qty, setQty] = useState(Math.max(1, suggestedQuantity ?? 1));

  const handleOrder = () => {
    const text = [
      "שלום ריקי! 👋 דיברתי עם ערדית ואשמח לקבל פרטים על:",
      `מוצר: ${packageName}`,
      `כמות משוערת: ${qty}`,
    ].join("\n");

    saveLead({
      name: "—",
      company: "—",
      region: "—",
      address: "—",
      email: "—",
      phone: "—",
      pkg: packageName,
      quantity: String(qty),
      consent: false,
      source: "ricky-chatbot",
      status: "partial",
    });

    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className="mt-3 rounded-2xl border border-ardit/20 bg-white shadow-[0_2px_12px_rgba(128,24,44,0.08)] overflow-hidden"
      dir="rtl"
      role="region"
      aria-label={`המלצה: ${packageName}`}
    >
      {/* Header strip */}
      <div className="bg-ardit px-4 py-2 flex items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-white/80 flex-shrink-0" aria-hidden="true" />
        <span className="text-white text-xs font-semibold tracking-wide">המלצה עבורך</span>
      </div>

      <div className="p-4">
        <h4 className="font-bold text-forest text-sm leading-snug">{packageName}</h4>
        <p className="text-forest/60 text-xs mt-1.5 leading-relaxed">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5" role="list" aria-label="תגיות">
            {tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="text-[10px] px-2 py-0.5 rounded-full bg-ardit/10 text-ardit font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quantity stepper */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-forest/50 font-medium">כמות:</span>
          <div className="flex items-center gap-2" role="group" aria-label="בחירת כמות">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full bg-ardit/10 hover:bg-ardit/20 flex items-center justify-center text-ardit transition-colors focus-visible:ring-2 focus-visible:ring-ardit"
              aria-label="הקטן כמות"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span
              className="text-sm font-black text-forest w-8 text-center tabular-nums"
              aria-live="polite"
              aria-label={`כמות: ${qty}`}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 rounded-full bg-ardit/10 hover:bg-ardit/20 flex items-center justify-center text-ardit transition-colors focus-visible:ring-2 focus-visible:ring-ardit"
              aria-label="הגדל כמות"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <button
          onClick={handleOrder}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-ardit text-white font-bold text-sm hover:bg-ardit/90 active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ardit focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          הזמן עכשיו בוואטסאפ
        </button>

        <p className="text-[10px] text-forest/35 text-center mt-2">
          ריקי תחזור אליך עם הצעת מחיר אישית
        </p>
      </div>
    </div>
  );
}
