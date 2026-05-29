// TODO: legal review — draft privacy policy (מדיניות פרטיות), Amendment 13 (תיקון 13) aware
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "מדיניות פרטיות — משק שוסטרמן",
  description: "מדיניות הפרטיות של משק שוסטרמן — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="מדיניות פרטיות" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        מדיניות פרטיות זו מתארת כיצד <strong>{CONFIG.legal.companyLegalName}</strong> (&quot;אנחנו&quot;, &quot;החברה&quot;)
        אוספת, משתמשת, ומגינה על מידע אישי שנמסר דרך האתר ודרך הצ&apos;אט (RickyBot).
        מדיניות זו תואמת את הוראות חוק הגנת הפרטיות, התשמ&quot;א-1981 ולתיקון 13 שנכנס לתוקף.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מידע שאנו אוספים</h2>
      <p className="mb-4">
        במהלך שיחה עם RickyBot לצורך בקשת הצעת מחיר, אנו עשויים לאסוף את פרטי המידע הבאים:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>שמך הפרטי</li>
        <li>שם החברה שבה אתה/את עובד/ת</li>
        <li>מספר טלפון לחזרה</li>
        <li>פרטי הזמנה: סוג מארז, כמות</li>
      </ul>
      <p className="mb-4">
        <strong>שים/י לב:</strong> המידע שנמסר דרך הצ&apos;אט נשלח לבעלת המשק ישירות דרך WhatsApp ואינו נשמר בשרתי האתר.
        האתר אינו שומר מסדי נתונים של לקוחות.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מטרות האיסוף</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>טיפול בבקשת הצעת המחיר ויצירת קשר חוזר</li>
        <li>ביצוע עסקאות</li>
        <li>שיפור השירות — על בסיס בקשות ופניות</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>שיתוף מידע עם צדדים שלישיים</h2>
      <p className="mb-4">
        אנחנו לא מוכרים, מחכירים, או משתפים מידע אישי עם צדדים שלישיים, למעט:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>כנדרש על-פי חוק, פסיקה, או צו שיפוטי</li>
        <li>מסירת המידע לשירות WhatsApp (Meta Platforms) כחלק מתהליך שליחת ההודעה — בכפוף למדיניות הפרטיות של WhatsApp</li>
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
        לממש זכויות אלו, פנה/י אל: <a href={`mailto:${CONFIG.legal.contactEmail}`} className="underline" style={{ color: "#1B4332" }}>{CONFIG.legal.contactEmail}</a>
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>אבטחת מידע</h2>
      <p className="mb-4">
        אנחנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך. עם זאת, אין אנחנו יכולים להבטיח אבטחה מוחלטת
        של תקשורת דרך האינטרנט.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>שמירת מידע</h2>
      <p className="mb-4">
        מידע שנמסר דרך WhatsApp יישמר בהתאם למדיניות WhatsApp ולצרכי הטיפול בהזמנה בלבד.
        פרטי העדפות נגישות נשמרים ב-localStorage במכשיר שלך בלבד ואינם מועברים לשרת.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>בעל מאגר המידע</h2>
      <p className="mb-4">
        בעל/ת מאגר המידע: <strong>{CONFIG.legal.privacyOwnerName}</strong><br />
        {CONFIG.legal.companyLegalName}<br />
        {CONFIG.legal.address}<br />
        דוא&quot;ל: <a href={`mailto:${CONFIG.legal.contactEmail}`} className="underline" style={{ color: "#1B4332" }}>{CONFIG.legal.contactEmail}</a>
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
