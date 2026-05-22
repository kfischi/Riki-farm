import type { Package, Video } from "./types";

export const CONFIG = {
  // 🔴 REPLACE — real WhatsApp number, international format, no + or dashes
  whatsappNumber: "9725XXXXXXXX",

  brand: {
    name: "המשק של ריקי",
    tagline: "מארזים חקלאיים יוקרתיים לחברות",
    ownerName: "ריקי",
  },

  // 🔴 REPLACE with real avatar image
  rickyAvatar: "https://placehold.co/100x100/2D6A4F/ffffff?text=ריקי",

  videos: [
    {
      id: "v1",
      title: "ריקי מספרת על המשק",
      thumbnail: "https://placehold.co/320x180/1B4332/E9C46A?text=המשק+של+ריקי",
      url: "https://youtube.com/", // 🔴 REPLACE with real YouTube URL
    },
    {
      id: "v2",
      title: "עונת הקציר במשק",
      thumbnail: "https://placehold.co/320x180/2D6A4F/E9C46A?text=עונת+הקציר",
      url: "https://youtube.com/", // 🔴 REPLACE with real YouTube URL
    },
  ] as Video[],

  packages: [
    {
      id: "holiday",
      name: "מארז החג",
      description: "מבחר עשיר של תוצרת טרייה ומובחרת לכבוד החג — ישירות מהשדה לחברה שלכם",
      price: "₪XXX",
      image: "https://placehold.co/400x300/E9C46A/1B4332?text=מארז+החג",
      tags: ["פופולרי", "עונתי"],
    },
    {
      id: "executive",
      name: "מארז המנהלים",
      description: "מארז יוקרה פרימיום למתנות עסקיות וללקוחות VIP — אריזה מרשימה ומוצרים נבחרים",
      price: "₪XXX",
      image: "https://placehold.co/400x300/BC6C25/ffffff?text=מארז+המנהלים",
      tags: ["יוקרה", "VIP"],
    },
    {
      id: "seasonal",
      name: "מארז העונה",
      description: "תוצרת עונתית נבחרת בשיאה — תפריט שמשתנה עם הטבע ומפתיע בכל פעם",
      price: "₪XXX",
      image: "https://placehold.co/400x300/2D6A4F/E9C46A?text=מארז+העונה",
      tags: ["עונתי", "טרי"],
    },
    {
      id: "team",
      name: "מארז הצוות",
      description: "פתרון מושלם לאירועי חברה ומפגשי צוות — מארזים ב-bulk במחיר אטרקטיבי",
      price: "₪XXX",
      image: "https://placehold.co/400x300/1B4332/FAF9F6?text=מארז+הצוות",
      tags: ["bulk", "חסכוני"],
    },
  ] as Package[],

  about: {
    headline: "החזון של ריקי",
    body: "המשק של ריקי נוסד מתוך אהבה אמיתית לאדמה ולתוצרת הטבעית. אנחנו מאמינים שמתנה אמיתית היא כזו שמגיעה ישירות מהשדה — טרייה, איכותית, ומכינה רגע של שמחה. אנחנו מספקים מארזים חקלאיים יוקרתיים לחברות מהמובילות במשק, עם שירות אישי ותשומת לב לכל פרט.",
  },

  legal: {
    companyLegalName: "המשק של ריקי בע\"מ", // 🔴 שם משפטי מדויק
    companyId: "ח.פ XXXXXXXXX", // 🔴
    address: "כתובת מלאה, עיר, מיקוד", // 🔴
    contactEmail: "info@example.co.il", // 🔴
    contactPhone: "0XX-XXXXXXX", // 🔴
    accessibilityCoordinator: {
      name: "שם רכז/ת הנגישות", // 🔴
      phone: "0XX-XXXXXXX", // 🔴
      email: "accessibility@example.co.il", // 🔴
    },
    lastUpdated: "2026-05-22",
    privacyOwnerName: "שם בעל/ת מאגר המידע", // 🔴 תיקון 13
  },
};
