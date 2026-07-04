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

const OG_IMAGE = "https://res.cloudinary.com/dptyfvwyo/image/upload/v1783078672/IMG-20260701-WA0082_lmfy0z.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://mashak-shusterman.co.il"),
  title: {
    default: "משק שוסטרמן — ליצ'י טרי ומארזים חקלאיים מגבול הצפון",
    template: "%s | משק שוסטרמן",
  },
  description:
    "ליצ'י טרי שנקטף ישירות מהעצים במושב לימן, גבול הצפון — עסיסי, מתוק ומגיע אליכם תוך שעות. מארזים חקלאיים יוקרתיים לחברות וועדי עובדים. ריקי שוסטרמן, 22 שנות חקלאות.",
  keywords: [
    "ליצ'י טרי", "ליצ'י מהמשק", "ליצ'י ישראלי", "ליצ'י גליל",
    "מארזים חקלאיים", "מתנות לחברות", "מתנות עסקיות", "מארזי חג",
    "ועד עובדים", "מתנות לעובדים", "תוצרת חקלאית", "תוצרת טרייה",
    "משק שוסטרמן", "ריקי שוסטרמן", "מושב לימן", "גבול הצפון", "גליל מערבי",
  ],
  authors: [{ name: "ריקי שוסטרמן", url: "https://mashak-shusterman.co.il" }],
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
    canonical: "https://mashak-shusterman.co.il",
    languages: { "he-IL": "https://mashak-shusterman.co.il" },
  },
  openGraph: {
    title: "משק שוסטרמן — ליצ'י טרי ומארזים חקלאיים מגבול הצפון",
    description:
      "ליצ'י טרי שנקטף ישירות מהעצים במושב לימן — עסיסי, מתוק ומגיע אליכם ישירות מהשדה. מארזים לחברות ויחידים.",
    locale: "he_IL",
    type: "website",
    siteName: "משק שוסטרמן",
    url: "https://mashak-shusterman.co.il",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "ליצ'י טרי ממשק שוסטרמן, מושב לימן, גבול הצפון",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "משק שוסטרמן — ליצ'י טרי ומארזים חקלאיים",
    description: "ליצ'י טרי שנקטף ישירות מהעצים במושב לימן — ישירות מהמשק אליכם.",
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
