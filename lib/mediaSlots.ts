/**
 * The image positions on the site that an editor can fill from the Studio.
 *
 * One table, read by three places that must never disagree:
 *
 *   · sanity/schemas/mediaBlock.ts — the dropdown the editor picks from
 *   · lib/sanity.ts                — the crop it asks Sanity for
 *   · the sections themselves      — where each slot lands in the layout
 *
 * Two copies of this list is how a slot becomes pickable in the Studio and
 * reaches no page: the failure this repo already has three entries for. So the
 * slot ids live here and nowhere else.
 *
 * `aspect` is what the layout actually gives the image, and it is not
 * decoration: Sanity honours the hotspot only when the URL asks for a sized
 * crop. Requesting no size returns the whole frame, the CSS crops it centrally,
 * and the hotspot control in the Studio becomes a knob that does nothing.
 *
 * `span` is the grid width of a collage cell, and is what the aspect is derived
 * from — so moving a cell in the grid moves its crop with it.
 */

export type MediaSlot =
  | "about-primary"
  | "about-north"
  | "collage-1"
  | "collage-2"
  | "collage-3"
  | "collage-4"
  | "collage-5"
  | "package-fallback";

export interface MediaSlotSpec {
  slot: MediaSlot;
  /** Shown in the Studio dropdown. Describes the position, never the photo
   *  currently in it — the whole point is that the photo changes. */
  title: string;
  /** Requested crop, in pixels. Ratio matters; the absolute size is the cap. */
  aspect: { width: number; height: number };
  /** Collage cells only: columns out of six. */
  span?: number;
}

const WIDE = { width: 1800, height: 600 };   // 3:1 — the double-width cell
const CELL = { width: 900, height: 600 };    // 3:2 — a normal collage cell
const TALL = { width: 900, height: 1200 };   // 3:4 — the portrait in "about"
const LAND = { width: 1200, height: 900 };   // 4:3 — the landscape in "about"
const CARD = { width: 1200, height: 900 };   // 4:3 — a package card

export const MEDIA_SLOTS: readonly MediaSlotSpec[] = [
  { slot: "about-primary", title: "אזור אודות — התמונה לאורך (למעלה)", aspect: TALL },
  { slot: "about-north",   title: "אזור אודות — התמונה לרוחב (למטה)",  aspect: LAND },
  { slot: "collage-1",     title: "קולאז' הקטלוג — תמונה 1",           aspect: CELL, span: 2 },
  { slot: "collage-2",     title: "קולאז' הקטלוג — תמונה 2 (רחבה)",    aspect: WIDE, span: 4 },
  { slot: "collage-3",     title: "קולאז' הקטלוג — תמונה 3",           aspect: CELL, span: 2 },
  { slot: "collage-4",     title: "קולאז' הקטלוג — תמונה 4",           aspect: CELL, span: 2 },
  { slot: "collage-5",     title: "קולאז' הקטלוג — תמונה 5",           aspect: CELL, span: 2 },
  // Not a position on the page but a stand-in: it shows on every package card
  // whose own photo is still missing. See lib/sanity.ts.
  { slot: "package-fallback", title: "תמונת ברירת מחדל למארז ללא תמונה", aspect: CARD },
] as const;

/** The dropdown, in the shape Sanity's `options.list` wants. */
export const MEDIA_SLOT_OPTIONS = MEDIA_SLOTS.map(({ slot, title }) => ({
  title,
  value: slot,
}));

export const MEDIA_SLOT_SPECS: ReadonlyMap<MediaSlot, MediaSlotSpec> = new Map(
  MEDIA_SLOTS.map((s) => [s.slot, s]),
);

/** The five collage cells, in the order the grid lays them out. */
export const COLLAGE_SLOTS = MEDIA_SLOTS.filter((s) => s.span !== undefined);

/** The stand-in shown on a package card that has no photo of its own. */
export const PACKAGE_FALLBACK_SLOT = "package-fallback" as const;

/** One filled slot, resolved down to what an `<Image>` needs. */
export interface ResolvedMedia {
  url: string;
  alt?: string;
}

/** Slot → image, for whichever slots an editor has actually filled. */
export type SiteMedia = Partial<Record<MediaSlot, ResolvedMedia>>;
