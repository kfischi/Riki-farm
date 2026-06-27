import type { Package, Video, Testimonial, FAQItem, USP } from "./types";

export const CONFIG = {
  // 🔴 REPLACE — real WhatsApp number, international format, no + or dashes
  whatsappNumber: "972525242155",

  // 🔴 REPLACE — get from Google Business Profile dashboard after setup
  googlePlaceId: "YOUR_GOOGLE_PLACE_ID",

  seo: {
    // 🔴 REPLACE with real domain before launch
    siteUrl: "https://mashak-shusterman.co.il",
    ogImage: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780053629/Gemini_Generated_Image_fu702yfu702yfu70_v41c7p.png",
  },

  brand: {
    name: "משק שוסטרמן",
    tagline: "זו לא רק חקלאות. זו דרך חיים. זו שליחות.",
    ownerName: "ריקי שוסטרמן",
    ownerTitle: "חקלאית, מושב לימן, גבול הצפון",
  },

  rickyAvatar: "https://res.cloudinary.com/dptyfvwyo/image/upload/c_thumb,g_face,w_400,h_400,r_max,f_auto,q_auto/v1780033949/%D7%A4%D7%A8%D7%95%D7%A4%D7%99%D7%9C_c4mdpc.png",

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
    catalogFeature: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780053629/Gemini_Generated_Image_fu702yfu702yfu70_v41c7p.png",
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
      id: "custom-box-1",
      name: "מארז תוצרת גלילית",
      description: "מארז בהתאמה אישית — התכולה משתנה לפי גידולי העונה הטרייה. דוגמה: לחם מחמצת עם ממרחים גלילים עשויים בעבודת יד.",
      price: "₪120",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/4_jnhksq.jpg",
      tags: ["מותאם אישית", "מתנה"],
    },
    {
      id: "custom-bag-small",
      name: "סל קטן מהמשק",
      description: "סל ירקות ופירות טריים בהתאמה אישית — מה שגדל השבוע, מגיע אליכם. מושלם לעובד אחד או כמתנה קטנה.",
      price: "₪50",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/2_gq21ly.jpg",
      tags: ["קטן", "טרי"],
    },
    {
      id: "custom-care",
      name: "מארז טיפוח גלילי",
      description: "מארז טיפוח בהתאמה אישית — שילוב תוצרת המשק עם מוצרי טיפוח גלילים. מותאם לפי בקשה ולפי העונה.",
      price: "₪120",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/3_hh1piz.jpg",
      tags: ["יוקרה", "טיפוח"],
    },
    {
      id: "custom-box-2",
      name: "ארגז תוצרת גלילית",
      description: "ארגז ירקות ופירות בהתאמה אישית — מה שהשדה נותן הפעם. מושלם למשרדים, לאירועי צוות ולמתנות bulk.",
      price: "₪120",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780002086/1_suo2t3.jpg",
      tags: ["עונתי", "bulk"],
    },
  ] as Package[],

  about: {
    headline: "החזון של ריקי",
    heroLine: "זו לא רק חקלאות. זו דרך חיים. זו שליחות.",
    // Short version for chatbot "info" bubble
    body: "ריקי שוסטרמן היא חקלאית מדור שלישי ממושב לימן בגבול הצפון. היא מאמינה שאוכל טוב מתחיל ביושרה — ביחסים אמיתיים בין האדם לאדמה. משק שוסטרמן מספק מארזים חקלאיים יוקרתיים לחברות שמחפשות מתנה שאומרת משהו אמיתי.",
    // Pull quotes for editorial display
    pullQuotes: [
      "עבורי חקלאות היא לא מקצוע — היא שליחות.",
      "להחזיר את האמון בין אנשים לאוכל שהם צורכים.",
    ],
    // Full story paragraphs for the about section
    story: [
      "ריקי שוסטרמן גדלה במושב לימן, בגבול הצפון, שם החקלאות היא לא בחירה — היא גורל, מורשת, ואהבה. דור שלישי לאדמה, היא ינקה את הקשר לטבע עוד לפני שידעה להגדיר אותו.",
      "\"עבורי חקלאות היא לא מקצוע — היא שליחות. להחזיר את האמון בין אנשים לאוכל שהם צורכים. לדעת מי גידל את האוכל שלך, איך, ומאיזה אדמה.\"",
      "משק שוסטרמן נולד מתוך הרצון הזה: לחבר בין חברות ואנשים לתוצרת חקלאית אמיתית, עם פנים ועם סיפור. כל מארז שיוצא מהמשק נושא איתו חתיכה מהאדמה הזו.",
    ],
  },

  usps: [
    { icon: "🌾", title: "תוצרת טרייה מהשדה", text: "נקטף ונארז בתוך ימים, לא שבועות" },
    { icon: "🎁", title: "התאמה אישית מלאה", text: "כל מארז נבנה לפי הצרכים והתקציב שלכם" },
    { icon: "🚚", title: "משלוח לכל הארץ", text: "מהצפון ועד הדרום, ישירות אליכם" },
    { icon: "💬", title: "ליווי אישי מריקי", text: "לא בוט, לא מענה אוטומטי — ריקי בעצמה" },
  ] as USP[],

  // 🔴 REPLACE with real client testimonials before go-live
  testimonials: [
    {
      id: "t1",
      quote: "המארזים של ריקי הפכו למתנת החג הקבועה שלנו לעובדים. כל שנה מבקשים שוב.",
      author: "מיכל לוי",
      role: "מנהלת רווחה",
      company: "חברת הייטק, תל אביב",
    },
    {
      id: "t2",
      quote: "תקשורת מהירה, התאמה מדויקת לתקציב, ואיכות שאי אפשר להשיג בסופר. ממליצים בחום.",
      author: "אבי כהן",
      role: "מנהל רכש",
      company: "חברת ביטוח",
    },
    {
      id: "t3",
      quote: "ריקי ליוותה אותנו מהשיחה הראשונה ועד המשלוח. הרגשנו שמדברים עם אדם, לא עם ספק.",
      author: "דנה שמש",
      role: "HR Business Partner",
      company: "סטארטאפ פינטק",
    },
  ] as Testimonial[],

  // 🔴 Review answers before go-live
  faq: [
    {
      id: "f1",
      question: "מה זמן האספקה למארז מותאם?",
      answer: "בממוצע 5–7 ימי עסקים ממועד אישור ההזמנה, בהתאם לעונה ולכמות. למארזים גדולים מומלץ להזמין מראש.",
    },
    {
      id: "f2",
      question: "האם אפשר להתאים מארז לפי תקציב מסוים?",
      answer: "בהחלט — זו בדיוק הדרך שבה אנחנו עובדים. ספרו לנו את התקציב הרצוי ונבנה מארז שמתאים לו בדיוק.",
    },
    {
      id: "f3",
      question: "יש הנחה לכמות גדולה (50+ מארזים)?",
      answer: "כן, יש מדרגות הנחה לפי כמות. דברו עם ריקי בוואטסאפ לקבלת הצעת מחיר מדויקת.",
    },
    {
      id: "f4",
      question: "איך מתבצע התשלום?",
      answer: "לאחר אישור ההצעה והכמות נשלח חשבונית/הזמנת עבודה. ניתן לשלם בהעברה בנקאית או באמצעי תשלום מוסכם אחר.",
    },
    {
      id: "f5",
      question: "אפשר לקבל דוגמה לפני הזמנה גדולה?",
      answer: "כן — אנחנו מאפשרים מארז דוגמה במחיר מסובסד עבור הזמנות bulk, כדי שתוכלו להתרשם לפני ההחלטה הסופית.",
    },
  ] as FAQItem[],

  // B2B social proof — replace with real client logos
  clientLogos: [
    { name: "חברה א׳", logo: "" }, // 🔴 REPLACE with real logo URLs
    { name: "חברה ב׳", logo: "" },
    { name: "חברה ג׳", logo: "" },
    { name: "חברה ד׳", logo: "" },
  ],

  legal: {
    companyLegalName: "משק שוסטרמן בע\"מ",
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
