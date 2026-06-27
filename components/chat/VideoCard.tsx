"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Video } from "@/lib/types";

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`צפה בסרטון: ${video.title}`}
      className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-green-sm hover:shadow-green-md transition-shadow group border"
      style={{ borderColor: "rgba(27,67,50,0.05)" }}
    >
      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="80px" unoptimized />
        <div className="absolute inset-0 flex items-center justify-center transition-colors" style={{ backgroundColor: "rgba(27,67,50,0.4)" }}>
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight" style={{ color: "#1B4332" }}>{video.title}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(27,67,50,0.5)" }}>▶ לחץ/י לצפייה</p>
      </div>
    </a>
  );
}
