"use client";

import { useState, useEffect, useRef } from "react";
import { X, Plus, Contrast, Underline, Type, Pause, RotateCcw, Accessibility } from "lucide-react";
import Link from "next/link";

type Prefs = {
  largerFont: boolean;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  noMotion: boolean;
};

const defaultPrefs: Prefs = {
  largerFont: false,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  noMotion: false,
};

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement;
  html.classList.toggle("larger-font", prefs.largerFont);
  html.classList.toggle("high-contrast", prefs.highContrast);
  html.classList.toggle("highlight-links", prefs.highlightLinks);
  html.classList.toggle("readable-font", prefs.readableFont);
  html.classList.toggle("no-motion", prefs.noMotion);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("a11y_prefs");
      if (stored) {
        const p = JSON.parse(stored) as Prefs;
        setPrefs(p);
        applyPrefs(p);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggle = (key: keyof Prefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      applyPrefs(next);
      localStorage.setItem("a11y_prefs", JSON.stringify(next));
      return next;
    });
  };

  const reset = () => {
    setPrefs(defaultPrefs);
    applyPrefs(defaultPrefs);
    localStorage.removeItem("a11y_prefs");
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const controls: { key: keyof Prefs; label: string; icon: React.ReactNode }[] = [
    { key: "largerFont", label: "הגדל/י גופן", icon: <Plus className="w-4 h-4" /> },
    { key: "highContrast", label: "ניגוד גבוה", icon: <Contrast className="w-4 h-4" /> },
    { key: "highlightLinks", label: "הדגש קישורים", icon: <Underline className="w-4 h-4" /> },
    { key: "readableFont", label: "גופן קריא", icon: <Type className="w-4 h-4" /> },
    { key: "noMotion", label: "עצור אנימציות", icon: <Pause className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9000] flex flex-col items-end gap-3 no-print">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="תפריט נגישות"
          className="bg-white rounded-2xl shadow-green-xl border p-5 w-64"
          style={{ borderColor: "rgba(27,67,50,0.1)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm" style={{ color: "#1B4332" }}>אפשרויות נגישות</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגור תפריט נגישות"
              className="p-1 rounded-lg"
            >
              <X className="w-4 h-4" style={{ color: "rgba(27,67,50,0.6)" }} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {controls.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: prefs[key] ? "#1B4332" : "rgba(27,67,50,0.05)",
                  color: prefs[key] ? "white" : "#1B4332",
                }}
                aria-pressed={prefs[key]}
              >
                {icon}
                {label}
              </button>
            ))}

            <button
              onClick={reset}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mt-1"
              style={{ backgroundColor: "rgba(188,108,37,0.1)", color: "#BC6C25" }}
            >
              <RotateCcw className="w-4 h-4" />
              איפוס הגדרות
            </button>

            <Link
              href="/accessibility"
              className="text-xs text-center mt-2 underline underline-offset-2"
              style={{ color: "rgba(27,67,50,0.5)" }}
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="פתח/י תפריט נגישות"
        aria-expanded={open}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#1B4332", color: "white", boxShadow: "0 4px 16px rgba(27,67,50,0.4)" }}
      >
        <Accessibility className="w-8 h-8" aria-hidden="true" strokeWidth={2} />
      </button>
    </div>
  );
}
