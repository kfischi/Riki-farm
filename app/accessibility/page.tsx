// TODO: legal review — this is a draft accessibility statement (הצהרת נגישות)
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של משק שוסטרמן בהתאם לתקן ישראלי ת\"י 5568 ו-WCAG 2.0 AA",
};

// A statement the regulations require people to act on is worth nothing if
// the number on it is the one Ricky stopped answering. An hour is far more
// often than this page changes, and it means a contact detail edited in the
// Studio reaches the legal pages the same day instead of at the next deploy.
export const revalidate = 3600;

export default async function AccessibilityPage() {
  const coord = CONFIG.legal.accessibilityCoordinator;
  // The same phone and e-mail the rest of the site shows, from one resolver.
  const { phone, email } = resolveContact((await fetchSiteSettings()).contact);
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
        <li>טלפון: <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline" style={{ color: "#1B4332" }}>{phone}</a></li>
        <li>דוא&quot;ל: <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a></li>
      </ul>

      <p className="mb-4">
        נשתדל לחזור אליך בהקדם האפשרי ולא יאוחר מ-14 ימי עסקים.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>תאריך ההצהרה</h2>
      <p className="mb-4">הצהרה זו עודכנה לאחרונה בתאריך: {CONFIG.legal.lastUpdated}.</p>
    </LegalLayout>
  );
}
