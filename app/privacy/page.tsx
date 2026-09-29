// TODO: legal review — draft privacy policy (מדיניות פרטיות), Amendment 13 (תיקון 13) aware
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של משק שוסטרמן — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך",
};

export default async function PrivacyPage() {
  // The address here is the one the Studio holds: a legal page that
  // keeps an old mailbox is a notice nobody can answer.
  const { email } = resolveContact((await fetchSiteSettings()).contact);

  return (
    <LegalLayout title="מדיניות פרטיות" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        מדיניות פרטיות זו מתארת כיצד <strong>{CONFIG.legal.companyLegalName}</strong> (&quot;אנחנו&quot;, &quot;החברה&quot;)
        אוספת, משתמשת, ומגינה על מידע אישי שנמסר דרך האתר ודרך הצ&apos;אט (RickyBot).
        מדיניות זו תואמת את הוראות חוק הגנת הפרטיות, התשמ&quot;א-1981 ולתיקון 13 שנכנס לתוקף.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מידע שאנו אוספים</h2>
      <p className="mb-4">
        במהלך שיחה עם RickyBot לצורך בקשת הצעת מחיר, נאספים הפרטים הבאים — אלה שמסרת בשיחה:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>שם מלא</li>
        <li>שם החברה או העסק</li>
        <li>מספר טלפון</li>
        <li>כתובת דואר אלקטרוני</li>
        <li>אזור וכתובת למשלוח</li>
        <li>פרטי הבקשה: המארז המבוקש והכמות</li>
        <li>מועד הפנייה, ואם סימנת הסכמה לפנייה חוזרת</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>לאן המידע מגיע</h2>
      <p className="mb-4">
        הפרטים עוברים בשני מסלולים, ושניהם מתרחשים באותו רגע — כשאתה/את מגיע/ה למסך הסיכום בצ&apos;אט:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>וואטסאפ.</strong> נפתחת הודעה מוכנה עם סיכום הפנייה. ההודעה נשלחת רק אם את/ה
          בוחר/ת לשלוח אותה, ומגיעה לבעלת המשק דרך שירות WhatsApp.
        </li>
        <li>
          <strong>שרת האתר.</strong> במקביל נשלחים אותם פרטים גם לשרת האתר.
          <strong> השרת אינו שומר אותם ואין באתר מסד נתונים של לקוחות</strong> — הם מועברים הלאה
          לכתובת שאליה מוגדר שיעברו, ואם לא הוגדרה כתובת כזו, הם נזרקים מיד ואינם נשמרים בשום מקום.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מטרות האיסוף</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>טיפול בבקשת הצעת המחיר ויצירת קשר חוזר</li>
        <li>ביצוע עסקאות</li>
        <li>שיפור השירות — על בסיס בקשות ופניות</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>שיתוף מידע עם צדדים שלישיים</h2>
      <p className="mb-4">
        אנחנו לא מוכרים ולא מחכירים מידע אישי. המידע עובר דרך הגורמים הבאים בלבד:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>WhatsApp (Meta Platforms)</strong> — כחלק מתהליך שליחת ההודעה, בכפוף למדיניות
          הפרטיות של WhatsApp
        </li>
        <li>
          <strong>Netlify</strong> — ספקית האירוח שדרכה עוברת הפנייה אל שרת האתר
        </li>
        <li>
          <strong>כתובת ההעברה</strong> — ככל שהוגדרה כזו, כמתואר למעלה
        </li>
        <li>כנדרש על-פי חוק, פסיקה, או צו שיפוטי</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>זכויות הנושא (תיקון 13 לחוק הגנת הפרטיות)</h2>
      <p className="mb-4">בהתאם לחוק, עומדות לך הזכויות הבאות:</p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li><strong>עיון:</strong> לקבל עותק של המידע האישי שנאסף עליך</li>
        <li><strong>תיקון:</strong> לתקן מידע שגוי</li>
        <li><strong>מחיקה:</strong> לבקש מחיקת מידע — בכפוף למגבלות חוקיות</li>
        <li><strong>התנגדות:</strong> להתנגד לשימוש במידע לצרכי שיווק ישיר</li>
      </ul>
      <p className="mb-4">
        לממש זכויות אלו, פנה/י אל: <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>אבטחת מידע</h2>
      <p className="mb-4">
        אנחנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך. עם זאת, אין אנחנו יכולים להבטיח אבטחה מוחלטת
        של תקשורת דרך האינטרנט.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>שמירת מידע</h2>
      <p className="mb-4">
        מידע שנמסר דרך WhatsApp יישמר בהתאם למדיניות WhatsApp ולצרכי הטיפול בהזמנה בלבד.
        בשרת האתר עצמו לא נשמר דבר. העדפות הנגישות והסכמת העוגיות נשמרות במכשיר שלך בלבד
        ואינן מועברות לשרת — הפירוט המלא נמצא ב
        <a href="/cookies" className="underline" style={{ color: "#1B4332" }}>מדיניות העוגיות</a>.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>בעל מאגר המידע</h2>
      <p className="mb-4">
        בעל/ת מאגר המידע: <strong>{CONFIG.legal.privacyOwnerName}</strong><br />
        {CONFIG.legal.companyLegalName}<br />
        {CONFIG.legal.address}<br />
        דוא&quot;ל: <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>הסכמה</h2>
      <p className="mb-4">
        שימוש בצ&apos;אט ושליחת פרטי הזמנה דרך WhatsApp מהווים הסכמה למדיניות פרטיות זו.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>עדכון המדיניות</h2>
      <p className="mb-4">
        אנחנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. תאריך העדכון יצוין בראש המסמך.
        עדכון אחרון: {CONFIG.legal.lastUpdated}
      </p>
    </LegalLayout>
  );
}
