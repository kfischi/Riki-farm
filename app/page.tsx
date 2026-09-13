import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RickyBot } from "@/components/RickyBot";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { fetchPackages, fetchSiteSettings } from "@/lib/sanity";
import { CONFIG } from "@/lib/config";

// 60s so an edit in the Studio appears within a minute even if the
// revalidate webhook is not registered. The webhook makes it immediate.
export const revalidate = 60;

export default async function HomePage() {
  const [packages, settings] = await Promise.all([
    fetchPackages(),
    fetchSiteSettings(),
  ]);

  const about = {
    headline: settings.about?.headline ?? CONFIG.about.headline,
    body: settings.about?.body ?? CONFIG.about.body,
  };

  // The banner shows only when it is switched on, actually holds text, and
  // has not passed its end date. Without the date check a forgotten banner
  // would run forever. Resolution is the ISR window, so it disappears within
  // a minute of expiring.
  const banner = settings.banner;
  const bannerText = banner?.text?.trim();
  const bannerLive =
    banner?.visible === true &&
    !!bannerText &&
    (!banner.expiresAt || new Date(banner.expiresAt) > new Date());
  // Every colour offered in the Studio is a dark brand shade, so white text
  // stays readable on all of them. Burgundy is the default.
  const bannerColor = banner?.color || "#80182c";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-wheat focus:text-forest focus:rounded-lg focus:font-bold"
      >
        דלג לתוכן הראשי
      </a>
      <SiteNav />
      {bannerLive && (
        <div
          role="banner"
          className="w-full text-center py-2 px-4 text-sm font-semibold text-white"
          style={{ backgroundColor: bannerColor }}
        >
          {bannerText}
        </div>
      )}
      <main id="main-content">
        <HeroSection hero={settings.hero} whatsappNumber={settings.contact?.whatsapp} />
        <SocialProofStrip />
        <AboutSection about={about} />
        <CatalogSection packages={packages} />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <SiteFooter contact={settings.contact} />
      <RickyBot />
      <WhatsAppFloat />
      <StickyOrderBar />
    </>
  );
}
