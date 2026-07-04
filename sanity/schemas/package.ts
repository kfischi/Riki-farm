// Sanity Studio schema — מארז (gift package)
export const packageSchema = {
  name: "package",
  title: "מארז",
  type: "document",
  fields: [
    { name: "id",          title: "מזהה ייחודי",  type: "slug",   validation: (R: any) => R.required(), options: { source: "name" } },
    { name: "name",        title: "שם המארז",      type: "string", validation: (R: any) => R.required() },
    { name: "description", title: "תיאור",          type: "text"   },
    { name: "price",       title: "מחיר (טקסט)",   type: "string", description: "לדוגמה: ₪150 או ׳לפי הצעת מחיר׳" },
    { name: "image",       title: "תמונה",          type: "image",  options: { hotspot: true } },
    { name: "tags",        title: "תגיות",          type: "array",  of: [{ type: "string" }] },
    { name: "order",       title: "סדר תצוגה",     type: "number" },
    { name: "available",   title: "זמין",           type: "boolean", initialValue: true },
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
