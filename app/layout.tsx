import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { fetchSiteSettings } from "@/lib/sanity";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * The share card WhatsApp, Facebook and X render for a link to the site.
 *
 * The source asset is 1080x1920 — a portrait phone photo. Link previews want a
 * landscape 1.91:1 card, and the tags here used to declare 1200x630 over that
 * portrait file. WhatsApp sized a landscape frame from the declared numbers,
 * received a tall image, and drew its broken-image glyph instead of a preview.
 *
 * Sanity's image CDN crops on the way out, so the asset stays untouched and the
 * URL asks for the shape the card needs. `crop=entropy` keeps the busiest part
 * of the frame rather than a blind centre cut, and q=72 brings the transfer
 * under the ~300KB that WhatsApp will fetch for a preview.
 *
 * OG_W/OG_H below must keep matching these parameters: a second mismatch breaks
 * the card the same way.
 */
const OG_W = 1200;
const OG_H = 630;
const OG_IMAGE =
  "https://cdn.sanity.io/images/amums2vy/production/38b02339732380a61c98f4d7800d0bb7099314f0-1080x1920.jpg" +
  `?w=${OG_W}&h=${OG_H}&fit=crop&crop=entropy&q=72&fm=jpg`;

export const metadata: Metadata = {
  metadataBase: new URL("https://meshek-shusterman.co.il"),
  title: {
    default: "משק שוסטרמן — מארזים ותוצרת חקלאית מגבול הצפון",
    template: "%s | משק שוסטרמן",
  },
  description:
    "ריקי שוסטרמן — תוצרת חקלאית טרייה שנקטפת ישירות מהשדה במושב לימן, גבול הצפון. מארזים חקלאיים בהתאמה אישית לוועדי עובדים, חברות, ארגונים ונקודות מכירה. חקלאות ישראלית אמיתית מ-2004.",
  keywords: [
    "מארזים חקלאיים", "מתנות לחברות", "מתנות עסקיות", "מארזי חג", "מארז שי לחברות",
    "ועד עובדים", "מתנות לעובדים", "תוצרת חקלאית", "תוצרת טרייה", "תוצרת מהשדה",
    "נקודות מכירה", "חקלאות ישראלית", "חקלאי קו עימות", "תמיכה בצפון",
    "משק שוסטרמן", "ריקי שוסטרמן", "מושב לימן", "גבול הצפון", "גליל מערבי",
  ],
  authors: [{ name: "ריקי שוסטרמן", url: "https://meshek-shusterman.co.il" }],
  creator: "ריקי שוסטרמן",
  publisher: "משק שוסטרמן",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://meshek-shusterman.co.il",
    languages: { "he-IL": "https://meshek-shusterman.co.il" },
  },
  openGraph: {
    title: "משק שוסטרמן — מארזים ותוצרת חקלאית מגבול הצפון",
    description:
      "תוצרת חקלאית טרייה שנקטפת ישירות מהשדה במושב לימן, גבול הצפון. מארזים חקלאיים בהתאמה אישית לוועדי עובדים, חברות, ארגונים ונקודות מכירה — ריקי שוסטרמן, חקלאית ישראלית שורשית.",
    locale: "he_IL",
    type: "website",
    siteName: "משק שוסטרמן",
    url: "https://meshek-shusterman.co.il",
    images: [
      {
        url: OG_IMAGE,
        width: OG_W,
        height: OG_H,
        type: "image/jpeg",
        alt: "תוצרת חקלאית ממשק שוסטרמן, מושב לימן, גבול הצפון",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "משק שוסטרמן — מארזים ותוצרת חקלאית",
    description: "תוצרת חקלאית טרייה מהשדה במושב לימן, גבול הצפון. מארזים חקלאיים לחברות, ועדי עובדים ונקודות מכירה — ריקי שוסטרמן.",
    images: [OG_IMAGE],
  },
  other: {
    "geo.region": "IL-HA",
    "geo.placename": "מושב לימן, גליל מערבי, ישראל",
    "geo.position": "33.067;35.136",
    "ICBM": "33.067, 35.136",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Shares the page's query: fetchSiteSettings is cached per request.
  const settings = await fetchSiteSettings();

  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="antialiased">
        <JsonLd contact={settings.contact} />
        {children}
        <AccessibilityWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
