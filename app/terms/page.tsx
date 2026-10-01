// Carries what terms of use are expected to carry — rules of use, limitation
// of liability, intellectual property, governing law and forum — but written
// as plainly as each of those can honestly be written.
//
// What is NOT here, and deliberately: a cancellation-and-returns policy. That
// belongs to a site that sells. This one takes no payment and concludes no
// transaction; every order is agreed with Ricky directly, and the page says
// so rather than pretending otherwise. If the site ever takes payment, a
// cancellation policy and a prominent "ביטול עסקה" link become obligations,
// and this page needs a lawyer before that ships.
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONFIG } from "@/lib/config";
import { resolveContact } from "@/lib/contact";
import { fetchSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  // The brand is appended by the title template in app/layout.tsx.
  title: "על האתר הזה",
  description: "איך עובדת הזמנה דרך האתר של משק שוסטרמן, ותנאי השימוש בו",
};

// These pages publish a contact address, and a notice nobody can answer is
// worse than none. Without this they keep whatever the Studio held at build
// time.
export const revalidate = 3600;

export default async function TermsPage() {
  const { email, phone } = resolveContact((await fetchSiteSettings()).contact);

  return (
    <LegalLayout title="על האתר הזה" lastUpdated={CONFIG.legal.lastUpdated}>
      <p className="mb-4">
        הדף הזה מסביר איך האתר של {CONFIG.brand.name} עובד ומה תנאי השימוש בו, כדי שלא יהיו הפתעות.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>האתר הוא חלון ראווה, לא חנות</h2>
      <p className="mb-4">
        <strong>אי אפשר לקנות כאן ואין כאן תשלום.</strong> האתר מציג את המארזים ומאפשר לשלוח פנייה.
        כל הזמנה נסגרת בשיחה ישירה עם ריקי — בוואטסאפ או בטלפון — ושם מסוכמים המחיר, הכמות ומועד
        האספקה.
      </p>
      <p className="mb-4">
        פנייה דרך האתר היא בקשה להצעת מחיר. היא לא מחייבת אותך לכלום, ואינה מהווה הזמנה או חוזה
        עד שסוכמה ישירות מול {CONFIG.brand.name}.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מחירים וזמינות</h2>
      <p className="mb-4">
        התוצרת עונתית, ולכן מה שזמין משתנה במהלך השנה. מחירים שמוצגים באתר הם לאינדיקציה בלבד
        ועשויים להשתנות — המחיר המחייב הוא זה שסוכם איתך ישירות, והוא כולל מע&quot;מ ככל שחל.
        מארז שאינו זמין כרגע פשוט לא יופיע באתר.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>ביטול ושינוי של הזמנה</h2>
      <p className="mb-4">
        רוצה לשנות או לבטל הזמנה שסיכמת? פשוט תתקשר/י או תכתוב/י לריקי. כיוון שהתוצרת טרייה
        ונקטפת לפי הזמנה, כדאי להודיע מוקדם ככל האפשר, ונמצא פתרון.
      </p>
      <p className="mb-4">
        כיוון שלא מתבצעת כאן עסקה ולא נגבה תשלום דרך האתר, תנאי הביטול הם אלה שסוכמו איתך
        בשיחה. אם בעתיד יתאפשר תשלום דרך האתר, יתפרסמו כאן תנאי ביטול מלאים.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מה מותר לעשות באתר</h2>
      <p className="mb-4">
        האתר פתוח לכל אחד. מה שלא בסדר, וכנראה ברור מאליו: לא לשלוח פניות כוזבות או בשם מישהו
        אחר, לא לנסות לשבש את פעולת האתר, ולא להשתמש בו לשום מטרה שאינה חוקית.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>התמונות והטקסטים</h2>
      <p className="mb-4">
        התמונות, הטקסטים והעיצוב באתר שייכים ל{CONFIG.brand.name}. נשמח אם תשתפו קישור לאתר;
        להעתקה או לשימוש אחר בתכנים — בבקשה תשאלו אותנו קודם.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>על מה אנחנו לא יכולים לקחת אחריות</h2>
      <p className="mb-4">
        אנחנו משתדלים שהמידע באתר יהיה מדויק ומעודכן, אבל זמינות התוצרת ומחיריה משתנים —
        ולכן ההסתמכות על המידע המוצג כאן היא באחריותך, והמחייב הוא תמיד מה שסוכם ישירות.
      </p>
      <p className="mb-4">
        האתר ניתן לשימוש כמות שהוא. איננו יכולים להתחייב שהוא יהיה זמין בכל רגע ובלי תקלות,
        ואיננו אחראים לנזק שנגרם מתקלה טכנית, מהפסקת שירות, או משימוש באתר שלא כמתואר כאן.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>דין וסמכות שיפוט</h2>
      <p className="mb-4">
        על השימוש באתר חל הדין הישראלי, ולבתי המשפט המוסמכים בישראל נתונה סמכות השיפוט.
      </p>

      <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: "#1B4332" }}>מי עומד מאחורי האתר</h2>
      <p className="mb-4">
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
        מה קורה עם הפרטים שאת/ה משאיר/ה — מתואר ב
        <a href="/privacy" className="underline" style={{ color: "#1B4332" }}>דף הפרטיות</a>.
      </p>
    </LegalLayout>
  );
}
