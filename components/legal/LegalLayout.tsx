import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";

interface Props {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

/**
 * The four documents share this frame.
 *
 * Two things it used to get wrong, both visible to visitors:
 *
 * 1. It printed a banner on every one of them — "מסמך זה הוא תבנית בלבד
 *    וטעון בדיקה משפטית לפני פרסום". A site telling its own visitors that its
 *    privacy notice is an untested template is worse than any placeholder
 *    inside it. The documents now say what is and is not verified in their own
 *    words, where it belongs, so the banner is gone.
 *
 * 2. Nothing here linked to the other three. The accessibility statement has
 *    to be reachable from every page, and SiteFooter renders on the home page
 *    only — so from /privacy there was no way to reach it. Hence the row of
 *    links at the foot of every one of these pages.
 */
const DOCUMENTS = [
  { href: "/accessibility", label: "נגישות האתר" },
  { href: "/privacy", label: "מה קורה עם הפרטים שלך" },
  { href: "/cookies", label: "מה נשמר אצלך בדפדפן" },
  { href: "/terms", label: "על האתר הזה" },
] as const;

export function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: "#FAF9F6" }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "rgba(27,67,50,0.6)" }}
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לעמוד הבית
        </Link>

        <header className="mb-10">
          <div className="text-sm font-semibold mb-2" style={{ color: "#BC6C25" }}>{CONFIG.brand.name}</div>
          <h1 className="text-3xl font-black leading-tight" style={{ color: "#1B4332" }}>{title}</h1>
          {lastUpdated && (
            <p className="text-sm mt-3" style={{ color: "rgba(27,67,50,0.4)" }}>
              עודכן לאחרונה: {lastUpdated}
            </p>
          )}
        </header>

        <div
          className="text-base leading-[1.9]"
          style={{ color: "rgba(27,67,50,0.8)" }}
        >
          {children}
        </div>

        <nav
          aria-label="מסמכי האתר"
          className="mt-16 pt-8 border-t"
          style={{ borderColor: "rgba(27,67,50,0.12)" }}
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {DOCUMENTS.filter((d) => d.label !== title).map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="text-sm underline" style={{ color: "rgba(27,67,50,0.6)" }}>
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
