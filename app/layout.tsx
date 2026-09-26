import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";

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

const OG_IMAGE = "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783772618/3_qw4w3h.jpg";

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
        width: 1200,
        height: 630,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="antialiased">
        <JsonLd />
        {children}
        <AccessibilityWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
