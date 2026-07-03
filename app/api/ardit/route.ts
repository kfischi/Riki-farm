import { streamText, tool, isStepCount } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { z } from "zod";
import { getCatalogEntries } from "@/lib/catalog";
import type { NextRequest } from "next/server";

const SYSTEM = `את ערדית, נציגת השירות החכמה של משק שוסטרמן — משק חקלאי ממושב לימן בגבול הצפון, המתמחה בליצ'י טרי ומארזי תוצרת לחברות, ארגונים ויחידים.

הנחיות:
• ענה תמיד בעברית בלבד, בשפה חמה וידידותית
• כשמשתמש מביע עניין במוצר ספציפי או רוצה להזמין — השתמשי מיד בכלי buildRecommendation
• שמרי על תשובות קצרות (2-3 משפטים לכל היותר) — הכרטיס יציג את הפרטים
• אל תציגי מחירים — ריקי תחזור עם הצעת מחיר אישית
• משלוח: 24-48 שעות לאחר הזמנה
• כמות מינימום: אין מינימום לרכישה פרטית; לחברות מ-5 יחידות
• אם שואלים שאלה כללית שאינה קשורה — ענה בנימוס שאת מתמחה רק במוצרי משק שוסטרמן
• תמיד אחרי הצגת המלצה — שאלי אם יש שאלות נוספות`;

const recommendationParams = z.object({
  packageId: z.string().describe("מזהה המוצר מהקטלוג"),
  packageName: z.string().describe("שם המוצר"),
  description: z.string().describe("תיאור מותאם אישית בעברית"),
  tags: z.array(z.string()).describe("תגיות רלוונטיות"),
  suggestedQuantity: z.number().int().min(1).describe("כמות מוצעת לפי הצורך"),
});

type RecommendationArgs = z.infer<typeof recommendationParams>;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI service unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const entries = getCatalogEntries();
  const catalogText = entries
    .map(
      (e) =>
        `• מזהה: ${e.id} | שם: ${e.name} | תיאור: ${e.description}${e.tags.length ? ` | תגיות: ${e.tags.join(", ")}` : ""}`
    )
    .join("\n");

  const google = createGoogle({ apiKey });

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: `${SYSTEM}\n\n== קטלוג מוצרים ==\n${catalogText}`,
    messages,
    tools: {
      buildRecommendation: tool({
        description:
          "הצגת כרטיס המלצה אינטראקטיבי עם פרטי מוצר, בחירת כמות וכפתור הזמנה בוואטסאפ. השתמשי בכלי זה בכל פעם שמשתמש מתעניין במוצר או רוצה להזמין",
        inputSchema: recommendationParams,
        execute: async (args: RecommendationArgs) => args,
      }),
    },
    stopWhen: isStepCount(3),
  });

  return result.toUIMessageStreamResponse();
}
