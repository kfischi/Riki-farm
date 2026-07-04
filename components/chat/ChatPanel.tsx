"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, RefreshCw } from "lucide-react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { CONFIG } from "@/lib/config";
import type { MessageType } from "@/lib/types";
import { RickyAvatar } from "./RickyAvatar";

interface Props {
  messages: MessageType[];
  isTyping: boolean;
  onClose: () => void;
  onSend: (input: string) => void;
  onReset: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** When true the panel was auto-opened (timer), not by user click — skip focus steal */
  autoOpened?: boolean;
}

export function ChatPanel({ messages, isTyping, onClose, onSend, onReset, inputRef, autoOpened = false }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    // Only steal focus on explicit user open — not on 15-second auto-open
    // (auto-focus on timer causes iOS Safari viewport jump)
    if (!autoOpened) first?.focus();
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="שיחה עם ריקי"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-6 left-6 z-[9100] flex flex-col rounded-2xl overflow-hidden shadow-green-xl border border-forest/10"
      style={{
        width: "min(420px, calc(100vw - 1.5rem))",
        height: "min(640px, calc(100svh - 5rem))",
      }}
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ backgroundColor: "#1B4332", color: "white" }}>
        <RickyAvatar size={40} withPresence />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight">🍈 {CONFIG.brand.ownerName}</p>
          <p className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.7)" }}>
            מחובר/ת עכשיו
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            aria-label="אפס שיחה"
            title="התחל שיחה מחדש"
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="סגור שיחה"
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-mesh-gradient" style={{ backgroundColor: "#FAF9F6" }}>
        <MessageList messages={messages} isTyping={isTyping} onSend={onSend} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} inputRef={inputRef} />

      {/* Back to menu */}
      <div className="px-3 pb-2 flex justify-center" style={{ backgroundColor: "#FAF9F6" }}>
        <button
          onClick={() => onSend("חזרה לתפריט")}
          className="text-xs transition-colors underline underline-offset-2"
          style={{ color: "rgba(27,67,50,0.5)" }}
        >
          חזרה לתפריט הראשי
        </button>
      </div>
    </motion.div>
  );
}
