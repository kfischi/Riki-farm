// Sanity Studio schema — בלוק מדיה (site banners and images)
import type { ReactNode } from "react";
import { PLACEMENT_OPTIONS, LIMITS, type Rule } from "./constants";

export const mediaBlockSchema = {
  name: "mediaBlock",
  title: "באנר / תמונת אתר",
  type: "document",
  fields: [
    {
      name: "title",
      title: "שם פנימי (לזיהוי שלך)",
      type: "string",
      description: "לא מוצג באתר — רק כדי שתזהו את הבלוק ברשימה",
      validation: (R: Rule) =>
        R.required().max(LIMITS.internalTitle).warning(`מומלץ עד ${LIMITS.internalTitle} תווים`),
    },
    {
      name: "image",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
      validation: (R: Rule) => R.required(),
      fields: [
        {
          name: "alt",
          title: "תיאור התמונה (נגישות)",
          type: "string",
          description: "מה רואים בתמונה. נדרש לנגישות ולגוגל.",
          validation: (R: Rule) =>
            R.max(LIMITS.altText).warning(`מומלץ עד ${LIMITS.altText} תווים`),
        },
      ],
    },
    {
      name: "placement",
      title: "איפה זה מופיע באתר",
      type: "string",
      description: "בחרו מהרשימה",
      options: { list: PLACEMENT_OPTIONS },
      validation: (R: Rule) => R.required(),
    },
    { name: "order",   title: "סדר תצוגה", type: "number" },
    { name: "active",  title: "פעיל",      type: "boolean", initialValue: true },
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", placement: "placement", media: "image", active: "active" },
    prepare({ title, placement, media, active }: { title?: string; placement?: string; media?: ReactNode; active?: boolean }) {
      const where = PLACEMENT_OPTIONS.find((p) => p.value === placement)?.title;
      return {
        title: active === false ? `${title} (כבוי)` : title,
        subtitle: where,
        media,
      };
    },
  },
};
