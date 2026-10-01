import type { Package, Video, Testimonial, FAQItem, USP } from "./types";
import type { BoxProduct } from "./pricing";

export const CONFIG = {
  // 🔴 REPLACE — real WhatsApp number, international format, no + or dashes
  whatsappNumber: "972525242155",

  // 🔴 REPLACE — get from Google Business Profile dashboard after setup
  googlePlaceId: "YOUR_GOOGLE_PLACE_ID",

  seo: {
    siteUrl: "https://meshek-shusterman.co.il",
    ogImage: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783772618/3_qw4w3h.jpg",
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
    // Catalog — packages feature shot
    catalogFeature: "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783108965/Photo_from_Kfir_grvbgv.jpg",
    // Stand-in on a package card with no photo of its own.
    //
    // A drawing, not a photograph, and that is the whole point: every photo in
    // this project comes from the same shoots as the lychee pictures, and the
    // build environment cannot open any of them to check. Picking one blind
    // put lychee back on nine cards after it had been removed from the site.
    // A drawn parcel cannot be wrong about what it shows.
    //
    // Replaceable without a developer: the "package-fallback" slot in
    // lib/mediaSlots.ts takes a real photo from the Studio whenever there is
    // one worth using.
    packageFallback: "/package-no-photo.svg",
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
      id: "fresh-box-custom",
      name: "מארז תוצרת בהתאמה אישית",
      description: "מארז תוצרת טרייה בהרכב מותאם — ירקות, פירות ועוד, לפי מה שמתאים לכם ולעונה. ריקי בונה יחד איתכם.",
      // Emptied: the photo that shipped here is from the 1 July lychee shoot
      // and shows lychee. The card falls to the drawn stand-in until a real
      // photo of this box is uploaded in the Studio.
      image: "",
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
    heroLine: "מארזים עונתיים — ישירות מהמשק.",
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
      id: "f9",
      question: "מה משמעות 'חקלאי קו העימות'?",
      answer: "חקלאי קו העימות הם חקלאים הגרים ועובדים ביישובי הצפון הצמודים לגבול — אזורים שספגו שנים של אי-ודאות ביטחונית. המשק שלנו נמצא במושב לימן, ואנחנו גאים לשלב במארזים שלנו תוצרת מובחרת של שכנינו ושותפינו לאורך קו הגבול, מתוך ערבות הדדית ורצון לתמוך בחקלאות הצפון.",
    },
    {
      id: "f10",
      question: "האם משק שוסטרמן מספק לנקודות מכירה?",
      answer: "כן — אנחנו מספקים תוצרת חקלאית גם לנקודות מכירה, שווקים ועסקים שרוצים להציע ללקוחותיהם תוצרת ישירות מהשדה. לפרטים ולהצעת מחיר מותאמת — דברו עם ריקי בוואטסאפ.",
    },
    {
      id: "f11",
      question: "האם אפשר לקבל מארז חקלאי כמתנה לחג לעובדים?",
      answer: "בהחלט! מארזי השי של משק שוסטרמן מושלמים לוועדי עובדים ולמתנות חג. אנחנו בונים יחד איתכם מארז הכולל פירות וירקות עונתיים ותוצרת של חקלאי קו הגבול — לפי הכמות, התקציב וטעם הלקוחות שלכם. שלחו לנו הודעה ונבנה יחד.",
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
    // The trading name, not a registered-company name. It said
    // "משק שוסטרמן בע\"מ" while the company number beside it was a
    // placeholder — and it is printed in the footer of every page. Naming
    // yourself a company you may not be registered as is a claim; the
    // trading name is true either way. If the business IS a registered
    // company, the registered name and number belong here, and then the
    // legal pages should say so.
    companyLegalName: "משק שוסטרמן",
    // The number that identifies the business — ח.פ for a company, מספר עוסק
    // for a sole trader. Both the privacy notice and the terms are supposed to
    // identify who is behind the site, and this is the one fact nobody here
    // knows yet; Ricky does.
    //
    // It is EMPTY rather than a placeholder on purpose: every page that shows
    // it checks first and omits the line entirely when it is blank. A missing
    // line is a gap. "ח.פ XXXXXXXXX" published on a live site is a false
    // statement — which is what used to sit here, in dead config nothing read.
    businessId: "",
    address: "מושב לימן, גבול הצפון",
    contactEmail: "meshek.shusterman@gmail.com",
    contactPhone: "052-524-2155",
    accessibilityCoordinator: {
      // Ricky is the coordinator. Only the name lives here: the phone and the
      // e-mail come from the same resolver every other contact point on the
      // site uses, so changing them in the Studio changes them here too.
      // A second copy of a phone number is a legal notice that goes stale
      // without anyone noticing — see docs/decisions.md 38.
      name: "ריקי שוסטרמן",
    },
    lastUpdated: "2026-10-01",
    // Who answers for the details the site collects. Not "בעל מאגר מידע" —
    // that is a term out of the Privacy Protection Law and implies a
    // registered database; the pages now say plainly who to write to.
    dataContactName: "ריקי שוסטרמן",
  },
};
