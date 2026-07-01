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

const OG_IMAGE = "https://res.cloudinary.com/dptyfvwyo/image/upload/v1780053629/Gemini_Generated_Image_fu702yfu702yfu70_v41c7p.png";

export const metadata: Metadata = {
  // 🔴 REPLACE with real domain before launch
  metadataBase: new URL("https://mashak-shusterman.co.il"),
  title: "משק שוסטרמן — מארזים חקלאיים יוקרתיים לחברות",
  description:
    "מארזים חקלאיים יוקרתיים לחברות וארגונים — תוצרת טרייה ומובחרת ישירות מהמשק. מתנות עסקיות ייחודיות לחגים ולאירועים.",
  keywords: "מארזים חקלאיים, מתנות לחברות, מתנות עסקיות, מארזי חג, תוצרת חקלאית, משק שוסטרמן, ריקי שוסטרמן, מושב לימן",
  openGraph: {
    title: "משק שוסטרמן — מארזים חקלאיים יוקרתיים",
    description: "מארזים חקלאיים יוקרתיים לחברות — תוצרת טרייה ומובחרת ישירות מהמשק.",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "משק שוסטרמן — מארזים חקלאיים יוקרתיים מגבול הצפון",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "משק שוסטרמן — מארזים חקלאיים יוקרתיים",
    description: "מארזים חקלאיים לחברות — תוצרת טרייה ישירות מהמשק.",
    images: [OG_IMAGE],
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
