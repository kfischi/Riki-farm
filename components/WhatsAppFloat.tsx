"use client";

import { CONFIG } from "@/lib/config";

/* Official WhatsApp SVG mark */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.47 1.68 6.34L3 29l6.84-1.65A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
        fill="#fff"
      />
      <path
        d="M16 5.2A10.8 10.8 0 0 0 5.2 16c0 2.03.57 3.93 1.55 5.56l.2.32-1.18 4.32 4.44-1.16.31.18A10.8 10.8 0 1 0 16 5.2zm6.37 15.17c-.26.72-1.52 1.38-2.07 1.42-.52.04-1.02.23-3.44-.72-2.9-1.13-4.76-4.07-4.9-4.26-.14-.2-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .42-.07.65.5l.84 2.07c.1.22.06.48-.07.68l-.37.54c-.14.2-.28.41-.12.7.46.85 1.14 1.7 1.96 2.38.84.7 1.7 1.02 2.12 1.14.3.08.54-.03.74-.26l.53-.63c.2-.23.44-.28.69-.18l2.1.98c.25.12.41.18.47.27.07.1.07.56-.19 1.29z"
        fill="#25D366"
      />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שלח הודעה בוואטסאפ"
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:bg-[#20b858] hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <WhatsAppIcon className="w-8 h-8" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" aria-hidden="true" />
    </a>
  );
}
