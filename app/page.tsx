import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RickyBot } from "@/components/RickyBot";
import { BoxBuilder } from "@/components/BoxBuilder";
import { fetchPackages, fetchSiteSettings } from "@/lib/sanity";
import { CONFIG } from "@/lib/config";

// ISR: revalidate every hour so client edits appear within ~60 minutes
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch from Sanity (falls back to CONFIG if Sanity not configured)
  const [packages, settings] = await Promise.all([
    fetchPackages(),
    fetchSiteSettings(),
  ]);

  const about = {
    headline: settings.about?.headline ?? CONFIG.about.headline,
    body:     settings.about?.body     ?? CONFIG.about.body,
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-wheat focus:text-forest focus:rounded-lg focus:font-bold"
      >
        דלג לתוכן הראשי
      </a>
      {settings.banner?.visible && settings.banner.text && (
        <div
          role="banner"
          className={`w-full text-center py-2 px-4 text-sm font-semibold text-forest ${settings.banner.color ?? "bg-wheat"}`}
        >
          {settings.banner.text}
        </div>
      )}
      <main id="main-content">
        <HeroSection />
        <AboutSection about={about} />
        <CatalogSection packages={packages} />
        <BoxBuilder />
      </main>
      <SiteFooter />
      <RickyBot />
    </>
  );
}
