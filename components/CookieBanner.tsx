"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    // HOOK: Enable analytics/tracking scripts here when added
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="alertdialog"
      aria-live="polite"
      aria-label="הסכמה לעוגיות"
      className="fixed bottom-0 inset-x-0 z-[8000] p-4 no-print"
    >
      <div className="max-w-2xl mx-auto rounded-2xl shadow-green-xl px-6 py-4 flex flex-wrap items-center gap-4" style={{ backgroundColor: "#1B4332", color: "white" }}>
        <p className="flex-1 text-sm leading-relaxed min-w-[200px]" style={{ color: "rgba(255,255,255,0.85)" }}>
          אתר זה משתמש ב-localStorage ו-sessionStorage לצורך שמירת העדפות נגישות וסטטוס שיחה.
          {" "}
          <Link href="/cookies" className="underline" style={{ color: "#E9C46A" }}>
            מדיניות עוגיות
          </Link>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="px-5 py-2 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{ backgroundColor: "#E9C46A", color: "#1B4332" }}
          >
            אני מסכים/ה
          </button>
          <button
            onClick={() => setVisible(false)}
            aria-label="סגור הודעת עוגיות"
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "white" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
