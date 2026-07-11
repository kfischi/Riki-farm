"use client";

import { Share2, MessageCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";

interface Props {
  title: string;
  text: string;
  className?: string;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function ShareButton({ title, text, className = "" }: Props) {
  const url = CONFIG.seo.siteUrl;

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled
      }
      return;
    }
    // Fallback: WhatsApp
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      "_blank",
      "noopener"
    );
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-forest/15 text-forest/50 hover:text-forest hover:border-forest/30 text-xs font-medium transition-colors"
        aria-label="שתפו"
      >
        <Share2 className="w-3.5 h-3.5" />
        שתפו
      </button>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-medium transition-colors"
        aria-label="שתפו בוואטסאפ"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        וואטסאפ
      </a>
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 text-xs font-medium transition-colors"
        aria-label="שתפו בפייסבוק"
      >
        <FacebookIcon />
        פייסבוק
      </a>
    </div>
  );
}
