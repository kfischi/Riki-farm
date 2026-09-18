/**
 * Which content types the Studio offers, and which it deliberately withholds.
 *
 * Kept apart from sanity.config.ts so the coverage check can read the same
 * declarations the Studio enforces. Two files each holding their own copy of
 * this list is how a type quietly becomes editable without ever reaching a page.
 */

/** Types that exist exactly once and get a fixed document ID. */
export const SINGLETONS = [
  { type: "siteSettings", title: "הגדרות האתר" },
] as const;

export const SINGLETON_TYPES: ReadonlySet<string> = new Set(
  SINGLETONS.map((s) => s.type),
);

/**
 * Types whose documents exist in the dataset but reach no page:
 *
 *   boxType / boxProduct — feed <BoxBuilder>, which is not mounted on a page.
 *   video / mediaBlock   — no section reads them.
 *
 * Listing a type here is a statement that its absence from the site is
 * intended. Nothing is deleted: the documents stay in the dataset, and removing
 * a type from this list brings its form back once a page renders it.
 */
export const UNRENDERED_TYPES: ReadonlySet<string> = new Set([
  "boxType",
  "boxProduct",
  "video",
  "mediaBlock",
]);

/** A type the editor should not be offered at all. */
export const isHiddenType = (type: string): boolean =>
  SINGLETON_TYPES.has(type) || UNRENDERED_TYPES.has(type);
