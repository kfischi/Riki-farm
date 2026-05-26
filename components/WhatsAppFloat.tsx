"use client";

import { MessageCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שלח הודעה בוואטסאפ"
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:bg-[#20b858] hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" aria-hidden="true" />
    </a>
  );
}
