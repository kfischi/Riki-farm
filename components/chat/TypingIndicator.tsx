"use client";

import { motion } from "framer-motion";
import { RickyAvatar } from "./RickyAvatar";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <RickyAvatar size={28} />
      <div className="bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-green-sm flex items-center gap-1.5">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full block"
            style={{ backgroundColor: "rgba(27,67,50,0.4)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
