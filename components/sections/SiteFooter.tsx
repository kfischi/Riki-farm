import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { MessageCircle, Leaf, MapPin, Phone, Mail, Star } from "lucide-react";

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
              <span className="font-black text-xl">{CONFIG.brand.name}</span>
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
              <MessageCircle className="w-4 h-4" />
              וואטסאפ עם ריקי
            </a>
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
            © {year} {CONFIG.legal.companyLegalName} | {CONFIG.legal.companyId}
          </p>
          <p>
            {CONFIG.brand.name} | {CONFIG.legal.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
