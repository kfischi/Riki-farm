"use client";

import { MessageCircle } from "lucide-react";

interface Props {
  href: string;
  summaryText: string;
}

export function WhatsAppButton({ href, summaryText }: Props) {
  return (
    <div className="bg-white rounded-2xl rounded-br-sm p-4 shadow-green-sm border max-w-[85%]" style={{ borderColor: "rgba(27,67,50,0.05)" }}>
      <pre className="text-xs whitespace-pre-wrap leading-relaxed mb-3 font-sans" style={{ color: "rgba(27,67,50,0.7)" }}>
        {summaryText}
      </pre>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white font-bold text-sm transition-all shadow-md active:scale-95"
        style={{ backgroundColor: "#25D366" }}
        aria-label="שלח הזמנה לריקי בוואטסאפ"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#20ba5a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        לחץ/י לשליחת ההזמנה לריקי בוואטסאפ
      </a>
    </div>
  );
}
