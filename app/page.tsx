import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RickyBot } from "@/components/RickyBot";

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-wheat focus:text-forest focus:rounded-lg focus:font-bold"
      >
        דלג לתוכן הראשי
      </a>
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <CatalogSection />
      </main>
      <SiteFooter />
      <RickyBot />
    </>
  );
}
