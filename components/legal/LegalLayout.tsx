import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";

interface Props {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

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
          <div className="mt-4 p-3 rounded-xl border" style={{ backgroundColor: "rgba(233,196,106,0.2)", borderColor: "rgba(233,196,106,0.4)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(27,67,50,0.7)" }}>
              <strong>הערה:</strong> מסמך זה הוא תבנית בלבד וטעון בדיקה משפטית לפני פרסום.{" "}
            </p>
          </div>
        </header>

        <div
          className="text-base leading-[1.9]"
          style={{ color: "rgba(27,67,50,0.8)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
