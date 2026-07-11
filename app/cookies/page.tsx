// TODO: legal review — draft cookie policy (מדיניות עוגיות)
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "מדיניות עוגיות — משק שוסטרמן",
  description: "מדיניות השימוש בעוגיות ואחסון מקומי באתר משק שוסטרמן",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="מדיניות עוגיות ואחסון מקומי" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        מסמך זה מסביר כיצד האתר {CONFIG.brand.name} משתמש בעוגיות (Cookies) ובטכנולוגיות אחסון מקומי
        (localStorage, sessionStorage).
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה הם Cookies ואחסון מקומי?</h2>
      <p className="mb-4">
        עוגיות הן קבצי טקסט קטנים הנשמרים במכשיר שלך על-ידי הדפדפן. localStorage ו-sessionStorage
        הם מנגנוני אחסון מקומי דומים — המידע נשמר אצלך בדפדפן בלבד ואינו נשלח לשרת שלנו.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>אחסון מקומי שאנו משתמשים בו</h2>

      <h3 className="text-base font-bold mt-6 mb-2" style={{ color: "#1B4332" }}>localStorage</h3>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>a11y_prefs</strong> — העדפות נגישות (גודל גופן, ניגוד גבוה, עצירת אנימציות).
          נשמר עד מחיקה ידנית. אין מידע אישי.
        </li>
        <li>
          <strong>cookie_consent</strong> — האם אישרת/י את הודעת העוגיות.
          נשמר עד מחיקה ידנית.
        </li>
      </ul>

      <h3 className="text-base font-bold mt-6 mb-2" style={{ color: "#1B4332" }}>sessionStorage</h3>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>rickybot_opened</strong> — האם חלון הצ&apos;אט נפתח לפחות פעם אחת בסשן הנוכחי.
          נמחק אוטומטית בסגירת הדפדפן.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>עוגיות שלא בשימוש כרגע</h2>
      <p className="mb-4">
        בגרסה הנוכחית של האתר אין שימוש בעוגיות ניתוח (Google Analytics), עוגיות שיווק (Meta Pixel, Google Ads),
        או עוגיות של צדדים שלישיים.
      </p>
      <p className="mb-4">
        <strong>הערה חשובה לעתיד:</strong> אם יוספו כלי ניתוח או שיווק, הם יגדרו
        רק לאחר קבלת הסכמתך המפורשת, בהתאם לדרישות הדין.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>ניהול ומחיקת עוגיות</h2>
      <p className="mb-4">
        תוכל/י לנהל ולמחוק את העוגיות ואחסון מקומי דרך הגדרות הדפדפן שלך.
        מחיקה תאפס את העדפות הנגישות ואת הסכמת העוגיות.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>יצירת קשר</h2>
      <p className="mb-4">
        לשאלות בנוגע למדיניות זו:{" "}
        <a href={`mailto:${CONFIG.legal.contactEmail}`} className="underline" style={{ color: "#1B4332" }}>{CONFIG.legal.contactEmail}</a>
      </p>

      <p className="mb-4">עדכון אחרון: {CONFIG.legal.lastUpdated}</p>
    </LegalLayout>
  );
}
