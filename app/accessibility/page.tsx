// Carries what an accessibility statement is expected to carry: what was
// adapted, what has not been, who to contact about it, and when it was last
// updated. LegalLayout prints the date; the rest is below.
//
// It claims NEITHER compliance NOR exemption, and that is a decision, not an
// omission. Declaring that the site meets ת"י 5568 at level AA would be a
// claim nobody has verified. Declaring the small-business exemption would be
// a claim about a turnover nobody here knows. Both were asked and neither is
// known, so the page states only what is true: what was built, and that no
// certified surveyor has checked it.
//
// Once the business's status is known, one of two things belongs here — the
// exemption and its basis, or the standard and the audit that establishes it.
// Until then this is the honest version. See docs/handover-he.md.
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "נגישות האתר",
  description: "מה נעשה באתר של משק שוסטרמן כדי שיהיה נגיש, ואיך לדווח על בעיה",
};

// A statement people are meant to act on is worth nothing if the number on it
// is the one Ricky stopped answering. An hour is far more often than this page
// changes, and it means a contact detail edited in the Studio reaches the page
// the same day instead of at the next deploy.
export const revalidate = 3600;

export default async function AccessibilityPage() {
  const coord = CONFIG.legal.accessibilityCoordinator;
  // The same phone and e-mail the rest of the site shows, from one resolver.
  const { phone, email } = resolveContact((await fetchSiteSettings()).contact);

  return (
    <LegalLayout title="נגישות האתר" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        אנחנו רוצים שכל אחד יוכל להשתמש באתר הזה. הדף מתאר מה נעשה בפועל כדי שזה יקרה,
        מה עוד לא נבדק, ואל מי לפנות אם משהו לא עובד.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה יש באתר</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>תפריט נגישות</strong> בפינה התחתונה: הגדלת גופן, ניגוד גבוה, הדגשת קישורים,
          גופן קריא ועצירת אנימציות. הבחירה נשמרת גם אחרי סגירת הדפדפן, ויש כפתור איפוס.
        </li>
        <li>ניווט מלא במקלדת — Tab, Enter, Escape וחצים — בלי צורך בעכבר</li>
        <li>כפתור &quot;דלג לתוכן&quot; בראש הדף</li>
        <li>האתר כולו בעברית ובכיוון ימין לשמאל</li>
        <li>לכל תמונה יש תיאור בעברית לקוראי מסך</li>
        <li>לכפתורים ולשדות יש תיאורים לקוראי מסך</li>
        <li>חלון הצ&apos;אט מכריז על הודעות חדשות, ומיקוד המקלדת נשאר בתוכו כל עוד הוא פתוח</li>
        <li>מי שהגדיר במערכת ההפעלה שלו להפחית תנועה — לא יראה אנימציות</li>
        <li>הצבעים נבחרו כך שהטקסט יהיה קריא על הרקע שמאחוריו</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>סייגים — מה עוד לא נבדק</h2>
      <p className="mb-4">
        חשוב לנו להגיד את זה במפורש ולא להסתיר:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>טרם נערכה בדיקת נגישות על-ידי מורשה נגישות מוסמך.</strong> ההתאמות שמפורטות
          למעלה נבנו ונבדקו על-ידינו, ולא אושרו על-ידי גורם חיצוני.
        </li>
        <li>
          הסרטון בראש העמוד מוצג ללא כתוביות. התוכן שלו הוא צילומי נוף מהמשק ואין בו דיבור או
          מידע שאינו מופיע גם בטקסט שלצידו.
        </li>
        <li>חלק מהתמונות באתר עדיין זמניות, והתיאור שלהן יתעדכן יחד איתן</li>
      </ul>
      <p className="mb-4">
        <strong>חלופה נגישה לכל דבר באתר:</strong> אפשר תמיד להתקשר ולקבל את אותו מידע, ולבצע את
        אותה הזמנה, בשיחה. הפרטים למטה.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>נתקלת בבעיה? ספר/י לנו</h2>
      <p className="mb-4">
        אם משהו באתר לא נגיש עבורך, או שאת/ה זקוק/ה למידע בדרך אחרת — אפשר לפנות ישירות:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>שם: {coord.name}</li>
        <li>
          טלפון:{" "}
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline" style={{ color: "#1B4332" }}>{phone}</a>
        </li>
        <li>
          דוא&quot;ל:{" "}
          <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>
        </li>
      </ul>
      <p className="mb-4">
        נשתדל לחזור אליך בהקדם, ואם אפשר לתקן — נתקן. אפשר גם פשוט להתקשר ולהזמין בטלפון.
      </p>
    </LegalLayout>
  );
}
