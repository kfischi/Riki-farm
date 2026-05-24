// Sanity Studio schema — סרטון
export const videoSchema = {
  name: "video",
  title: "סרטון",
  type: "document",
  fields: [
    { name: "id",        title: "מזהה",      type: "slug",   validation: (R: any) => R.required(), options: { source: "title" } },
    { name: "title",     title: "כותרת",     type: "string", validation: (R: any) => R.required() },
    { name: "url",       title: "קישור YouTube", type: "url", validation: (R: any) => R.required() },
    { name: "thumbnail", title: "תמונת תצוגה (URL)", type: "url", description: "אם ריק — יוצג אוטומטית מ-YouTube" },
    { name: "order",     title: "סדר תצוגה", type: "number" },
  ],
};
