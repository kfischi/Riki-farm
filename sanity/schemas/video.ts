// Sanity Studio schema — סרטון
import type { Rule } from "./constants";
export const videoSchema = {
  name: "video",
  title: "סרטון",
  type: "document",
  fields: [
    { name: "id",        title: "מזהה",      type: "slug",   validation: (R: Rule) => R.required(), options: { source: "title" } },
    { name: "title",     title: "כותרת",     type: "string", validation: (R: Rule) => R.required() },
    { name: "url",       title: "קישור YouTube", type: "url", validation: (R: Rule) => R.required() },
    { name: "thumbnail", title: "תמונת תצוגה (URL)", type: "url", description: "אם ריק — יוצג אוטומטית מ-YouTube" },
    { name: "order",     title: "סדר תצוגה", type: "number" },
  ],
};
