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
        alternateName: ["משק שוסטרמן", "Meshek Shusterman", "ריקי שוסטרמן"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: CONFIG.rickyAvatar,
          caption: "ריקי שוסטרמן, חקלאית, מושב לימן",
        },
        image: CONFIG.seo.ogImage,
        description:
          "משק שוסטרמן, מושב לימן — ריקי שוסטרמן, חקלאית עם 22 שנות ניסיון. מגדלת ליצ'י טרי ומוכרת מארזים חקלאיים עונתיים לחברות ויחידים ישירות מהשדה.",
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
        areaServed: {
          "@type": "Country",
          name: "ישראל",
        },
        servesCuisine: "Fresh Farm Produce",
        sameAs: [
          `https://wa.me/${CONFIG.whatsappNumber}`,
        ],
        founder: {
          "@type": "Person",
          name: "ריקי שוסטרמן",
          jobTitle: "חקלאית",
          knowsAbout: ["חקלאות", "ליצ'י", "גידולי שדה", "מארזים חקלאיים"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "מושב לימן",
            addressRegion: "גליל מערבי",
            addressCountry: "IL",
          },
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
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          priceCurrency: "ILS",
          seller: { "@id": `${SITE_URL}/#organization` },
          url: SITE_URL,
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
        ],
      },

      // ── Corporate Packages Product ───────────────────────────────────────
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#corporate-box`,
        name: "מארז תוצרת חקלאית לחברות",
        description:
          "מארז תוצרת טרייה בהתאמה אישית לחברות, ועדי עובדים וארגונים. ליצ'י, ירקות, פירות עונתיים ועוד — ריקי בונה יחד איתכם.",
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
          "ליצ'י טרי שנקטף ישירות מהעצים במושב לימן, גבול הצפון. מארזים חקלאיים לחברות וועדי עובדים. ריקי שוסטרמן — 22 שנות חקלאות.",
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
          cssSelector: ["h1", "h2", "#about", "#catalog"],
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
