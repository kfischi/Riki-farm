import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "משק שוסטרמן — מארזים חקלאיים יוקרתיים לחברות",
  description:
    "מארזים חקלאיים יוקרתיים לחברות וארגונים — תוצרת טרייה ומובחרת ישירות מהמשק. מתנות עסקיות ייחודיות לחגים ולאירועים.",
  keywords: "מארזים חקלאיים, מתנות לחברות, מתנות עסקיות, מארזי חג, תוצרת חקלאית",
  openGraph: {
    title: "משק שוסטרמן — מארזים חקלאיים יוקרתיים",
    description: "מארזים חקלאיים יוקרתיים לחברות — תוצרת טרייה ומובחרת ישירות מהמשק.",
    locale: "he_IL",
    type: "website",
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
        {children}
        <AccessibilityWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
