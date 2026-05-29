import { CONFIG } from "@/lib/config";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${CONFIG.seo.siteUrl}/#organization`,
        name: CONFIG.brand.name,
        url: CONFIG.seo.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: CONFIG.rickyAvatar,
        },
        image: CONFIG.seo.ogImage,
        description: CONFIG.about.body,
        address: {
          "@type": "PostalAddress",
          addressLocality: "מושב לימן",
          addressRegion: "גליל מערבי",
          addressCountry: "IL",
          streetAddress: CONFIG.legal.address,
        },
        telephone: CONFIG.legal.contactPhone,
        email: CONFIG.legal.contactEmail,
        priceRange: "₪₪",
        sameAs: [`https://wa.me/${CONFIG.whatsappNumber}`],
        // 🔴 Uncomment and update once real Google reviews are live:
        // aggregateRating: {
        //   "@type": "AggregateRating",
        //   ratingValue: "4.9",
        //   reviewCount: "47",
        //   bestRating: "5",
        //   worstRating: "1",
        // },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
