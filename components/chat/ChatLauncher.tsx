"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
      className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-forest shadow-green-lg flex items-center justify-center text-white hover:bg-forest-mid transition-colors"
      style={{ backgroundColor: "#1B4332" }}
    >
      <MessageCircle className="w-7 h-7" />
      {unread && (
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-wheat rounded-full border-2 border-white animate-pulse-dot" style={{ backgroundColor: "#E9C46A" }} />
      )}
    </motion.button>
  );
}
