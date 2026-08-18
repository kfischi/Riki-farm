// Sanity Studio schema — הגדרות האתר (singleton)
import { BANNER_COLOR_OPTIONS, LIMITS, type Rule } from "./constants";

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
        {
          name: "headline",
          title: "כותרת",
          type: "string",
          validation: (R: Rule) =>
            R.max(LIMITS.headline).warning(`מומלץ עד ${LIMITS.headline} תווים — כותרת ארוכה עלולה לשבור את העיצוב`),
        },
        {
          name: "body",
          title: "טקסט",
          type: "text",
          validation: (R: Rule) =>
            R.max(LIMITS.aboutBody).warning(`מומלץ עד ${LIMITS.aboutBody} תווים`),
        },
      ],
    },
    {
      name: "hero",
      title: "הירו (כותרת ראשית)",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "כותרת ראשית",
          type: "string",
          description: "הכותרת הגדולה בראש העמוד",
          validation: (R: Rule) =>
            R.max(LIMITS.headline).warning(`מומלץ עד ${LIMITS.headline} תווים — כותרת ארוכה עלולה לשבור את העיצוב`),
        },
        {
          name: "tagline",
          title: "תת-כותרת",
          type: "string",
          validation: (R: Rule) =>
            R.max(LIMITS.tagline).warning(`מומלץ עד ${LIMITS.tagline} תווים`),
        },
        {
          name: "ctaLabel",
          title: "טקסט הכפתור",
          type: "string",
          validation: (R: Rule) =>
            R.max(LIMITS.ctaLabel).warning(`מומלץ עד ${LIMITS.ctaLabel} תווים — טקסט ארוך לא ייכנס בכפתור`),
        },
        {
          name: "ctaHref",
          title: "לאן הכפתור מוביל",
          type: "string",
          description: 'קישור מלא (https://...) או עוגן בעמוד (לדוגמה: #catalog)',
        },
      ],
    },
    {
      name: "contact",
      title: "פרטי יצירת קשר",
      type: "object",
      fields: [
        {
          name: "phone",
          title: "טלפון",
          type: "string",
          description: "כפי שיוצג באתר, לדוגמה: 052-524-2155",
        },
        {
          name: "whatsapp",
          title: "מספר וואטסאפ",
          type: "string",
          description: "בפורמט בינלאומי, ספרות בלבד וללא + או מקפים. לדוגמה: 972525242155",
        },
        {
          name: "email",
          title: "אימייל",
          type: "string",
        },
      ],
    },
    {
      name: "banner",
      title: "באנר הודעה (אופציונלי)",
      type: "object",
      fields: [
        { name: "visible", title: "מוצג", type: "boolean", initialValue: false },
        {
          name: "text",
          title: "טקסט",
          type: "string",
          validation: (R: Rule) =>
            R.max(LIMITS.bannerText).warning(`מומלץ עד ${LIMITS.bannerText} תווים — הבאנר הוא שורה אחת`),
        },
        {
          name: "color",
          title: "צבע רקע",
          type: "string",
          description: "בחרו מתוך צבעי המותג",
          options: { list: BANNER_COLOR_OPTIONS },
        },
        {
          name: "expiresAt",
          title: "תאריך סיום הצגה",
          type: "datetime",
          description: "אחרי המועד הזה הבאנר יפסיק להופיע. השאירו ריק כדי שיוצג ללא הגבלה.",
        },
      ],
    },
  ],
  preview: {
    select: { title: "hero.headline", subtitle: "about.headline" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "הגדרות האתר",
        subtitle: subtitle || "כותרות, אודות, יצירת קשר ובאנר",
      };
    },
  },
};
