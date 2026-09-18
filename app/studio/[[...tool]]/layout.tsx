/**
 * Studio-only layout.
 *
 * The root layout (app/layout.tsx) wraps every route in the site's <body>,
 * its global stylesheet, and two floating site widgets. None of that belongs
 * on the admin screen, and one rule actively breaks the brand constraint:
 * globals.css paints :focus-visible with --wheat (#E9C46A, amber).
 *
 * The overrides below hang off .studio-root — an element this file renders —
 * rather than any Sanity internal, and they leave the public site untouched.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="studio-root">
      <style>{`
        /* Sanity Studio owns the full viewport; the site's body rules fight it. */
        body:has(.studio-root) {
          background: #fff;
          overflow-x: visible;
        }

        /* Amber focus ring from globals.css — replaced with the burgundy accent. */
        body:has(.studio-root) :focus-visible {
          outline: 2px solid #80182c;
          outline-offset: 1px;
        }

        /*
         * The root layout renders AccessibilityWidget and CookieBanner as direct
         * children of <body>; both carry .no-print. They overlay the Studio and
         * have no meaning on an admin screen.
         */
        body:has(.studio-root) > .no-print {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  );
}
