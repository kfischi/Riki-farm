"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (input: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function ChatInput({ onSend, inputRef }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-3 py-2.5 bg-white border-t"
      style={{ borderColor: "rgba(27,67,50,0.1)" }}
    >
      <label htmlFor="chat-input" className="sr-only">הקלד/י הודעה לריקי</label>
      <input
        id="chat-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="כתוב/י הודעה..."
        aria-label="הקלד/י הודעה לריקי"
        className="flex-1 rounded-xl px-3 py-2 border transition-colors outline-none"
        style={{ fontSize: "16px", backgroundColor: "#FAF9F6", color: "#1B4332", borderColor: "rgba(27,67,50,0.1)" }}
        dir="rtl"
      />
      <button
        type="submit"
        aria-label="שלח הודעה"
        disabled={!value.trim()}
        className="w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all flex-shrink-0 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#1B4332" }}
      >
        <Send className="w-4 h-4 rotate-180" />
      </button>
    </form>
  );
}
