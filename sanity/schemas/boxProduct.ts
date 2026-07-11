// Sanity Studio schema — מוצר לקופסה (individual product for Box Builder)
export const boxProductSchema = {
  name: "boxProduct",
  title: "מוצר לקופסה",
  type: "document",
  fields: [
    { name: "id",        title: "מזהה",        type: "slug",   validation: (R: any) => R.required(), options: { source: "name" } },
    { name: "name",      title: "שם המוצר",    type: "string", validation: (R: any) => R.required() },
    { name: "unitPrice", title: "מחיר ליחידה ₪", type: "number", validation: (R: any) => R.required().min(0) },
    { name: "image",     title: "תמונה",        type: "image",  options: { hotspot: true } },
    { name: "available", title: "זמין",         type: "boolean", initialValue: true },
    { name: "order",     title: "סדר תצוגה",   type: "number" },
  ],
};
