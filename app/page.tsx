import { HeroSection } from "@/components/sections/HeroSection";
import { USPStrip } from "@/components/sections/USPStrip";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RickyBot } from "@/components/RickyBot";
import { BoxBuilder } from "@/components/BoxBuilder";
import { LycheeSpotlight } from "@/components/sections/LycheeSpotlight";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { fetchPackages, fetchSiteSettings } from "@/lib/sanity";
import { CONFIG } from "@/lib/config";

export const revalidate = 3600;

export default async function HomePage() {
  const [packages, settings] = await Promise.all([
    fetchPackages(),
    fetchSiteSettings(),
  ]);

  const about = {
    headline: settings.about?.headline ?? CONFIG.about.headline,
    body: settings.about?.body ?? CONFIG.about.body,
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-wheat focus:text-forest focus:rounded-lg focus:font-bold"
      >
        דלג לתוכן הראשי
      </a>
      <SiteNav />
      {settings.banner?.visible && settings.banner.text && (
        <div
          role="banner"
          className="w-full text-center py-2 px-4 text-sm font-semibold text-forest bg-wheat"
        >
          {settings.banner.text}
        </div>
      )}
      <main id="main-content">
        <HeroSection />
        <USPStrip />
        <LycheeSpotlight />
        <SocialProofStrip />
        <AboutSection about={about} />
        <CatalogSection packages={packages} />
        <BoxBuilder />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <SiteFooter />
      <RickyBot />
      <WhatsAppFloat />
      <StickyOrderBar />
    </>
  );
}
