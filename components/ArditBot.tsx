"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Send, Bot, RotateCcw, Loader2 } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { RecommendationCard } from "./RecommendationCard";
import type { RecommendationPayload } from "./RecommendationCard";

const TRANSPORT = new DefaultChatTransport({ api: "/api/ardit" });

const WELCOME =
  "שלום! אני ערדית 👋 נציגת השירות של משק שוסטרמן.\nאוכל לעזור לך לבחור מארז ליצ'י טרי או תוצרת עונתית מהמשק. מה מעניין אותך?";

function ArditAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-ardit flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Bot className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
}

export function ArditBot() {
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: TRANSPORT,
  });

  const isLoading = status === "submitted" || status === "streaming";

  const open = useCallback(() => {
    setIsOpen(true);
    setUnread(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const reset = useCallback(() => {
    setMessages([]);
    setInput("");
  }, [setMessages]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      open();
      if (detail?.question) {
        setTimeout(() => {
          sendMessage({ text: detail.question });
        }, 300);
      }
    };
    window.addEventListener("ardit:open", handler);
    return () => window.removeEventListener("ardit:open", handler);
  }, [open, sendMessage]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <>
      {/* Launcher FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="ardit-launcher"
            initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? {} : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", delay: 0.8 }}
            onClick={open}
            aria-label="פתח שיחה עם ערדית — עוזרת חכמה"
            className="fixed bottom-24 left-6 z-50 group"
          >
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ animation: "ardit-ping 2.5s ease-out infinite 1.5s" }}
              aria-hidden="true"
            />
            <div className="w-14 h-14 rounded-full bg-ardit flex items-center justify-center shadow-[0_4px_20px_rgba(128,24,44,0.45)] group-hover:scale-105 transition-transform duration-200">
              <Bot className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            {unread && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ardit text-white text-[10px] font-black flex items-center justify-center border-2 border-white"
                aria-label="הודעה חדשה מערדית"
              >
                1
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ardit text-white text-xs font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              שאלי את ערדית
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ardit-panel"
            role="dialog"
            aria-modal="true"
            aria-label="שיחה עם ערדית"
            dir="rtl"
            initial={prefersReduced ? {} : { opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? {} : { opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-6 left-6 z-50 w-[340px] sm:w-[380px] max-h-[80svh] flex flex-col rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(128,24,44,0.2),0_4px_16px_rgba(0,0,0,0.12)]"
            style={{ maxHeight: "min(600px, 80svh)" }}
          >
            {/* Header */}
            <div className="bg-ardit px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <ArditAvatar size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-none">ערדית</p>
                <p className="text-white/60 text-[11px] mt-0.5">עוזרת חכמה · משק שוסטרמן</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="התחל שיחה מחדש"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="סגור שיחה"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto bg-offwhite px-3 py-4 space-y-3 chat-scroll"
            >
              {/* Welcome message (shown when no messages yet) */}
              {messages.length === 0 && (
                <div className="flex gap-2 items-start">
                  <ArditAvatar size={28} />
                  <div className="bg-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm max-w-[85%]">
                    <p className="text-forest text-sm leading-relaxed whitespace-pre-line">{WELCOME}</p>
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.role === "user";

                if (isUser) {
                  const text = msg.parts
                    .filter((p) => p.type === "text")
                    .map((p) => (p as { type: "text"; text: string }).text)
                    .join("");
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="bg-ardit/10 border border-ardit/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                        <p className="text-forest text-sm leading-relaxed">{text}</p>
                      </div>
                    </div>
                  );
                }

                // Assistant message — render parts
                return (
                  <div key={msg.id} className="flex gap-2 items-start">
                    <ArditAvatar size={28} />
                    <div className="flex-1 min-w-0 space-y-2">
                      {msg.parts.map((part, pi) => {
                        if (part.type === "text" && part.text) {
                          return (
                            <div
                              key={`${msg.id}-text-${pi}`}
                              className="bg-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm"
                            >
                              <p className="text-forest text-sm leading-relaxed whitespace-pre-line">
                                {part.text}
                              </p>
                            </div>
                          );
                        }

                        if (
                          part.type === "dynamic-tool" &&
                          part.toolName === "buildRecommendation" &&
                          part.state !== "input-streaming"
                        ) {
                          const payload =
                            part.state === "output-available"
                              ? (part.output as RecommendationPayload)
                              : (part.input as RecommendationPayload);

                          if (!payload?.packageName) return null;
                          return (
                            <RecommendationCard key={`${msg.id}-rec-${pi}`} {...payload} />
                          );
                        }

                        return null;
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2 items-center">
                  <ArditAvatar size={28} />
                  <div className="bg-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm">
                    <Loader2 className="w-4 h-4 text-ardit animate-spin" aria-label="ערדית מקלידה..." />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 bg-white border-t border-forest/8 px-3 py-2.5 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="כתבי הודעה..."
                disabled={isLoading}
                className="flex-1 text-sm text-forest placeholder:text-forest/35 bg-transparent outline-none disabled:opacity-50"
                aria-label="כתבי הודעה לערדית"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-ardit flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ardit/90 transition-colors flex-shrink-0"
                aria-label="שלח הודעה"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
