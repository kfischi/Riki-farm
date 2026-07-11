"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("שלום ריקי! אני רוצה להזמין ליצ'י טרי מהמשק 🌿")}`;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="הזמנה מהירה"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold text-base"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        aria-label="הזמינו ליצ'י עכשיו בוואטסאפ"
        tabIndex={visible ? 0 : -1}
      >
        🛒 הזמינו ליצ'י עכשיו
      </a>
    </div>
  );
}
