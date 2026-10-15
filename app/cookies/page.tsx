// Plain-language description. This page was already almost entirely factual —
// it names the three storage keys the site actually writes — so little had to
// change: one promise about future consent was phrased as a legal undertaking
// ("בהתאם לדרישות הדין") and is now stated as what we will do.
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "מה נשמר אצלך בדפדפן",
  description: "שלושת הדברים שהאתר של משק שוסטרמן שומר במכשיר שלך, ולמה",
};

// Same reason as /accessibility: these pages publish a contact address,
// and a legal notice nobody can answer is worse than none. Without this
// they keep whatever the Studio held at build time.
export const revalidate = 3600;

export default async function CookiesPage() {
  // The address here is the one the Studio holds: a legal page that
  // keeps an old mailbox is a notice nobody can answer.
  const { email } = resolveContact((await fetchSiteSettings()).contact);

  return (
    <LegalLayout title="מה נשמר אצלך בדפדפן" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        האתר של {CONFIG.brand.name} שומר שלושה דברים במכשיר שלך, וזה הכול. הדף הזה מפרט
        בדיוק מה הם.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה הם Cookies ואחסון מקומי?</h2>
      <p className="mb-4">
        עוגיות הן קבצי טקסט קטנים הנשמרים במכשיר שלך על-ידי הדפדפן. localStorage ו-sessionStorage
        הם מנגנוני אחסון מקומי דומים — המידע נשמר אצלך בדפדפן בלבד ואינו נשלח לשרת שלנו.
      </p>
      <p className="mb-4">
        <strong>זה נכון לגבי שלושת הפריטים המפורטים כאן בלבד.</strong> פרטים שאת/ה מוסר/ת ביוזמתך
        בשיחה עם הצ&apos;אט — שם, טלפון, אימייל וכתובת — אינם אחסון מקומי, והם כן נשלחים החוצה.
        המסלול שלהם מתואר ב
        <a href="/privacy" className="underline" style={{ color: "#1B4332" }}>דף הפרטיות</a>.
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
        <strong>אם זה ישתנה:</strong> אם יתווספו בעתיד כלי ניתוח או פרסום, הם לא יופעלו
        לפני שתאשר/י, והדף הזה יתעדכן.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>ניהול ומחיקת עוגיות</h2>
      <p className="mb-4">
        תוכל/י לנהל ולמחוק את העוגיות ואחסון מקומי דרך הגדרות הדפדפן שלך.
        מחיקה תאפס את העדפות הנגישות ואת הסכמת העוגיות.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>יצירת קשר</h2>
      <p className="mb-4">
        שאלה על משהו כאן:{" "}
        <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>
      </p>

    </LegalLayout>
  );
}
