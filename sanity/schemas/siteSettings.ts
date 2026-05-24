// Sanity Studio schema — הגדרות האתר (singleton)
export const siteSettingsSchema = {
  name: "siteSettings",
  title: "הגדרות האתר",
  type: "document",
  fields: [
    {
      name: "about",
      title: "אודות המשק",
      type: "object",
      fields: [
        { name: "headline", title: "כותרת", type: "string" },
        { name: "body",     title: "טקסט",  type: "text" },
      ],
    },
    {
      name: "hero",
      title: "הירו (כותרת ראשית)",
      type: "object",
      fields: [
        { name: "tagline",     title: "תת-כותרת",    type: "string" },
        { name: "ctaLabel",    title: "טקסט הכפתור", type: "string" },
      ],
    },
    {
      name: "banner",
      title: "באנר הודעה (אופציונלי)",
      type: "object",
      fields: [
        { name: "visible", title: "מוצג",   type: "boolean", initialValue: false },
        { name: "text",    title: "טקסט",   type: "string" },
        { name: "color",   title: "צבע רקע (Tailwind class)", type: "string", description: "לדוגמה: bg-wheat" },
      ],
    },
  ],
};
