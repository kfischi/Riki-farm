// TODO: legal review — draft Terms of Use (תקנון ותנאי שימוש)
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "תקנון ותנאי שימוש — המשק של ריקי",
  description: "תנאי השימוש של אתר המשק של ריקי",
};

export default function TermsPage() {
  return (
    <LegalLayout title="תקנון ותנאי שימוש" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        ברוכים הבאים לאתר {CONFIG.brand.name}. השימוש באתר ובשירותיו מהווה הסכמה לתנאים המפורטים להלן.
        אנא קרא/י אותם בעיון.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>1. מהות השירות</h2>
      <p className="mb-4">
        האתר מהווה חלון ראווה דיגיטלי המאפשר לעסקים לבצע פניות ובקשות הצעת מחיר עבור מארזים חקלאיים.
        שיחה עם RickyBot ושליחת פרטים דרך WhatsApp מהוות פנייה/בקשה לקבלת הצעת מחיר בלבד,
        <strong> ואינן מהוות חוזה מחייב</strong> עד לאישור מפורש מאת {CONFIG.brand.name} בכתב.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>2. זמינות ומחירים</h2>
      <p className="mb-4">
        המחירים המוצגים (ככל שמוצגים) הם אינדיקטיביים ועשויים להשתנות. הזמינות של מוצרים מותנית
        בעונתיות ובמלאי. {CONFIG.brand.name} שומרת לעצמה את הזכות לשנות מחירים ומגוון ללא הודעה מוקדמת.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>3. הגבלת אחריות</h2>
      <p className="mb-4">
        {CONFIG.brand.name} לא תישא באחריות לכל נזק ישיר, עקיף, מקרי, או תוצאתי הנובע משימוש באתר
        או מהסתמכות על המידע המוצג בו. השירות ניתן &quot;כפי שהוא&quot; (AS IS).
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>4. קניין רוחני</h2>
      <p className="mb-4">
        כל התכנים, הסמלים, הטקסטים, והעיצוב באתר הם רכושה של {CONFIG.brand.name} ומוגנים בזכויות יוצרים.
        אין להעתיק, לשכפל, או להשתמש בהם ללא אישור מפורש בכתב.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>5. דין וסמכות שיפוט</h2>
      <p className="mb-4">
        תנאים אלה כפופים לדין הישראלי. סמכות השיפוט הייחודית נתונה לבתי המשפט המוסמכים במחוז מגורי הנתבע.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>6. יצירת קשר</h2>
      <p className="mb-4">
        לכל שאלה הנוגעת לתנאים אלה:{" "}
        <a href={`mailto:${CONFIG.legal.contactEmail}`} className="underline" style={{ color: "#1B4332" }}>{CONFIG.legal.contactEmail}</a>
      </p>

      <p className="mb-4">עדכון אחרון: {CONFIG.legal.lastUpdated}</p>
    </LegalLayout>
  );
}
