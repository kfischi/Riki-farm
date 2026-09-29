import { CONFIG } from "./config";
import { resolveWhatsapp } from "./contact";
import type { BotState, MessageType, Order, Package, QuickReply, Step } from "./types";

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

const MAIN_MENU_REPLIES: QuickReply[] = [
  { label: "📦 מארז שי לחברה / ועד עובדים", value: "order" },
  { label: "🧺 קטלוג המארזים", value: "catalog" },
];

export function mainMenuMessage(): MessageType {
  return {
    id: newId(),
    sender: "bot",
    type: "quick-replies",
    text: "שלום! 👋 ממשק שוסטרמן במושב לימן.\nמה תרצה/י?",
    replies: MAIN_MENU_REPLIES,
  };
}

function buildWhatsappUrl(order: Order, whatsapp: string): string {
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
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines)}`;
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

/**
 * Content the bot answers with. Every key is optional and falls back to the
 * copy the site ships with, so the bot keeps working when the CMS is silent.
 */
export interface BotContent {
  packages?: Package[];
  about?: { headline?: string; body?: string };
  /** The Studio's WhatsApp number. The bot hands the order off over WhatsApp,
   *  so a stale number here loses the order at the last step. */
  whatsapp?: string;
}

export function getBotResponse(
  state: BotState,
  input: string,
  content: BotContent = {},
): BotResponseResult {
  const packages = content.packages?.length ? content.packages : CONFIG.packages;
  const aboutHeadline = content.about?.headline?.trim() || CONFIG.about.headline;
  const aboutBody = content.about?.body?.trim() || CONFIG.about.body;
  const waNumber = resolveWhatsapp(content.whatsapp);
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
      if (trimmed === "order" || trimmed.includes("להזמין") || trimmed.includes("הזמנה") || trimmed.includes("מארז")) {
        messages = [{
          id: newId(), sender: "bot", type: "text",
          text: "נהדר! 🎉 בוא/י נמלא פרטים קצרים.\nמה שמך המלא?",
        }];
        nextStep = "order_name";
      } else if (trimmed === "info" || trimmed.includes("מידע") || trimmed.includes("אודות")) {
        messages = [
          { id: newId(), sender: "bot", type: "text", text: `*${aboutHeadline}*\n\n${aboutBody}` },
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
          { id: newId(), sender: "bot", type: "catalog-cards", packages },
          { id: newId(), sender: "bot", type: "quick-replies", text: "מצא/ה משהו שאהבת?", replies: MAIN_MENU_REPLIES },
        ];
        nextStep = "catalog";
      } else if (trimmed === "whatsapp") {
        const href = `https://wa.me/${waNumber}`;
        messages = [{ id: newId(), sender: "bot", type: "whatsapp-cta", href, summaryText: "לחצו לפתיחת שיחה עם ריקי ישירות בוואטסאפ 💬" }];
        nextStep = "idle";
      } else {
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: "לא הבנתי לגמרי 😊 הנה מה שאפשר:", replies: MAIN_MENU_REPLIES }];
      }
      break;
    }

    // ===== Shared post-flow states =====
    case "videos":
    case "info":
    case "catalog": {
      if (trimmed === "order" || trimmed.includes("להזמין") || trimmed.includes("מארז")) {
        messages = [{ id: newId(), sender: "bot", type: "text", text: "נהדר! בוא/י נמלא פרטים קצרים.\nמה שמך המלא?" }];
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
        const packageReplies: QuickReply[] = packages.map((p) => ({ label: p.name, value: p.id }));
        messages = [{ id: newId(), sender: "bot", type: "quick-replies", text: `תענוג! 🎁 איזה מארז מעניין אותך?`, replies: packageReplies }];
        nextStep = "order_package";
      }
      break;
    }

    case "order_package": {
      const found = packages.find((p) => p.id === trimmed || p.name === trimmed);
      if (!found) {
        const packageReplies: QuickReply[] = packages.map((p) => ({ label: p.name, value: p.id }));
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
        const newOrder = { ...state.order, ...orderPatch };
        const href = buildWhatsappUrl(newOrder, waNumber);
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
          `🔢 כמות: ${qty}`,
        ].join("\n");
        messages = [
          { id: newId(), sender: "bot", type: "text", text: "תודה! 🙏 הנה סיכום הבקשה שלך:" },
          { id: newId(), sender: "bot", type: "whatsapp-cta", href, summaryText },
        ];
        nextStep = "order_confirm";
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
