// TODO: legal review — this is a draft accessibility statement (הצהרת נגישות)
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "הצהרת נגישות — משק שוסטרמן",
  description: "הצהרת הנגישות של משק שוסטרמן בהתאם לתקן ישראלי ת\"י 5568 ו-WCAG 2.0 AA",
};

export default function AccessibilityPage() {
  const coord = CONFIG.legal.accessibilityCoordinator;
  return (
    <LegalLayout title="הצהרת נגישות" lastUpdated={CONFIG.legal.lastUpdated}>
      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מחויבות לנגישות</h2>
      <p className="mb-4">
        {CONFIG.brand.name} מחויבת להנגשת שירותיה הדיגיטליים לכלל הציבור, לרבות אנשים עם מוגבלויות,
        בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, ולתקנות הנגישות לשירות (התאמות נגישות
        לשירות שניתן בדרך מקוונת), התשע&quot;ג-2013.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>הסטנדרט הנגישות</h2>
      <p className="mb-4">
        אתר זה שואף לעמוד בדרישות תקן ישראלי ת&quot;י 5568 ברמת תאימות AA, המבוסס על הנחיות WCAG 2.0 AA
        של ארגון W3C.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>נגישות האתר — מה קיים</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>תמיכה מלאה בניווט מקלדת (Tab, Enter, Escape, חצי כיוון)</li>
        <li>מצב דפדפן RTL מלא (ימין לשמאל) עם שפה מוגדרת כעברית</li>
        <li>ניגוד צבעים העומד בדרישות WCAG AA</li>
        <li>כל התמונות כוללות טקסט חלופי (alt) בעברית</li>
        <li>כפתורים ושדות טופס כוללים תיאורים נגישים (aria-label)</li>
        <li>חלון הצ&apos;אט הוא dialog נגיש עם מלכודת מיקוד (focus trap)</li>
        <li>הכרזות חיות (aria-live) להוספת הודעות חדשות בצ&apos;אט</li>
        <li>כפתור &quot;דלג לתוכן&quot; בראש הדף</li>
        <li>תמיכה ב-prefers-reduced-motion לביטול אנימציות</li>
        <li>ווידג&apos;ט נגישות הכולל: הגדלת גופן, ניגוד גבוה, הדגשת קישורים, גופן קריא, עצירת אנימציות</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מגבלות ידועות</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>תמונות placeholder מסוימות עשויות לא לתאר את התוכן הסופי — יעודכנו עם תמונות אמיתיות</li>
        <li>טרם בוצעה בדיקת נגישות מקיפה על-ידי מורשה/ת נגישות מוסמך/ת</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>יצירת קשר עם רכז/ת הנגישות</h2>
      <p className="mb-4">
        לדיווח על בעיות נגישות, בקשות להתאמות, או כל שאלה בנושא, ניתן לפנות אל רכז/ת הנגישות:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>שם: {coord.name}</li>
        <li>טלפון: {coord.phone}</li>
        <li>דוא&quot;ל: <a href={`mailto:${coord.email}`} className="underline" style={{ color: "#1B4332" }}>{coord.email}</a></li>
      </ul>

      <p className="mb-4">
        נשתדל לחזור אליך בהקדם האפשרי ולא יאוחר מ-14 ימי עסקים.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>תאריך ההצהרה</h2>
      <p className="mb-4">הצהרה זו עודכנה לאחרונה בתאריך: {CONFIG.legal.lastUpdated}.</p>
    </LegalLayout>
  );
}
