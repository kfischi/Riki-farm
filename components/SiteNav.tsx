"use client";

import { useState, useEffect } from "react";
import { Menu, X, Leaf, MessageCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { href: "#main-content",  label: "בית" },
  { href: "#about",         label: "אודות" },
  { href: "#catalog",       label: "הזמנות" },
  { href: "#testimonials",  label: "מה אומרים עלינו" },
  { href: "#faq",           label: "שאלות נפוצות" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-forest/95 backdrop-blur-md shadow-[0_2px_20px_rgba(27,67,50,0.25)]" : "bg-transparent"
      }`}
      aria-label="תפריט ראשי"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-16 flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#main-content" className="flex items-center gap-1.5 focus-visible:outline-none min-w-0" aria-label="חזרה לראש הדף">
          <Leaf className="w-4 h-4 md:w-5 md:h-5 text-wheat flex-shrink-0" />
          <span className="font-black text-white text-sm md:text-base leading-tight whitespace-nowrap">{CONFIG.brand.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 rounded-xl text-[15px] font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
            >
              {l.label}
              <span className="absolute bottom-1 right-4 left-4 h-px bg-wheat scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* WhatsApp CTA — desktop */}
        <a
          href={`https://wa.me/${CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20b858] transition-colors"
          aria-label="צור קשר בוואטסאפ"
        >
          <MessageCircle className="w-4 h-4" />
          וואטסאפ
        </a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-forest/97 backdrop-blur-md border-t border-white/10 px-5 pb-5 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="px-4 py-3 rounded-xl text-lg font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20b858] transition-colors"
            aria-label="צור קשר בוואטסאפ"
          >
            <MessageCircle className="w-5 h-5" />
            וואטסאפ עם ריקי
          </a>
        </div>
      )}
    </nav>
  );
}
