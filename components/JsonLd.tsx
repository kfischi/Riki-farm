import { CONFIG } from "@/lib/config";
import { resolveContact, type SiteContact } from "@/lib/contact";

const SITE_URL = CONFIG.seo.siteUrl;

/**
 * Structured data for search engines.
 *
 * Takes the contact details rather than reading the config: all three were
 * hardcoded here, so an owner who changed her number in the Studio kept
 * handing Google the old one — the listing outlives the edit.
 */
export function JsonLd({ contact }: { contact?: SiteContact }) {
  const { phone, email, whatsapp } = resolveContact(contact);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Website entity ──────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CONFIG.brand.name,
        description: "מארזים ותוצרת חקלאית מגבול הצפון — משק שוסטרמן, מושב לימן",
        inLanguage: "he-IL",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },

      // ── Organization / Local Business ───────────────────────────────────
      {
        "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
        "@id": `${SITE_URL}/#organization`,
        name: CONFIG.brand.name,
        alternateName: ["משק שוסטרמן", "Meshek Shusterman", "ריקי שוסטרמן", "Riki Shusterman Farm"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: CONFIG.rickyAvatar,
          caption: "ריקי שוסטרמן, חקלאית, מושב לימן, גבול הצפון",
        },
        image: CONFIG.seo.ogImage,
        description:
          "משק שוסטרמן במושב לימן, גבול הצפון — ריקי שוסטרמן, חקלאית עם למעלה מ-22 שנות ניסיון. מגדלים ומשווקים תוצרת חקלאית ומארזים בהתאמה אישית, ישירות מהשדה. מספקים לוועדי עובדים, חברות, ארגונים ונקודות מכירה בכל רחבי ישראל. המארזים משלבים תוצרת משקית עם גידולים מובחרים של חקלאי קו העימות, מתוך ערבות הדדית ותמיכה בחקלאות הצפון.",
        foundingDate: "2004",
        address: {
          "@type": "PostalAddress",
          streetAddress: CONFIG.legal.address,
          addressLocality: "מושב לימן",
          addressRegion: "גליל מערבי",
          addressCountry: "IL",
          postalCode: "2510500",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.067,
          longitude: 35.136,
        },
        hasMap: `https://maps.google.com/?q=מושב+לימן`,
        telephone: phone,
        email,
        priceRange: "₪₪",
        currenciesAccepted: "ILS",
        paymentAccepted: "העברה בנקאית",
        areaServed: [
          { "@type": "Country", name: "ישראל" },
          { "@type": "State", name: "גליל מערבי" },
          { "@type": "State", name: "גבול הצפון" },
        ],
        servesCuisine: ["תוצרת חקלאית עונתית", "מארזים בהתאמה אישית"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "מארזים ותוצרת משק שוסטרמן",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "מארז תוצרת חקלאית לחברות" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "מארז שי בהתאמה אישית לוועד עובדים" } },
          ],
        },
        sameAs: [
          `https://wa.me/${whatsapp}`,
          "https://www.facebook.com/share/1BtRYnhYM9/",
        ],
        keywords: "מארזים חקלאיים, ועד עובדים, נקודות מכירה, גבול הצפון, מושב לימן, חקלאות ישראלית",
        founder: {
          "@type": "Person",
          name: "ריקי שוסטרמן",
          jobTitle: "חקלאית",
          description: "חקלאית ותושבת מושב לימן מזה למעלה מ-22 שנה, בוגרת מגמת גידולי שדה בבית הספר החקלאי נהלל.",
          knowsAbout: [
            "חקלאות", "גידולי שדה", "מארזים חקלאיים",
            "שיווק חקלאי", "חקלאות קו עימות", "תוצרת עונתית",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "מושב לימן",
            addressRegion: "גליל מערבי",
            addressCountry: "IL",
          },
        },
      },

      // ── B2B Package Service ───────────────────────────────────────────────
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#b2b-service`,
        name: "מארזים חקלאיים בהתאמה אישית לחברות וארגונים",
        description:
          "שירות בניית מארזי תוצרת חקלאית מותאמים לוועדי עובדים, חברות, ארגונים ונקודות מכירה. ריקי שוסטרמן בונה יחד עם הלקוח מארז הכולל פירות וירקות עונתיים ותוצרת של חקלאי קו העימות — ישירות מהשדה לכל רחבי ישראל.",
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "מארזים חקלאיים עסקיים",
        areaServed: { "@type": "Country", name: "ישראל" },
        audience: {
          "@type": "Audience",
          audienceType: "ועדי עובדים, חברות, ארגונים, נקודות מכירה",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "ILS",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      },

      // ── Corporate Packages Product ───────────────────────────────────────
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#corporate-box`,
        name: "מארז תוצרת חקלאית לחברות",
        description:
          "מארז תוצרת חקלאית טרייה בהתאמה אישית לחברות, ועדי עובדים וארגונים. כולל ירקות ופירות עונתיים ותוצרת של חקלאי קו העימות בצפון. ריקי שוסטרמן בונה יחד עם הלקוח מארז שי בלתי נשכח — ישירות מהשדה לכל רחבי ישראל.",
        image: CONFIG.images.catalogFeature,
        brand: {
          "@type": "Brand",
          name: CONFIG.brand.name,
        },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "מארזים עסקיים / מתנות לחברות",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          priceCurrency: "ILS",
          seller: { "@id": `${SITE_URL}/#organization` },
          url: SITE_URL,
        },
      },

      // ── FAQ Page ─────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: CONFIG.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },

      // ── Web Page ─────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "משק שוסטרמן — מארזים ותוצרת חקלאית מגבול הצפון",
        description:
          "תוצרת חקלאית טרייה שנקטפת ישירות מהשדה במושב לימן, גבול הצפון. מארזים חקלאיים בהתאמה אישית לחברות, ועדי עובדים, ארגונים ונקודות מכירה. ריקי שוסטרמן — חקלאות ישראלית אמיתית מ-2004, ישירות מהשדה לכל הארץ.",
        inLanguage: "he-IL",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "דף הבית",
              item: SITE_URL,
            },
          ],
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "#about", "#catalog", "#testimonials", "#faq"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
