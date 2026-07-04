import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { Leaf, MapPin, Phone, Mail, Star } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.47 1.68 6.34L3 29l6.84-1.65A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm6.37 18.17c-.26.72-1.52 1.38-2.07 1.42-.52.04-1.02.23-3.44-.72-2.9-1.13-4.76-4.07-4.9-4.26-.14-.2-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .42-.07.65.5l.84 2.07c.1.22.06.48-.07.68l-.37.54c-.14.2-.28.41-.12.7.46.85 1.14 1.7 1.96 2.38.84.7 1.7 1.02 2.12 1.14.3.08.54-.03.74-.26l.53-.63c.2-.23.44-.28.69-.18l2.1.98c.25.12.41.18.47.27.07.1.07.56-.19 1.29z"/>
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const reviewUrl = `https://search.google.com/local/writereview?placeid=${CONFIG.googlePlaceId}`;

  return (
    <footer className="py-16 px-6" style={{ backgroundColor: "#1B4332", color: "white" }}>
      <div className="max-w-7xl mx-auto px-2 md:px-16">
        <div
          className="grid gap-12 pb-12 border-b"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", borderColor: "rgba(255,255,255,0.1)" }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5" style={{ color: "#E9C46A" }} />
              <span className="font-black text-2xl">{CONFIG.brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{CONFIG.brand.tagline}</p>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-colors"
              style={{ backgroundColor: "#25D366" }}
              aria-label="צור/י קשר עם ריקי בוואטסאפ"
            >
              <WhatsAppIcon className="w-4 h-4" />
              וואטסאפ עם ריקי
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/share/1BtRYnhYM9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="עמוד הפייסבוק שלנו"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95"
                style={{ backgroundColor: "#1877F2", color: "white" }}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="וואטסאפ"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95"
                style={{ backgroundColor: "#25D366", color: "white" }}
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="ניווט ראשי - תחתית">
            <h2 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>ניווט</h2>
            <ul className="space-y-2.5">
              {[
                { href: "#", label: "עמוד הבית" },
                { href: "#about", label: "אודות המשק" },
                { href: "#catalog", label: "הקטלוג" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="קישורים משפטיים">
            <h2 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>מידע משפטי</h2>
            <ul className="space-y-2.5">
              {[
                { href: "/accessibility", label: "הצהרת נגישות" },
                { href: "/privacy", label: "מדיניות פרטיות" },
                { href: "/cookies", label: "מדיניות עוגיות" },
                { href: "/terms", label: "תקנון ותנאי שימוש" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* NAP — Name / Address / Phone */}
          <address className="not-italic">
            <h2 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>פנו אלינו</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#E9C46A" }} />
                <span>{CONFIG.legal.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#E9C46A" }} />
                <a href={`tel:${CONFIG.legal.contactPhone}`} className="hover:text-white transition-colors">
                  {CONFIG.legal.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#E9C46A" }} />
                <a href={`mailto:${CONFIG.legal.contactEmail}`} className="hover:text-white transition-colors">
                  {CONFIG.legal.contactEmail}
                </a>
              </li>
            </ul>

            {/* Google Review CTA */}
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "rgba(233,196,106,0.15)", color: "#E9C46A", border: "1px solid rgba(233,196,106,0.3)" }}
              aria-label="כתבו לנו ביקורת בגוגל"
            >
              <Star className="w-4 h-4 fill-current" />
              כתבו לנו ביקורת בגוגל
            </a>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <p>
            © {year} {CONFIG.legal.companyLegalName}
          </p>
          <p>
            {CONFIG.brand.name} | {CONFIG.legal.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
