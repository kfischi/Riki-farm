// Sanity Studio schema — המלצה (customer feedback screenshot)
import type { ReactNode } from "react";
import { imageAltValidation, type Rule } from "./constants";

/**
 * A piece of customer feedback shown in the "מה אומרים עלינו" section.
 *
 * On this site that section is a grid of WhatsApp screenshots, not typed-out
 * quotes — so this type stores an image, which is what actually reaches the
 * page. A text-quote field here would be a form whose contents no visitor
 * ever sees.
 */
export const testimonialSchema = {
  name: "testimonial",
  title: "המלצה",
  type: "document",
  fields: [
    {
      name: "image",
      title: "צילום מסך",
      type: "image",
      description: "צילום המסך של ההודעה מהלקוח, כפי שיוצג באתר",
      options: { hotspot: true },
      validation: (R: Rule) => R.required().error("צריך להעלות תמונה — בלעדיה ההמלצה לא תוצג"),
      fields: [
        {
          name: "alt",
          title: "תיאור התמונה (נגישות)",
          type: "string",
          description: "מה כתוב בהודעה, במשפט קצר. נחוץ לקוראי מסך ולגוגל.",
          validation: imageAltValidation,
        },
      ],
    },
    {
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      description: "מספר נמוך מופיע קודם",
    },
    {
      name: "available",
      title: "מוצג",
      type: "boolean",
      description: "כבו כדי להסתיר את ההמלצה מהאתר בלי למחוק אותה",
      initialValue: true,
    },
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { media: "image", alt: "image.alt", order: "order", available: "available" },
    prepare({ media, alt, order, available }: { media?: ReactNode; alt?: string; order?: number; available?: boolean }) {
      const label = alt?.trim() || "המלצה ללא תיאור";
      return {
        title: available === false ? `${label} (מוסתר)` : label,
        subtitle: order != null ? `סדר: ${order}` : undefined,
        media,
      };
    },
  },
};
