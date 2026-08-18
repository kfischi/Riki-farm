// Shared option lists and length limits for the Studio schemas.
// Single source of truth: add a season here and it appears in the editor.
import type { Rule as SanityRule } from "sanity";

export type Rule = SanityRule;

/**
 * Categories / seasons for a gift box.
 * To add a season, add one line here — nothing else needs to change.
 */
export const CATEGORY_OPTIONS = [
  { title: "ליצ'י", value: "lychee" },
  { title: "עונתי", value: "seasonal" },
  { title: "לחברות וארגונים", value: "business" },
  { title: "מקו הגבול", value: "border" },
  { title: "בהתאמה אישית", value: "custom" },
  { title: "מארז חג", value: "holiday" },
];

/**
 * Background colours available for the top banner.
 * Brand palette only — burgundy, its darker shade, the farm greens and
 * neutrals. No yellow, no amber, no wheat: see the brand constraint.
 * Stored as a hex string so the front-end can apply it directly.
 */
export const BANNER_COLOR_OPTIONS = [
  { title: "בורדו (צבע המותג)", value: "#80182c" },
  { title: "בורדו כהה", value: "#5c1120" },
  { title: "ירוק המשק", value: "#1b4332" },
  { title: "ירוק בהיר", value: "#2d6a4f" },
  { title: "חום אדמה", value: "#9a5b2d" },
  { title: "שחור", value: "#12100f" },
];

/** Where a media block appears on the site. */
export const PLACEMENT_OPTIONS = [
  { title: "ראש העמוד (הירו)", value: "hero" },
  { title: "אזור אודות", value: "about" },
  { title: "אזור הקטלוג", value: "catalog" },
  { title: "באנר עליון", value: "top-banner" },
  { title: "תחתית העמוד", value: "footer" },
];

/**
 * Max lengths, tuned to what the layout can hold before it breaks.
 * Applied as warnings, not errors, so a long value is flagged but never
 * blocks the editor from saving.
 */
export const LIMITS = {
  headline: 60,
  tagline: 120,
  ctaLabel: 30,
  bannerText: 100,
  name: 80,
  shortDescription: 200,
  fullDescription: 2000,
  aboutBody: 3000,
  altText: 125,
  internalTitle: 60,
  priceLabel: 40,
};
