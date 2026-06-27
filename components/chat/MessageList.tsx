"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { MessageType } from "@/lib/types";

interface Props {
  messages: MessageType[];
  isTyping: boolean;
  onSend: (input: string) => void;
}

export function MessageList({ messages, isTyping, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="שיחה עם ריקי"
      className="h-full overflow-y-auto chat-scroll px-3 py-4 flex flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <MessageBubble message={msg} onSend={onSend} />
          </motion.div>
        ))}
      </AnimatePresence>
      {isTyping && (
        <motion.div
          key="typing"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <TypingIndicator />
        </motion.div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
