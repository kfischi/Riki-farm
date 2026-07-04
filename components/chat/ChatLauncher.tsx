"use client";

import { motion } from "framer-motion";
import { RickyAvatar } from "./RickyAvatar";

interface Props {
  isOpen: boolean;
  unread: boolean;
  onOpen: () => void;
}

export function ChatLauncher({ isOpen, unread, onOpen }: Props) {
  if (isOpen) return null;
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 0.5 }}
      onClick={onOpen}
      aria-label="פתח/י שיחה עם ריקי"
      className="fixed bottom-6 left-6 z-50 group"
    >
      {/* Outer pulse ring */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ animation: "launcher-ping 2s ease-out infinite" }}
        aria-hidden="true"
      />

      {/* Label above avatar */}
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-forest text-wheat text-xs font-bold px-3 py-1 rounded-full shadow-md pointer-events-none" dir="rtl">
        🍈 להזמנות דברו איתי
      </span>

      {/* Avatar circle */}
      <div className="shadow-[0_4px_20px_rgba(27,67,50,0.4)] group-hover:scale-105 transition-transform duration-200 rounded-full" style={{ outline: "3px solid #E9C46A" }}>
        <RickyAvatar size={64} withPresence />
      </div>

      {/* Unread badge */}
      {unread && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-wheat text-forest text-[10px] font-black flex items-center justify-center border-2 border-white"
          style={{ backgroundColor: "#E9C46A" }}
          aria-label="הודעה חדשה"
        >
          1
        </span>
      )}
    </motion.button>
  );
}
