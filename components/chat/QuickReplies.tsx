"use client";

import { motion } from "framer-motion";
import type { QuickReply } from "@/lib/types";

interface Props {
  replies: QuickReply[];
  onSelect: (value: string) => void;
}

export function QuickReplies({ replies, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="אפשרויות מהירות">
      {replies.map((r, i) => (
        <motion.button
          key={r.value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(r.label)}
          className="text-xs px-3 py-1.5 rounded-full border-2 bg-white font-medium transition-all"
          style={{ borderColor: "rgba(27,67,50,0.2)", color: "#1B4332" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1B4332";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#1B4332";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#1B4332";
            e.currentTarget.style.borderColor = "rgba(27,67,50,0.2)";
          }}
        >
          {r.label}
        </motion.button>
      ))}
    </div>
  );
}
