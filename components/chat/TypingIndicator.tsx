"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Image from "next/image";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-forest/10">
        <Image src={CONFIG.rickyAvatar} alt="" width={28} height={28} className="object-cover" unoptimized />
      </div>
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
