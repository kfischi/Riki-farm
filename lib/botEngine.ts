import { CONFIG } from "./config";
import type { BotState, MessageType, Order, QuickReply, Step } from "./types";

let _counter = 0;
export function newId(): string {
  return `msg-${++_counter}`;
}

export const REGIONS: QuickReply[] = [
  { label: "צפון", value: "צפון" },
  { label: "חיפה והקריות", value: "חיפה והקריות" },
  { label: "השרון", value: "השרון" },
  { label: "מרכז / גוש דן", value: "מרכז / גוש דן" },
  { label: "ירושלים והסביבה", value: "ירושלים והסביבה" },
  { label: "שפלה", value: "שפלה" },
  { label: "דרום", value: "דרום" },
  { label: "אילת והערבה", value: "אילת והערבה" },
];

const LYCHEE_QUANTITIES: QuickReply[] = [
  { label: "1-2 ק\"ג", value: "1-2 ק\"ג" },
  { label: "5 ק\"ג", value: "5 ק\"ג" },
  { label: "10 ק\"ג", value: "10 ק\"ג" },
  { label: "20 ק\"ג", value: "20 ק\"ג" },
  { label: "כמות אחרת", value: "כמות אחרת" },
];

const MAIN_MENU_REPLIES: QuickReply[] = [
  { label: "🍒 הזמנת ליצ'י טרי", value: "lychee" },
  { label: "📦 מארז שי ותוצרת חקלאית", value: "order" },
  { label: "ℹ️ ספר/י לי עוד על המשק", value: "info" },
];

export function mainMenuMessage(): MessageType {
  return {
    id: newId(),
    sender: "bot",
    type: "quick-replies",
    text: "שלום! 🍒 ממשק שוסטרמן במושב לימן.\nאנחנו בעיצומה של עונת הליצ'י — נקטף ישירות מהשדה ומגיע אליכם טרי.\nמה תרצה/י?",
    replies: MAIN_MENU_REPLIES,
  };
}

function buildWhatsappUrl(order: Order): string {
  const lines = [
    "שלום ריקי! 👋 אשמח להזמין:",
    `שם: ${order.name ?? "—"}`,
    `חברה/עסק: ${order.company ?? "—"}`,
    `אזור: ${order.region ?? "—"}`,
    `כתובת: ${order.address ?? "—"}`,
    `אימייל: ${order.email ?? "—"}`,
    `טלפון: ${order.phone ?? "—"}`,
    `מארז: ${order.pkg ?? "—"}`,
    `כמות: ${order.quantity ?? "—"}`,
  ].join("\n");
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines)}`;
}

function buildLycheeWhatsappUrl(order: Order): string {
  const lines = [
    "שלום ריקי! 🍒 אשמח להזמין ליצ'י:",
    `שם: ${order.name ?? "—"}`,
    `טלפון: ${order.phone ?? "—"}`,
    `כמות: ${order.lycheeQty ?? "—"}`,
  ].join("\n");
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines)}`;
}

// ===== Validators (pure, unit-testable) =====
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidIsraeliPhone(phone: string): boolean {
  const stripped = phone.replace(/[\s\-]/g, "");
  return /^0(5\d|[2-4]|[7-9]\d?)\d{7}$/.test(stripped);
}

export function isPositiveInt(val: string): boolean {
  const n = Number(val.trim());
  return Number.isInteger(n) && n > 0;
}

export interface BotResponseResult {
  messages: MessageType[];
  nextStep: Step;
  orderPatch: Partial<Order>;
}

export function getBotResponse(state: BotState, input: string): BotResponseResult {
  const trimmed = input.trim();
  let messages: MessageType[] = [];
  let nextStep: Step = state.step;
  let orderPatch: Partial<Order> = {};

  // Global back-to-menu
  if (["menu", "תפריט", "חזרה לתפריט", "reset"].includes(trimmed)) {
    return { messages: [mainMenuMessage()], nextStep: "idle", orderPatch: {} };
  }

  switch (state.step) {
    case "idle": {
      if (trimmed === "lychee" || trimmed.includes("ליצ'י") || trimmed.includes("ליצי")) {
        messages = [{
          id: newId(), sender: "bot", type: "quick-replies",
          text: "מעולה! 🍒 ליצ'י טרי ישירות מהשדה.\nכמה ק\"ג תרצה/י?",
          replies: LYCHEE_QUANTITIES,
        }];
        nextStep = "lychee_quantity";
      } else if (trimmed === "order" || trimmed.includes("להזמין") || trimmed.includes("הזמנה") || trimmed.includes("מארז")) {
        messages = [{
          id: newId(), sender: "bot", type: "text",
          text: "נהדר! 🎉 בוא/י נמלא פרטים קצרים.\n\n📝 הפרטים שתמסור/תמסרי ישמשו ליצירת קשר בלבד · [מדיניות פרטיות](/privacy)\n\nמה שמך המלא?",
        }];
        nextStep = "order_name";
      } else if (trimmed === "info" || trimmed.includes("מידע") || trimmed.includes("אודות")) {
        messages = [
          { id: newId(), sender: "bot", type: "text", text: `*${CONFIG.about.headline}*\n\n${CONFIG.about.body}` },
          { id: newId(), sender: "bot", type: "quick-replies", text: "מעניין? הנה מה שאפשר לעשות:", replies: MAIN_MENU_REPLIES },
        ];
        nextStep = "info";
      } else if (trimmed === "videos" || trimmed.includes("סרטון")) {
        messages = [
          { id: newId(), sender: "bot", type: "video-link", videos: CONFIG.videos },
          { id: newId(), sender: "bot", type: "quick-replies", text: "אהבת?", replies: MAIN_MENU_REPLIES },
        ];
        nextStep = "videos";
      } else if (trimmed === "catalog" || trimmed.includes("קטלוג")) {
        messages = [
          { id: newId(), sender: "bot", type: "catalog-cards", packages: CONFIG.packages },
          { id: newId(), sender: "bot", type: "quick-replies", text: "מצא/ה משהו שאהבת?", replies: MAIN_MENU_REPLIES },
        ];
        nextStep = "catalog";
      } else {
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: "לא הבנתי לגמרי 😊 הנה מה שאפשר:", replies: MAIN_MENU_REPLIES }];
      }
      break;
    }

    // ===== Lychee quick-order flow =====
    case "lychee_quantity": {
      orderPatch = { lycheeQty: trimmed };
      messages = [{ id: newId(), sender: "bot", type: "text", text: `${trimmed} ק"ג — מצוין! 🍒\nמה שמך המלא?` }];
      nextStep = "lychee_name";
      break;
    }

    case "lychee_name": {
      if (!trimmed) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "אנא הכנס/י את שמך המלא 🙂" }];
      } else {
        orderPatch = { name: trimmed };
        messages = [{ id: newId(), sender: "bot", type: "text", text: `נעים, ${trimmed}! 📱\nמה מספר הטלפון שלך לתיאום?` }];
        nextStep = "lychee_phone";
      }
      break;
    }

    case "lychee_phone": {
      if (!isValidIsraeliPhone(trimmed)) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "הפורמט לא נראה תקין.\nדוגמה: 050-1234567 📱" }];
      } else {
        const cleanPhone = trimmed.replace(/[\s\-]/g, "");
        orderPatch = { phone: cleanPhone };
        const newOrder = { ...state.order, ...orderPatch };
        const href = buildLycheeWhatsappUrl(newOrder);
        const summaryText = [
          "📋 סיכום הבקשה:",
          "",
          `🍒 ליצ'י: ${newOrder.lycheeQty}`,
          `👤 שם: ${newOrder.name}`,
          `📱 טלפון: ${cleanPhone}`,
        ].join("\n");
        messages = [
          { id: newId(), sender: "bot", type: "text", text: "מעולה! 🙏 הנה סיכום הבקשה:" },
          { id: newId(), sender: "bot", type: "whatsapp-cta", href, summaryText },
        ];
        nextStep = "order_confirm";
      }
      break;
    }

    // ===== Shared post-flow states =====
    case "videos":
    case "info":
    case "catalog": {
      if (trimmed === "lychee" || trimmed.includes("ליצ'י")) {
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: "כמה ק\"ג ליצ'י תרצה/י?", replies: LYCHEE_QUANTITIES }];
        nextStep = "lychee_quantity";
      } else if (trimmed === "order" || trimmed.includes("להזמין")) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "נהדר! בוא/י נמלא פרטים קצרים.\n\n📝 הפרטים שתמסור/תמסרי ישמשו ליצירת קשר בלבד · [מדיניות פרטיות](/privacy)\n\nמה שמך המלא?" }];
        nextStep = "order_name";
      } else {
        messages = [mainMenuMessage()];
        nextStep = "idle";
      }
      break;
    }

    // ===== B2B package order flow =====
    case "order_name": {
      if (!trimmed) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "אנא הכנס/י את שמך המלא 🙂" }];
      } else {
        orderPatch = { name: trimmed };
        messages = [{ id: newId(), sender: "bot", type: "text", text: `נעים להכיר, ${trimmed}! 😊\nמה שם החברה או העסק?` }];
        nextStep = "order_company";
      }
      break;
    }

    case "order_company": {
      if (!trimmed) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "אנא הכנס/י את שם החברה או העסק 🏢" }];
      } else {
        orderPatch = { company: trimmed };
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: `מעולה! 🌿 באיזה אזור בארץ אתם נמצאים?`, replies: REGIONS }];
        nextStep = "order_region";
      }
      break;
    }

    case "order_region": {
      const regionVal = trimmed || "—";
      orderPatch = { region: regionVal };
      messages = [{ id: newId(), sender: "bot", type: "text", text: `${regionVal} — מצוין! 📍\nמה כתובת החברה/העסק? (רחוב, מספר, עיר)` }];
      nextStep = "order_address";
      break;
    }

    case "order_address": {
      if (!trimmed) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "אנא הכנס/י כתובת: רחוב, מספר, עיר 🏠" }];
      } else {
        orderPatch = { address: trimmed };
        messages = [{ id: newId(), sender: "bot", type: "text", text: "תודה! 📧\nמה כתובת האימייל שלך ליצירת קשר?" }];
        nextStep = "order_email";
      }
      break;
    }

    case "order_email": {
      if (!isValidEmail(trimmed)) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "כתובת האימייל לא נראית תקינה.\nדוגמה: name@company.co.il 📧" }];
      } else {
        orderPatch = { email: trimmed.toLowerCase() };
        messages = [{ id: newId(), sender: "bot", type: "text", text: "מצוין! 📱\nמה מספר הטלפון שלך לחזרה?" }];
        nextStep = "order_phone";
      }
      break;
    }

    case "order_phone": {
      if (!isValidIsraeliPhone(trimmed)) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "הפורמט לא נראה תקין.\nדוגמה: 050-1234567 📱" }];
      } else {
        const cleanPhone = trimmed.replace(/[\s\-]/g, "");
        orderPatch = { phone: cleanPhone };
        const packageReplies: QuickReply[] = CONFIG.packages.map((p) => ({ label: p.name, value: p.id }));
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: `תענוג! 🎁 איזה מארז מעניין אותך?`, replies: packageReplies }];
        nextStep = "order_package";
      }
      break;
    }

    case "order_package": {
      const found = CONFIG.packages.find((p) => p.id === trimmed || p.name === trimmed);
      if (!found) {
        const packageReplies: QuickReply[] = CONFIG.packages.map((p) => ({ label: p.name, value: p.id }));
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: "אנא בחר/י אחד מהמארזים:", replies: packageReplies }];
      } else {
        orderPatch = { pkg: found.name };
        messages = [{ id: newId(), sender: "bot", type: "text", text: `${found.name} — בחירה מצוינת! 🌿\nכמה מארזים אתם צריכים?` }];
        nextStep = "order_quantity";
      }
      break;
    }

    case "order_quantity": {
      if (!isPositiveInt(trimmed)) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "אנא הכנס/י מספר שלם וחיובי (לדוגמה: 10, 50, 100) 🔢" }];
      } else {
        const qty = parseInt(trimmed, 10);
        orderPatch = { quantity: qty };
        messages = [{
          id: newId(), sender: "bot", type: "quick-replies",
          text: `${qty} מארזים — מושלם! 📦\n\nלפני שנשלח — אנא אשר/י שקראת את [מדיניות הפרטיות](/privacy) שלנו.\nהפרטים שמסרת ישמשו ליצירת קשר ולטיפול בבקשה בלבד.`,
          replies: [
            { label: "✅ אני מאשר/ת ושולח/ת", value: "consent_yes" },
            { label: "↩️ חזרה לתפריט", value: "menu" },
          ],
        }];
        nextStep = "order_consent";
      }
      break;
    }

    case "order_consent": {
      if (trimmed === "consent_yes" || trimmed === "✅ אני מאשר/ת ושולח/ת") {
        orderPatch = { consent: true };
        const newOrder = { ...state.order, ...orderPatch };
        const href = buildWhatsappUrl(newOrder);
        const summaryText = [
          "📋 סיכום ההזמנה:",
          "",
          `👤 שם: ${newOrder.name}`,
          `🏢 חברה: ${newOrder.company}`,
          `📍 אזור: ${newOrder.region}`,
          `🏠 כתובת: ${newOrder.address}`,
          `📧 אימייל: ${newOrder.email}`,
          `📱 טלפון: ${newOrder.phone}`,
          `📦 מארז: ${newOrder.pkg}`,
          `🔢 כמות: ${newOrder.quantity}`,
        ].join("\n");
        messages = [
          { id: newId(), sender: "bot", type: "text", text: "תודה! 🙏 הנה סיכום הבקשה שלך:" },
          { id: newId(), sender: "bot", type: "whatsapp-cta", href, summaryText },
        ];
        nextStep = "order_confirm";
      } else {
        messages = [mainMenuMessage()];
        nextStep = "idle";
      }
      break;
    }

    case "order_confirm": {
      messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: "האם תרצה/י לחזור לתפריט הראשי?", replies: [{ label: "🏠 חזרה לתפריט", value: "menu" }] }];
      nextStep = "idle";
      break;
    }

    default: {
      messages = [mainMenuMessage()];
      nextStep = "idle";
    }
  }

  return { messages, nextStep, orderPatch };
}

export function getWelcomeMessages(): MessageType[] {
  return [mainMenuMessage()];
}
