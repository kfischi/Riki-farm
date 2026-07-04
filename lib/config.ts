import type { Package, Video, Testimonial, FAQItem, USP } from "./types";
import type { BoxProduct } from "./pricing";

export const CONFIG = {
  // 🔴 REPLACE — real WhatsApp number, international format, no + or dashes
  whatsappNumber: "972525242155",

  // 🔴 REPLACE — get from Google Business Profile dashboard after setup
  googlePlaceId: "YOUR_GOOGLE_PLACE_ID",

  seo: {
    // 🔴 REPLACE with real domain before launch
    siteUrl: "https://mashak-shusterman.co.il",
    ogImage: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg",
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
    // Catalog — lychee feature banner
    catalogFeature: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg",
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
      id: "lychee-fresh",
      name: "ליצ'י טרי מהמשק",
      description: "ליצ'י מובחר שנקטף ישירות מהעצים במושב לימן ומגיע אליכם עסיסי, מתוק, וטעים בטירוף.",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0083_i9m3hk.jpg",
      tags: ["ליצ'י", "טרי", "עונתי"],
    },
    {
      id: "lychee-box-corp",
      name: "מארז ליצ'י לחברות",
      description: "מארז ליצ'י טרי בהתאמה אישית לחברות ומשרדים — כמות לפי בקשה, אריזה נקייה ומרשימה. מתנה שאנשים זוכרים.",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0088_bpaxlk.jpg",
      tags: ["ליצ'י", "לחברות"],
    },
    {
      id: "lychee-seasonal",
      name: "סל ליצ'י + תוצרת עונתית",
      description: "ליצ'י טרי לצד מה שהשדה נותן השבוע — פירות וירקות עונתיים ממשק שוסטרמן. מתחדש כל שבוע לפי הגידולים.",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0093_fxwxvw.jpg",
      tags: ["ליצ'י", "עונתי", "מגוון"],
    },
    {
      id: "fresh-box-custom",
      name: "מארז תוצרת בהתאמה אישית",
      description: "מארז תוצרת טרייה בהרכב מותאם — ליצ'י, ירקות, פירות ועוד, לפי מה שמתאים לכם ולעונה. ריקי בונה יחד איתכם.",
      image: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0094_zotxd3.jpg",
      tags: ["מותאם אישית", "טרי"],
    },
  ] as Package[],

  // ===== "מארזים מחקלאים ויצרנים מקו הגבול" — second catalog category =====
  // Sourced from neighboring border-region farmers & producers, alongside Ricky's own packages.
  // Shown both as standalone catalog cards AND as add-on items inside the box builder.
  // 🔴 REPLACE prices and add real Cloudinary photos before go-live
  borderCategoryLabel: "משק שוסטרמן | מארזים מחקלאים ויצרנים מקו הגבול",

  borderPackages: [
    { id: "border-honey-oil",  name: "דבש עם שמן זית",        description: "צנצנת דבש פרחי בר ובקבוק שמן זית כתית מעולה, משני יצרנים בגבול הצפון.", price: "₪65",  image: "", tags: ["מקו הגבול"] },
    { id: "border-bread",      name: "לחם מחמצת עם מטבלים",    description: "לחם מחמצת תוצרת בית עם מבחר מטבלים גלילים — מומלץ לחברה שאוהבת חוויה.",      price: "₪55",  image: "", tags: ["מקו הגבול"] },
    { id: "border-spices",     name: "מתבלים מהצפון",           description: "סט מתבלים יבשים מגידולי קו העימות — תערובות ביתיות ללא תוספות.",            price: "₪40",  image: "", tags: ["מקו הגבול"] },
    { id: "border-honey-tahini", name: "דבש וטחינה",             description: "צנצנת דבש פרחי בר וטחינה גולמית מהרי הצפון — שילוב קלאסי וישראלי.",          price: "₪50",  image: "", tags: ["מקו הגבול"] },
    { id: "border-berries",    name: "מארז פירות יער",          description: "פירות יער טריים מהעונה מגידולי קו העימות — מתנה צבעונית ומפנקת.",            price: "₪60",  image: "", tags: ["מקו הגבול", "עונתי"] },
    { id: "border-orchid",     name: "עציץ סחלב",               description: "עציץ סחלב מטופח מחממות קו הגבול — מתנה מהממת שנשארת.",                       price: "₪70",  image: "", tags: ["מקו הגבול"] },
    { id: "border-red-algae",  name: "מוצרי אצה אדומה",         description: "מוצרי אצה אדומה ממגדלי קו הגבול — תוסף טבעי איכותי.",                        price: "₪80",  image: "", tags: ["מקו הגבול"] },
    { id: "border-candles",    name: "נרות",                    description: "נרות עבודת יד מיצרני קו הגבול — ניחוחות עדינים ועיצוב כפרי.",                price: "₪35",  image: "", tags: ["מקו הגבול"] },
    { id: "border-soaps",      name: "סבונים",                  description: "סבונים טבעיים בעבודת יד מיצרני קו הגבול — ללא חומרים משמרים.",               price: "₪30",  image: "", tags: ["מקו הגבול"] },
  ] as Package[],

  borderProducts: [
    { id: "border-honey-oil",     name: "דבש עם שמן זית",    unitPrice: 65, image: "" },
    { id: "border-bread",         name: "לחם מחמצת עם מטבלים", unitPrice: 55, image: "" },
    { id: "border-spices",        name: "מתבלים מהצפון",      unitPrice: 40, image: "" },
    { id: "border-honey-tahini",  name: "דבש וטחינה",         unitPrice: 50, image: "" },
    { id: "border-berries",       name: "מארז פירות יער",     unitPrice: 60, image: "" },
    { id: "border-orchid",        name: "עציץ סחלב",          unitPrice: 70, image: "" },
    { id: "border-red-algae",     name: "מוצרי אצה אדומה",    unitPrice: 80, image: "" },
    { id: "border-candles",       name: "נרות",               unitPrice: 35, image: "" },
    { id: "border-soaps",         name: "סבונים",             unitPrice: 30, image: "" },
  ] as BoxProduct[],

  about: {
    headline: "החזון של ריקי",
    heroLine: "ליצ'י טרי ומארזים עונתיים — ישירות מהמשק.",
    // Short version for chatbot "info" bubble
    body: "ריקי שוסטרמן היא חקלאית במושב לימן, בגבול הצפון, כ-22 שנה. בוגרת בית הספר החקלאי נהלל במגמת גד\"ש, מחוברת לטבע ולאדמה מאז ומתמיד. הפרויקט של מארז בהתאמה אישית נולד במלחמה, כדי לתת בית לתוצרת שנשארה בלי יציאה ולחבר בין כל אדם לתוצרת המופלאה של חקלאי קו העימות.",
    // Pull quotes for editorial display
    pullQuotes: [
      "חקלאות היא הקיום והבסיס להכל, ובפרט בגבולות הארץ. אמא אדמה.",
      "הרצון שלי להגיע לכל אדם עם התוצרת המופלאה שלנו.",
    ],
    // Full story paragraphs for the about section
    story: [
      "שמי ריקי שוסטרמן, חקלאית ותושבת מושב לימן מזה כ-22 שנה. הזיקה שלי לעולם החקלאות והטבע מלווה אותי מראשית דרכי – החל מלימודיי במגמת גידולי שדה (גד\"ש) בבית הספר החקלאי נהלל, שם התנסיתי לראשונה בעיבוד האדמה ובגידול כותנה כבר בגיל 15. עבורי, החיבור לקרקע אינו רק מקצוע, אלא דרך חיים מושרשת. כיום, יחד עם משפחתי, אני מנהלת משק חקלאי פעיל ומגוון בלימן, מתוך מחויבות עמוקה לפיתוח חקלאות ישראלית איכותית.",
      "\"חקלאות היא הקיום והבסיס להכל, ובפרט בגבולות הארץ — אמא אדמה.\"",
      "איך נולד הרעיון של המארזים?",
      "הפרויקט של המארזים בהתאמה אישית נולד מתוך המציאות של המלחמה. פתאום מצאנו את עצמנו, יחד עם עוד המון חקלאים בצפון, עם שדות מלאים בתוצרת נהדרת שפשוט לא היה איך לשווק אותה. שם עלה לי הרעיון: למה לא לאחד כוחות? החלטנו ליצור מארזים מיוחדים שמשלבים את התוצרת של המשק שלנו יחד עם פירות וירקות מעולים של מגדלים אחרים מקו העימות. המטרה והחלום שלי הם פשוטים: להגיע לכל בית בישראל עם התוצרת המופלאה והטריה שלנו, ולתת לכם ליהנות מחקלאות ישראלית אמיתית.",
    ],
  },

  usps: [
    { icon: "🍈", title: "ליצ'י טרי מהמשק", text: "נקטף ישירות מהעצים במושב לימן, מגיע אליכם תוך שעות" },
    { icon: "🌿", title: "תוצרת עונתית אמיתית", text: "מה שגדל השבוע — מגיע אליכם. בלי מחסן, בלי ביניים" },
    { icon: "🚚", title: "משלוח לכל הארץ", text: "מגבול הצפון ועד הדרום, ישירות אליכם" },
    { icon: "💬", title: "ליווי אישי מריקי", text: "לא בוט, לא מענה אוטומטי — ריקי בעצמה" },
  ] as USP[],

  // Real client WhatsApp feedback — 🔴 confirm first/last names with Ricky before launch
  testimonials: [
    {
      id: "t1",
      quote: "תודה רבה! אין עליכם בעולם! התענגנו פה על כל קלמנטינה ובננה ותפוח, והיה בשפע לכולם.",
      author: "לקוחה מרוצה", // 🔴 REPLACE — confirm real name with Ricky
      role: "משוב מוואטסאפ",
      company: "",
    },
    {
      id: "t2",
      quote: "האיכות הגבוהה מאד של הפירות הוסיפה לאווירה החיובית, כולם נהנו ושמחו.",
      author: "אייל", // 🔴 REPLACE/confirm full name with Ricky
      role: "משוב מוואטסאפ",
      company: "",
    },
    {
      id: "t3",
      quote: "אנשים מאוד התלהבו מהפידבקים על המארזים.",
      author: "לקוחה מרוצה", // 🔴 REPLACE — confirm real name with Ricky
      role: "משוב מוואטסאפ",
      company: "",
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
    {
      id: "f6",
      question: "מתי עונת הליצ'י בישראל?",
      answer: "עונת הליצ'י בישראל נמשכת בדרך כלל בין יוני לאוגוסט, בהתאם לתנאי מזג האוויר. במשק שוסטרמן במושב לימן הקטיף מתחיל בחודש יוני — הליצ'י נקטף בשיא הבשלות ישירות מהעצים.",
    },
    {
      id: "f7",
      question: "מאיפה מגיע הליצ'י של משק שוסטרמן?",
      answer: "הליצ'י גדל ונקטף ישירות מהעצים במשק שוסטרמן, מושב לימן, בגליל המערבי — גבול הצפון. מהשדה ישירות לאריזה ומשם אליכם, בלי ביניים.",
    },
    {
      id: "f8",
      question: "האם משק שוסטרמן שולח ליצ'י לכל הארץ?",
      answer: "כן — אנחנו שולחים ליצ'י טרי ומארזים חקלאיים לכל רחבי ישראל, מגבול הצפון ועד הדרום.",
    },
    {
      id: "f9",
      question: "מה משמעות 'חקלאי קו העימות'?",
      answer: "חקלאי קו העימות הם חקלאים הגרים ועובדים ביישובי הצפון הצמודים לגבול — אזורים שספגו שנים של אי-ודאות ביטחונית. המשק שלנו נמצא במושב לימן, ואנחנו גאים לשלב במארזים שלנו תוצרת מובחרת של שכנינו ושותפינו לאורך קו הגבול, מתוך ערבות הדדית ורצון לתמוך בחקלאות הצפון.",
    },
    {
      id: "f10",
      question: "האם משק שוסטרמן מספק לנקודות מכירה?",
      answer: "כן — אנחנו מספקים ליצ'י טרי ותוצרת חקלאית גם לנקודות מכירה, שווקים ועסקים שרוצים להציע ללקוחותיהם תוצרת ישירות מהשדה. לפרטים ולהצעת מחיר מותאמת — דברו עם ריקי בוואטסאפ.",
    },
    {
      id: "f11",
      question: "האם אפשר לקבל מארז חקלאי כמתנה לחג לעובדים?",
      answer: "בהחלט! מארזי השי של משק שוסטרמן מושלמים לוועדי עובדים ולמתנות חג. אנחנו בונים יחד איתכם מארז הכולל ליצ'י, פירות וירקות עונתיים ותוצרת של חקלאי קו הגבול — לפי הכמות, התקציב וטעם הלקוחות שלכם. שלחו לנו הודעה ונבנה יחד.",
    },
  ] as FAQItem[],

  // B2B social proof — replace with real client logos
  clientLogos: [
    { name: "לובינסקי רפאל", logo: "" }, // 🔴 REPLACE with real logo URL
    { name: "ערוץ 12", logo: "" }, // 🔴 REPLACE with real logo URL
    { name: "הטכניון", logo: "" }, // 🔴 REPLACE with real logo URL
    { name: "ועוד", logo: "" }, // 🔴 REPLACE with another real client logo
  ],

  legal: {
    companyLegalName: "משק שוסטרמן בע\"מ",
    companyId: "ח.פ XXXXXXXXX", // 🔴
    address: "מושב לימן, גבול הצפון", // 🔴 כתובת מלאה
    contactEmail: "meshek.shusterman@gmail.com",
    contactPhone: "052-524-2155",
    accessibilityCoordinator: {
      name: "שם רכז/ת הנגישות", // 🔴
      phone: "0XX-XXXXXXX", // 🔴
      email: "accessibility@example.co.il", // 🔴
    },
    lastUpdated: "2026-05-22",
    privacyOwnerName: "ריקי שוסטרמן", // 🔴 confirm legal name
  },
};
