// Written to carry what section 11 of the Privacy Protection Law requires a
// collection notice to tell a person — whether giving the details is
// obligatory or voluntary, what they are collected for, who else receives
// them, what the person may ask for, and who holds the database — but in
// plain words rather than in the register of a legal instrument.
//
// It states no compliance with anything, because nobody here has verified
// compliance and an unverified claim is itself exposure. Everything it does
// say is checkable against the code: the field list matches what
// app/api/lead/route.ts builds, and the two routes match RickyBot's saveLead.
//
// If a clause is ever added that is an undertaking rather than a description
// — a liability waiver, a declared standard — this becomes a legal document
// and needs a lawyer. The law applies to the business either way.
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "מה קורה עם הפרטים שלך",
  description: "מה האתר של משק שוסטרמן אוסף, לאן זה מגיע, ומה אפשר לבקש",
};

// These pages publish a contact address, and a notice nobody can answer is
// worse than none. Without this they keep whatever the Studio held at build
// time.
export const revalidate = 3600;

export default async function PrivacyPage() {
  const { email, phone } = resolveContact((await fetchSiteSettings()).contact);

  return (
    <LegalLayout title="מה קורה עם הפרטים שלך" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        הדף הזה מתאר מה קורה לפרטים שאת/ה מקליד/ה באתר של {CONFIG.brand.name}. הוא כתוב בשפה
        פשוטה, כי מה שחשוב כאן הוא שתדע/י מה קורה בפועל.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>קודם כול — הדבר החשוב</h2>
      <p className="mb-4">
        <strong>האתר הזה לא אוסף עליך שום דבר מעצמו.</strong> אין בו Google Analytics, אין פיקסל של
        פייסבוק, ואין מעקב אחרי גלישה. הדבר היחיד שמגיע אלינו הוא מה שאת/ה בוחר/ת להקליד בצ&apos;אט
        ולשלוח.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>אין חובה למסור כלום</h2>
      <p className="mb-4">
        <strong>אין שום חובה חוקית למסור את הפרטים האלה.</strong> המסירה תלויה ברצונך בלבד, ואפשר
        לגלוש באתר כולו, לראות את כל המארזים ולקרוא כל דבר — בלי למסור שום פרט.
      </p>
      <p className="mb-4">
        אם לא תמסור/תמסרי פרטים, פשוט לא נוכל לחזור אליך עם הצעת מחיר. תמיד אפשר במקום זה
        להתקשר ישירות ל
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline" style={{ color: "#1B4332" }}>{phone}</a>.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה נאסף, אם בחרת למלא</h2>
      <p className="mb-4">
        בשיחה עם הצ&apos;אט לצורך בקשת הצעת מחיר, נאספים הפרטים שמסרת בה:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>שם מלא</li>
        <li>שם החברה או העסק</li>
        <li>מספר טלפון</li>
        <li>כתובת דואר אלקטרוני</li>
        <li>אזור וכתובת למשלוח</li>
        <li>המארז המבוקש והכמות</li>
        <li>מועד הפנייה</li>
      </ul>
      <p className="mb-4">
        אם לא סיימת את השיחה ולא הגעת למסך הסיכום — שום דבר לא נשלח.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>לאן זה מגיע</h2>
      <p className="mb-4">
        שני מסלולים, ושניהם קורים באותו רגע — כשאת/ה מגיע/ה למסך הסיכום:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>
          <strong>וואטסאפ.</strong> נפתחת הודעה מוכנה עם סיכום הפנייה. ההודעה נשלחת רק אם את/ה
          בוחר/ת לשלוח אותה, והיא מגיעה לריקי דרך WhatsApp — כמו כל הודעה אחרת שהיית שולח/ת.
        </li>
        <li>
          <strong>שרת האתר.</strong> במקביל נשלחים אותם פרטים גם לשרת האתר.{" "}
          <strong>השרת לא שומר אותם, ואין באתר מסד נתונים של לקוחות</strong> — הם מועברים הלאה
          לכתובת שאליה מוגדר שיעברו, ואם לא הוגדרה כתובת כזו, הם נזרקים מיד.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>למה אנחנו משתמשים בזה</h2>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li>כדי לחזור אליך עם הצעת מחיר</li>
        <li>כדי לבצע את ההזמנה אם תרצה/י</li>
      </ul>
      <p className="mb-4">
        <strong>זה הכול.</strong> הפרטים לא משמשים לדיוור שיווקי, ואנחנו לא שולחים פרסומות.
        אם אי פעם נרצה לשלוח, נבקש את הסכמתך בנפרד ומראש — מילוי הטופס כאן אינו הסכמה לכך.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מי עוד רואה את זה</h2>
      <p className="mb-4">
        אנחנו לא מוכרים ולא משכירים פרטים של אף אחד. המידע עובר דרך הגורמים האלה בלבד:
      </p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li><strong>WhatsApp</strong> — כחלק משליחת ההודעה, לפי תנאי השימוש של WhatsApp</li>
        <li><strong>Netlify</strong> — החברה שמארחת את האתר, שדרכה עוברת הפנייה אל השרת</li>
        <li><strong>כתובת ההעברה</strong> — ככל שהוגדרה כזו, כמתואר למעלה</li>
        <li>אם נידרש לכך לפי חוק או צו של בית משפט</li>
      </ul>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה אפשר לבקש מאיתנו</h2>
      <p className="mb-4">אפשר לפנות אלינו בכל עת ולבקש:</p>
      <ul className="mb-4 list-disc pr-5 space-y-1.5">
        <li><strong>לעיין</strong> — לראות אילו פרטים שלך יש אצלנו</li>
        <li><strong>לתקן</strong> — לשנות פרט שגוי</li>
        <li><strong>למחוק</strong> — להסיר את הפרטים</li>
        <li><strong>לא לפנות</strong> — שלא ניצור איתך קשר יותר</li>
      </ul>
      <p className="mb-4">
        נטפל בבקשה בהקדם. אפשר בטלפון{" "}
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline" style={{ color: "#1B4332" }}>{phone}</a>
        {" "}או במייל{" "}
        <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>.
      </p>
      <p className="mb-4">
        שימו לב: הודעות שכבר נשלחו בוואטסאפ נמצאות גם בשיחת הוואטסאפ עצמה, ואפשר למחוק אותן משם.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה נשמר אצלך בדפדפן</h2>
      <p className="mb-4">
        העדפות הנגישות והסכמת העוגיות נשמרות במכשיר שלך בלבד ואינן מגיעות אלינו.
        הפירוט המלא נמצא ב
        <a href="/cookies" className="underline" style={{ color: "#1B4332" }}>דף העוגיות</a>.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>אבטחה</h2>
      <p className="mb-4">
        הפנייה עוברת בחיבור מוצפן, ובשרת לא נשמר דבר. כמו בכל אתר, אי אפשר להבטיח אבטחה מוחלטת
        של תקשורת באינטרנט.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מי אחראי על המידע</h2>
      <p className="mb-4">
        הפרטים שנמסרים באתר מגיעים אל:
      </p>
      <p className="mb-4">
        <strong>{CONFIG.legal.dataContactName}</strong><br />
        {CONFIG.brand.name}
        {CONFIG.legal.businessId && <>, {CONFIG.legal.businessId}</>}<br />
        {CONFIG.legal.address}<br />
        טלפון:{" "}
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline" style={{ color: "#1B4332" }}>{phone}</a>
        <br />
        דוא&quot;ל:{" "}
        <a href={`mailto:${email}`} className="underline" style={{ color: "#1B4332" }}>{email}</a>
      </p>
      <p className="mb-4">
        לכל פנייה בנושא הפרטים שלך — אפשר לפנות ישירות לכתובות האלה.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>שינויים בדף הזה</h2>
      <p className="mb-4">
        אם מה שהאתר עושה ישתנה, הדף הזה יתעדכן. תאריך העדכון האחרון מופיע בראש הדף.
      </p>
    </LegalLayout>
  );
}
