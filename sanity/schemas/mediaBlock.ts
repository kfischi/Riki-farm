// Sanity Studio schema — תמונת אתר
import type { ReactNode } from "react";
import { MEDIA_SLOT_OPTIONS, MEDIA_SLOT_SPECS, type MediaSlot } from "../../lib/mediaSlots";
import { imageAltValidation, type Rule } from "./constants";

/**
 * One photo in one fixed position on the page.
 *
 * The position comes from a closed list (lib/mediaSlots.ts), not from free
 * text: the layout owns where things go — the grid spans and aspect ratios are
 * in the components — and the editor owns what is shown there. A "placement"
 * the editor could type would be a field the site cannot honour.
 *
 * There is deliberately no internal-name field. The slot already names the
 * document, so a second label would be one more thing to fill for nobody.
 */
export const mediaBlockSchema = {
  name: "mediaBlock",
  title: "תמונת אתר",
  type: "document",
  fields: [
    {
      name: "slot",
      title: "איפה זה מופיע באתר",
      type: "string",
      description:
        "בחרו מהרשימה. אם שתי תמונות מסומנות לאותו מקום — האחרונה שנערכה היא זו שמופיעה.",
      options: { list: MEDIA_SLOT_OPTIONS },
      validation: (R: Rule) => R.required(),
    },
    {
      name: "image",
      title: "תמונה",
      type: "image",
      // The site asks Sanity for a sized crop, so this control really does
      // decide what stays in frame. See lib/mediaSlots.ts.
      options: { hotspot: true },
      validation: (R: Rule) => R.required(),
      fields: [
        {
          name: "alt",
          title: "תיאור התמונה (נגישות)",
          type: "string",
          description: "מה רואים בתמונה. נדרש לנגישות ולגוגל.",
          validation: imageAltValidation,
        },
      ],
    },
    {
      name: "active",
      title: "פעיל",
      type: "boolean",
      description: "כיבוי מחזיר למקום הזה את התמונה המקורית של האתר.",
      initialValue: true,
    },
  ],
  preview: {
    select: { slot: "slot", media: "image", alt: "image.alt", active: "active" },
    prepare({
      slot,
      media,
      alt,
      active,
    }: {
      slot?: string;
      media?: ReactNode;
      alt?: string;
      active?: boolean;
    }) {
      const where = MEDIA_SLOT_SPECS.get(slot as MediaSlot)?.title ?? "מקום לא מוגדר";
      return {
        title: active === false ? `${where} (כבוי)` : where,
        subtitle: alt,
        media,
      };
    },
  },
};
