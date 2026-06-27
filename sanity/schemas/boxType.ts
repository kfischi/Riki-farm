// Sanity Studio schema — סוג קופסה (box type for Box Builder)
export const boxTypeSchema = {
  name: "boxType",
  title: "סוג קופסה",
  type: "document",
  fields: [
    { name: "id",        title: "מזהה",        type: "slug",   validation: (R: any) => R.required(), options: { source: "name" } },
    { name: "name",      title: "שם הקופסה",   type: "string", validation: (R: any) => R.required() },
    { name: "basePrice", title: "מחיר בסיס ₪", type: "number", validation: (R: any) => R.required().min(0) },
    { name: "image",     title: "תמונה",        type: "image",  options: { hotspot: true } },
    { name: "order",     title: "סדר תצוגה",   type: "number" },
  ],
};
