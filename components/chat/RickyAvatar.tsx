import Image from "next/image";
import { CONFIG } from "@/lib/config";

interface Props {
  /** Visual size in px (CSS pixels). width/height props are set to 2× for 2x DPI. */
  size: 28 | 40 | 64;
  /** Show green ring + online dot (used in chat header) */
  withPresence?: boolean;
}

const SIZE_MAP: Record<number, { px: number; sizes: string }> = {
  28: { px: 56,  sizes: "28px" },
  40: { px: 80,  sizes: "40px" },
  64: { px: 128, sizes: "64px" },
};

export function RickyAvatar({ size, withPresence = false }: Props) {
  const { px, sizes } = SIZE_MAP[size];

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className={`w-full h-full rounded-full overflow-hidden ${
          withPresence ? "ring-2 ring-forest/30" : "border border-forest/10"
        }`}
      >
        <Image
          src={CONFIG.rickyAvatar}
          alt="ריקי שוסטרמן"
          width={px}
          height={px}
          sizes={sizes}
          className="object-cover w-full h-full"
          style={{ objectPosition: "center top" }}
          priority={size === 64}
        />
      </div>

      {/* Online dot */}
      {withPresence && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 rounded-full bg-green-400 border-2 border-white"
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      )}
    </div>
  );
}
