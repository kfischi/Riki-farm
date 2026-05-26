import type { Package, Video } from "./types";

export const CONFIG = {
  // 🔴 REPLACE — real WhatsApp number, international format, no + or dashes
  whatsappNumber: "972525242155",

  brand: {
    name: "המשק של ריקי",
    tagline: "זו לא רק חקלאות. זו דרך חיים. זו שליחות.",
    ownerName: "ריקי שוסטרמן",
    ownerTitle: "חקלאית, מושב לימן, גבול הצפון",
  },

  // 🔴 Optional: replace with a real cropped headshot
  rickyAvatar: "https://placehold.co/100x100/2D6A4F/ffffff?text=ריקי",

  // ===== REAL PHOTOS (Cloudinary CDN) =====
  // ⚠️ Verify the tractor photo (aboutNorth) is not AI-processed before go-live.
  images: {
    // Hero — golden-hour, dynamic (nuts falling). Use SPLIT layout on desktop.
    hero: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651767/16_sipmwd.jpg",
    // About — greenhouse, authentic working-farmer feel
    aboutPrimary: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651765/2_cypuwa.jpg",
    // About — tractor + northern hills (ties to the גבול הצפון story)
    // ⚠️ VERIFY: may be AI-processed — see README
    aboutNorth: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651766/10_pnpgo5.jpg",
    // Catalog — produce crate / fruit in hand
    catalogFeature: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1779651766/9_qckiss.jpg",
  },

  videos: [
    {
      id: "v1",
      title: "ריקי מספרת על המשק",
      thumbnail: "https://placehold.co/320x180/1B4332/E9C46A?text=המשק+של+ריקי",
      url: "https://youtube.com/", // 🔴 REPLACE
    },
    {
      id: "v2",
      title: "עונת הקציר במשק",
      thumbnail: "https://placehold.co/320x180/2D6A4F/E9C46A?text=עונת+הקציר",
      url: "https://youtube.com/", // 🔴 REPLACE
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
    heroLine: "זו לא רק חקלאות. זו דרך חיים. זו שליחות.",
    // Short version for chatbot "info" bubble
    body: "ריקי שוסטרמן היא חקלאית מדור שלישי ממושב לימן בגבול הצפון. היא מאמינה שאוכל טוב מתחיל ביושרה — ביחסים אמיתיים בין האדם לאדמה. המשק של ריקי מספק מארזים חקלאיים יוקרתיים לחברות שמחפשות מתנה שאומרת משהו אמיתי.",
    // Pull quotes for editorial display
    pullQuotes: [
      "עבורי חקלאות היא לא מקצוע — היא שליחות.",
      "להחזיר את האמון בין אנשים לאוכל שהם צורכים.",
    ],
    // Full story paragraphs for the about section
    story: [
      "ריקי שוסטרמן גדלה במושב לימן, בגבול הצפון, שם החקלאות היא לא בחירה — היא גורל, מורשת, ואהבה. דור שלישי לאדמה, היא ינקה את הקשר לטבע עוד לפני שידעה להגדיר אותו.",
      "\"עבורי חקלאות היא לא מקצוע — היא שליחות. להחזיר את האמון בין אנשים לאוכל שהם צורכים. לדעת מי גידל את האוכל שלך, איך, ומאיזה אדמה.\"",
      "המשק של ריקי נולד מתוך הרצון הזה: לחבר בין חברות ואנשים לתוצרת חקלאית אמיתית, עם פנים ועם סיפור. כל מארז שיוצא מהמשק נושא איתו חתיכה מהאדמה הזו.",
    ],
  },

  // B2B social proof — replace with real client logos
  clientLogos: [
    { name: "חברה א׳", logo: "" }, // 🔴 REPLACE with real logo URLs
    { name: "חברה ב׳", logo: "" },
    { name: "חברה ג׳", logo: "" },
    { name: "חברה ד׳", logo: "" },
  ],

  legal: {
    companyLegalName: "המשק של ריקי בע\"מ",
    companyId: "ח.פ XXXXXXXXX", // 🔴
    address: "מושב לימן, גבול הצפון", // 🔴 כתובת מלאה
    contactEmail: "info@example.co.il", // 🔴
    contactPhone: "0XX-XXXXXXX", // 🔴
    accessibilityCoordinator: {
      name: "שם רכז/ת הנגישות", // 🔴
      phone: "0XX-XXXXXXX", // 🔴
      email: "accessibility@example.co.il", // 🔴
    },
    lastUpdated: "2026-05-22",
    privacyOwnerName: "ריקי שוסטרמן", // 🔴 confirm legal name
  },
};
