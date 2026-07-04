"use client";

import type { MessageType } from "@/lib/types";
import { QuickReplies } from "./QuickReplies";
import { VideoCard } from "./VideoCard";
import { CatalogCarousel } from "./CatalogCarousel";
import { WhatsAppButton } from "./WhatsAppButton";
import { RickyAvatar } from "./RickyAvatar";

interface Props {
  message: MessageType;
  onSend: (input: string) => void;
}

export function MessageBubble({ message, onSend }: Props) {
  if (message.sender === "user") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-green-sm" style={{ backgroundColor: "#1B4332", color: "white" }}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.type === "text" ? message.text : ""}</p>
        </div>
      </div>
    );
  }

  // Bot message
  const withAvatar = (content: React.ReactNode) => (
    <div className="flex items-end gap-2">
      <div className="self-end mb-0.5">
        <RickyAvatar size={28} />
      </div>
      <div className="flex-1 min-w-0">{content}</div>
    </div>
  );

  switch (message.type) {
    case "text":
      return withAvatar(
        <div className="max-w-[85%] bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-green-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(27,67,50,0.9)" }}>
            {message.text}
          </p>
        </div>
      );

    case "quick-replies":
      return withAvatar(
        <div className="flex flex-col gap-2">
          {message.text && (
            <div className="max-w-[85%] bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-green-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(27,67,50,0.9)" }}>
                {message.text}
              </p>
            </div>
          )}
          <QuickReplies replies={message.replies} onSelect={onSend} />
        </div>
      );

    case "video-link":
      return withAvatar(
        <div className="flex flex-col gap-2 w-full">
          {message.videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      );

    case "catalog-cards":
      return withAvatar(
        <div className="w-full">
          <CatalogCarousel packages={message.packages} onOrder={onSend} />
        </div>
      );

    case "whatsapp-cta":
      return withAvatar(
        <WhatsAppButton href={message.href} summaryText={message.summaryText} />
      );

    default:
      return null;
  }
}
