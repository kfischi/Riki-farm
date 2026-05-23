import { CONFIG } from "./config";
import type { BotState, MessageType, Order, QuickReply, Step } from "./types";

let _counter = 0;
export function newId(): string {
  return `msg-${++_counter}`;
}

const MAIN_MENU_REPLIES: QuickReply[] = [
  { label: "📦 אני רוצה להזמין מארזים לחברה", value: "order" },
  { label: "🎬 סרטונים מהשדה", value: "videos" },
  { label: "ℹ️ מידע על המשק", value: "info" },
  { label: "🛍️ הצג לי את הקטלוג", value: "catalog" },
];

function mainMenuMessage(): MessageType {
  return {
    id: newId(),
    sender: "bot",
    type: "quick-replies",
    text: "שלום! 👋 ברוכים הבאים למשק של ריקי — מארזים חקלאיים יוקרתיים לחברות.\nאיך אוכל לעזור לך היום?",
    replies: MAIN_MENU_REPLIES,
  };
}

function buildWhatsappUrl(order: Order): string {
  const lines = [
    `שלום ריקי! 👋 אשמח להזמין:`,
    `שם: ${order.name}`,
    `חברה: ${order.company}`,
    `מארז: ${order.pkg}`,
    `כמות: ${order.quantity}`,
    `טלפון: ${order.phone}`,
    order.email ? `אימייל: ${order.email}` : null,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines)}`;
}

function isValidIsraeliPhone(phone: string): boolean {
  const stripped = phone.replace(/[\s\-]/g, "");
  return /^0(5\d|[2-4]|[8-9]|7\d)\d{7}$/.test(stripped);
}

function isPositiveInteger(val: string): boolean {
  const n = Number(val.trim());
  return Number.isInteger(n) && n > 0;
}

export interface BotResponseResult {
  messages: MessageType[];
  nextStep: Step;
  orderPatch: Partial<Order>;
}

// ASSUMPTION: All responses are in Hebrew. This is the single AI-injection point.
export function getBotResponse(state: BotState, input: string): BotResponseResult {
  const trimmed = input.trim();
  let messages: MessageType[] = [];
  let nextStep: Step = state.step;
  let orderPatch: Partial<Order> = {};

  // Global "back to menu" shortcut
  if (
    trimmed === "menu" ||
    trimmed === "תפריט" ||
    trimmed === "חזרה לתפריט" ||
    trimmed === "reset"
  ) {
    return {
      messages: [mainMenuMessage()],
      nextStep: "idle",
      orderPatch: {},
    };
  }

  switch (state.step) {
    case "idle": {
      if (trimmed === "order" || trimmed.includes("להזמין") || trimmed.includes("הזמנה")) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "נהדר! 🎉 בוא/י נמלא פרטים קצרים לצורך הצעת המחיר.\n\n📝 הפרטים שתמסור/תמסרי ישמשו ליצירת קשר בלבד · [מדיניות פרטיות](/privacy)\n\nמה שמך?",
          },
        ];
        nextStep = "order_name";
      } else if (trimmed === "videos" || trimmed.includes("סרטון") || trimmed.includes("וידאו")) {
        messages = [
          { id: newId(), sender: "bot", type: "video-link", videos: CONFIG.videos },
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: "אהבת? אפשר גם לראות את הקטלוג המלא או להזמין ישירות 👇",
            replies: [
              { label: "🛍️ הצג לי את הקטלוג", value: "catalog" },
              { label: "📦 אני רוצה להזמין", value: "order" },
            ],
          },
        ];
        nextStep = "videos";
      } else if (trimmed === "info" || trimmed.includes("מידע") || trimmed.includes("אודות")) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: `*${CONFIG.about.headline}*\n\n${CONFIG.about.body}`,
          },
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: "מעניין? הנה מה שאפשר לעשות:",
            replies: [
              { label: "🛍️ הצג לי את הקטלוג", value: "catalog" },
              { label: "📦 אני רוצה להזמין", value: "order" },
            ],
          },
        ];
        nextStep = "info";
      } else if (trimmed === "catalog" || trimmed.includes("קטלוג") || trimmed.includes("מארז")) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "catalog-cards",
            packages: CONFIG.packages,
          },
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: "מצא/ה משהו שאהבת?",
            replies: [
              { label: "📦 אני רוצה להזמין", value: "order" },
              { label: "💬 יש לי שאלה", value: "info" },
            ],
          },
        ];
        nextStep = "catalog";
      } else {
        // unrecognized input at menu
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: "לא הבנתי לגמרי, אבל זה בסדר 😊 הנה מה שאני יכול/ה לעזור:",
            replies: MAIN_MENU_REPLIES,
          },
        ];
      }
      break;
    }

    case "videos":
    case "info":
    case "catalog": {
      // Handle follow-up navigation from these informational steps
      if (trimmed === "order" || trimmed.includes("להזמין")) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "נהדר! בוא/י נמלא פרטים קצרים.\n\n📝 הפרטים שתמסור/תמסרי ישמשו ליצירת קשר בלבד · [מדיניות פרטיות](/privacy)\n\nמה שמך?",
          },
        ];
        nextStep = "order_name";
      } else if (trimmed === "catalog" || trimmed.includes("קטלוג")) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "catalog-cards",
            packages: CONFIG.packages,
          },
        ];
        nextStep = "catalog";
      } else {
        messages = [mainMenuMessage()];
        nextStep = "idle";
      }
      break;
    }

    case "order_name": {
      if (!trimmed) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "אנא הכנס/י את שמך המלא 🙂",
          },
        ];
      } else {
        orderPatch = { name: trimmed };
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: `נעים להכיר, ${trimmed}! 😊\nמה שם החברה?`,
          },
        ];
        nextStep = "order_company";
      }
      break;
    }

    case "order_company": {
      if (!trimmed) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "אנא הכנס/י את שם החברה 🏢",
          },
        ];
      } else {
        orderPatch = { company: trimmed };
        const packageReplies: QuickReply[] = CONFIG.packages.map((p) => ({
          label: p.name,
          value: p.id,
        }));
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: `מעולה, ${trimmed}! 🌿 איזה מארז מעניין אותך?`,
            replies: packageReplies,
          },
        ];
        nextStep = "order_package";
      }
      break;
    }

    case "order_package": {
      const found = CONFIG.packages.find(
        (p) => p.id === trimmed || p.name === trimmed
      );
      if (!found) {
        const packageReplies: QuickReply[] = CONFIG.packages.map((p) => ({
          label: p.name,
          value: p.id,
        }));
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "quick-replies",
            text: "לא מצאתי את המארז הזה. אנא בחר/י אחד מהרשימה:",
            replies: packageReplies,
          },
        ];
      } else {
        orderPatch = { pkg: found.name };
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: `בחרת ב${found.name} — בחירה מצוינת! 🎁\nכמה מארזים אתם צריכים?`,
          },
        ];
        nextStep = "order_quantity";
      }
      break;
    }

    case "order_quantity": {
      if (!isPositiveInteger(trimmed)) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "אנא הכנס/י מספר שלם וחיובי (לדוגמה: 10, 50, 100) 🔢",
          },
        ];
      } else {
        const qty = parseInt(trimmed, 10);
        orderPatch = { quantity: qty };
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: `${qty} מארזים — מושלם! 📦\nמה מספר הטלפון שלך לחזרה?`,
          },
        ];
        nextStep = "order_phone";
      }
      break;
    }

    case "order_phone": {
      if (!isValidIsraeliPhone(trimmed)) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "הפורמט לא נראה תקין. אנא הכנס/י מספר טלפון ישראלי (לדוגמה: 050-1234567) 📱",
          },
        ];
      } else {
        const cleanPhone = trimmed.replace(/[\s\-]/g, "");
        orderPatch = { phone: cleanPhone };
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "מצוין! 📱\nמה כתובת האימייל שלך? (לשליחת אישור הזמנה)\nאפשר גם להקליד «דלג» אם אין.",
          },
        ];
        nextStep = "order_email";
      }
      break;
    }

    case "order_email": {
      const isSkip = trimmed === "דלג" || trimmed === "skip" || trimmed === "—";
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

      if (!isSkip && !isValidEmail) {
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "כתובת האימייל לא נראית תקינה (לדוגמה: name@company.co.il).\nאפשר גם להקליד «דלג» להמשיך ללא אימייל.",
          },
        ];
      } else {
        const emailValue = isSkip ? "" : trimmed.toLowerCase();
        orderPatch = { email: emailValue };
        const newOrder = { ...state.order, phone: state.order.phone, email: emailValue };
        const href = buildWhatsappUrl({ ...state.order, email: emailValue });
        const summaryText = [
          "📋 סיכום ההזמנה:",
          "",
          `👤 שם: ${newOrder.name}`,
          `🏢 חברה: ${newOrder.company}`,
          `📦 מארז: ${newOrder.pkg}`,
          `🔢 כמות: ${newOrder.quantity}`,
          `📱 טלפון: ${newOrder.phone}`,
          emailValue ? `📧 אימייל: ${emailValue}` : null,
        ].filter(Boolean).join("\n");
        messages = [
          {
            id: newId(),
            sender: "bot",
            type: "text",
            text: "מעולה! הנה סיכום הבקשה שלך:",
          },
          {
            id: newId(),
            sender: "bot",
            type: "whatsapp-cta",
            href,
            summaryText,
          },
        ];
        nextStep = "order_confirm";
      }
      break;
    }

    case "order_confirm": {
      messages = [
        {
          id: newId(),
          sender: "bot",
          type: "quick-replies",
          text: "האם תרצה/י לחזור לתפריט הראשי?",
          replies: [
            { label: "🏠 חזרה לתפריט", value: "menu" },
          ],
        },
      ];
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
