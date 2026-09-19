import { CONFIG } from "@/lib/config";

const SITE_URL = CONFIG.seo.siteUrl;

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Website entity ──────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CONFIG.brand.name,
        description: "ליצ'י טרי ומארזים חקלאיים מגבול הצפון — משק שוסטרמן, מושב לימן",
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
          "משק שוסטרמן במושב לימן, גבול הצפון — ריקי שוסטרמן, חקלאית עם למעלה מ-22 שנות ניסיון. מגדלים ומשווקים ליצ'י טרי ומארזים חקלאיים בהתאמה אישית, ישירות מהשדה. מספקים לוועדי עובדים, חברות, ארגונים ונקודות מכירה בכל רחבי ישראל. המארזים משלבים תוצרת משקית עם גידולים מובחרים של חקלאי קו העימות, מתוך ערבות הדדית ותמיכה בחקלאות הצפון.",
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
        telephone: CONFIG.legal.contactPhone,
        email: CONFIG.legal.contactEmail,
        priceRange: "₪₪",
        currenciesAccepted: "ILS",
        paymentAccepted: "העברה בנקאית",
        areaServed: [
          { "@type": "Country", name: "ישראל" },
          { "@type": "State", name: "גליל מערבי" },
          { "@type": "State", name: "גבול הצפון" },
        ],
        servesCuisine: ["ליצ'י טרי", "תוצרת חקלאית עונתית", "מארזים בהתאמה אישית"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "מארזים ותוצרת משק שוסטרמן",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "ליצ'י טרי מהמשק" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "מארז תוצרת חקלאית לחברות" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "מארז שי בהתאמה אישית לוועד עובדים" } },
          ],
        },
        sameAs: [
          `https://wa.me/${CONFIG.whatsappNumber}`,
          "https://www.facebook.com/share/1BtRYnhYM9/",
        ],
        keywords: "ליצ'י טרי, מארזים חקלאיים, ועד עובדים, נקודות מכירה, גבול הצפון, מושב לימן, חקלאות ישראלית",
        founder: {
          "@type": "Person",
          name: "ריקי שוסטרמן",
          jobTitle: "חקלאית",
          description: "חקלאית ותושבת מושב לימן מזה למעלה מ-22 שנה, בוגרת מגמת גידולי שדה בבית הספר החקלאי נהלל.",
          knowsAbout: [
            "חקלאות", "ליצ'י", "גידולי שדה", "מארזים חקלאיים",
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
          "שירות בניית מארזי תוצרת חקלאית מותאמים לוועדי עובדים, חברות, ארגונים ונקודות מכירה. ריקי שוסטרמן בונה יחד עם הלקוח מארז הכולל ליצ'י, פירות וירקות עונתיים ותוצרת של חקלאי קו העימות — ישירות מהשדה לכל רחבי ישראל.",
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

      // ── Lychee Product ──────────────────────────────────────────────────
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#lychee-fresh`,
        name: "ליצ'י טרי מהמשק",
        description:
          "ליצ'י מובחר שנקטף ישירות מהעצים במושב לימן, גבול הצפון. מגיע אליכם עסיסי, מתוק וטעים בטירוף — ישירות מהשדה תוך שעות.",
        image: CONFIG.seo.ogImage,
        brand: {
          "@type": "Brand",
          name: CONFIG.brand.name,
        },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "פירות טרופיים / ליצ'י",
        countryOfOrigin: {
          "@type": "Country",
          name: "ישראל",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "ILS",
          lowPrice: "30",
          highPrice: "100",
          offerCount: "2",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE_URL}/#organization` },
          url: SITE_URL,
          offers: [
            {
              "@type": "Offer",
              name: "1 ק\"ג ליצ'י טרי",
              price: "30",
              priceCurrency: "ILS",
              availability: "https://schema.org/InStock",
              seller: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "Offer",
              name: "4 ק\"ג ליצ'י טרי",
              price: "100",
              priceCurrency: "ILS",
              availability: "https://schema.org/InStock",
              seller: { "@id": `${SITE_URL}/#organization` },
            },
          ],
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "מקור",
            value: "מושב לימן, גבול הצפון, ישראל",
          },
          {
            "@type": "PropertyValue",
            name: "אופן גידול",
            value: "חקלאות מסורתית ללא חומרי שימור",
          },
          {
            "@type": "PropertyValue",
            name: "עונת מכירה",
            value: "יוני–אוגוסט",
          },
          {
            "@type": "PropertyValue",
            name: "מחיר",
            value: "₪30 לק\"ג | 4 ק\"ג ב-₪100",
          },
        ],
      },

      // ── Corporate Packages Product ───────────────────────────────────────
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#corporate-box`,
        name: "מארז תוצרת חקלאית לחברות",
        description:
          "מארז תוצרת חקלאית טרייה בהתאמה אישית לחברות, ועדי עובדים וארגונים. כולל ליצ'י מובחר, ירקות ופירות עונתיים ותוצרת של חקלאי קו העימות בצפון. ריקי שוסטרמן בונה יחד עם הלקוח מארז שי בלתי נשכח — ישירות מהשדה לכל רחבי ישראל.",
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
        name: "משק שוסטרמן — ליצ'י טרי ומארזים חקלאיים מגבול הצפון",
        description:
          "ליצ'י טרי שנקטף ישירות מהעצים במושב לימן, גבול הצפון. מארזים חקלאיים בהתאמה אישית לחברות, ועדי עובדים, ארגונים ונקודות מכירה. ריקי שוסטרמן — חקלאות ישראלית אמיתית מ-2004, ישירות מהשדה לכל הארץ.",
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
