// Sanity Studio schema — מארז (gift package)
import type { ReactNode } from "react";
import { CATEGORY_OPTIONS, LIMITS, type Rule } from "./constants";

export const packageSchema = {
  name: "package",
  title: "מארז",
  type: "document",
  fields: [
    { name: "id",          title: "מזהה ייחודי",  type: "slug",   validation: (R: Rule) => R.required(), options: { source: "name" } },
    {
      name: "name",
      title: "שם המארז",
      type: "string",
      validation: (R: Rule) =>
        R.required().max(LIMITS.name).warning(`מומלץ עד ${LIMITS.name} תווים — שם ארוך עלול לשבור את כרטיס המארז`),
    },
    {
      name: "description",
      title: "תיאור קצר",
      type: "text",
      description: "המשפט שמופיע על כרטיס המארז בקטלוג",
      validation: (R: Rule) =>
        R.max(LIMITS.shortDescription).warning(`מומלץ עד ${LIMITS.shortDescription} תווים — זהו התיאור הקצר שעל הכרטיס`),
    },
    {
      name: "fullDescription",
      title: "תיאור מלא",
      type: "text",
      description: "התיאור הארוך, לעמוד המארז. אפשר להשאיר ריק.",
      validation: (R: Rule) =>
        R.max(LIMITS.fullDescription).warning(`מומלץ עד ${LIMITS.fullDescription} תווים`),
    },
    {
      name: "price",
      title: "מחיר (טקסט)",
      type: "string",
      description: "לדוגמה: ₪150 או ׳לפי הצעת מחיר׳",
      validation: (R: Rule) => R.max(LIMITS.priceLabel).warning("מחיר ארוך מדי — מומלץ ניסוח קצר"),
    },
    {
      name: "bulkPrice",
      title: "מחיר לכמות גדולה",
      type: "string",
      description: "מחיר ליחידה בהזמנה גדולה. טקסט חופשי, לדוגמה: ₪120 ליחידה מ-50 מארזים",
      validation: (R: Rule) => R.max(LIMITS.priceLabel).warning("מחיר ארוך מדי — מומלץ ניסוח קצר"),
    },
    {
      name: "minOrderQty",
      title: "כמות מינימלית להזמנה",
      type: "number",
      description: "מספר המארזים המינימלי להזמנה. השאירו ריק אם אין מינימום.",
      validation: (R: Rule) => R.min(1).warning("הכמות המינימלית צריכה להיות 1 ומעלה"),
    },
    {
      name: "image",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
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
      name: "gallery",
      title: "גלריית תמונות",
      type: "array",
      description: "תמונות נוספות של המארז",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "תיאור התמונה (נגישות)",
              type: "string",
              validation: (R: Rule) =>
                R.max(LIMITS.altText).warning(`מומלץ עד ${LIMITS.altText} תווים`),
            },
          ],
        },
      ],
    },
    {
      name: "category",
      title: "עונה / קטגוריה",
      type: "string",
      description: "בחרו מהרשימה",
      options: { list: CATEGORY_OPTIONS },
    },
    { name: "tags",        title: "תגיות",          type: "array",  of: [{ type: "string" }], description: "תגיות חופשיות להצגה על הכרטיס" },
    { name: "order",       title: "סדר תצוגה",     type: "number" },
    { name: "available",   title: "זמין",           type: "boolean", initialValue: true },
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "price", media: "image", available: "available" },
    prepare({ title, subtitle, media, available }: { title?: string; subtitle?: string; media?: ReactNode; available?: boolean }) {
      return {
        title: available === false ? `${title} (מוסתר)` : title,
        subtitle,
        media,
      };
    },
  },
};
