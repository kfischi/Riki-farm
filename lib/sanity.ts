import { cache } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Package, Video, FAQItem, TestimonialScreenshot } from "./types";
import { MEDIA_SLOT_SPECS, type MediaSlot, type SiteMedia } from "./mediaSlots";
import { resolveWhatsapp } from "./contact";
import { CONFIG } from "./config";

// ===== Client =====
// These two names are shared with the embedded Studio, which runs in the
// browser and therefore needs the NEXT_PUBLIC_ prefix. They are identifiers,
// not secrets.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * No token is sent, deliberately.
 *
 * The dataset is public (aclMode: public), so every read this site performs
 * succeeds anonymously. A token adds nothing — and a token belonging to some
 * other project turns a request that would have worked into a hard failure:
 * Sanity answers "Unauthorized - Session does not match project host", the
 * fallbacks below absorb it, and the site silently shows its hardcoded copy as
 * if the CMS were empty. That is exactly what happened in production.
 *
 * Reading SANITY_API_READ_TOKEN here would make the site depend on a variable
 * nobody needs to set correctly, for a case that does not exist yet. If the
 * dataset is ever made private, add the token back together with that change.
 */

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      // Caching is handled by ISR + the revalidate webhook. Going through the
      // CDN as well would add a second, uncontrolled layer of staleness on top
      // of it, so a publish could take longer than the promised minute.
      useCdn: false,
    })
  : null;

// ===== Image URL builder =====
/**
 * An image field as Sanity stores it: a reference to the uploaded asset, plus
 * the optional crop the editor set and the alt text entered beside it.
 */
export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function sanityImageUrl(source?: SanityImage | null): string | null {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}

/**
 * A crop of a fixed shape, which is what makes the Studio's hotspot mean
 * something: `fit: crop` keeps the point the editor marked inside the frame.
 * Asking for no size returns the whole image and lets CSS centre-crop it, and
 * the hotspot control silently stops mattering.
 */
export function sanityImageCrop(
  source: SanityImage | null | undefined,
  width: number,
  height: number,
): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(width).height(height).fit("crop").auto("format").url();
}

// ===== TypeScript types matching Sanity schemas =====
export interface SanityPackage {
  _id: string;
  id: { current: string };
  name: string;
  description?: string;
  price?: string;
  image?: SanityImage;
  tags?: string[];
  order?: number;
  available?: boolean;
  orderUrl?: string;
}

export interface SanityBoxType {
  _id: string;
  id: { current: string };
  name: string;
  basePrice: number;
  image?: SanityImage;
  order?: number;
}

export interface SanityBoxProduct {
  _id: string;
  id: { current: string };
  name: string;
  unitPrice: number;
  image?: SanityImage;
  available?: boolean;
  order?: number;
}

export interface SanityVideo {
  _id: string;
  id: { current: string };
  title: string;
  url: string;
  thumbnail?: string;
  order?: number;
}

export interface SanityTestimonial {
  _id: string;
  image?: SanityImage;
  order?: number;
}

export interface SanityMediaBlock {
  _id: string;
  slot?: string;
  image?: SanityImage;
  active?: boolean;
}

export interface SanityFaqItem {
  _id: string;
  question?: string;
  answer?: string;
  order?: number;
}

export interface SanitySettings {
  about?: {
    headline?: string;
    intro?: string;
    quote?: string;
    subheading?: string;
    story?: string;
    closingQuote?: string;
    body?: string;
  };
  hero?: { headline?: string; tagline?: string; ctaLabel?: string; ctaHref?: string };
  contact?: { phone?: string; whatsapp?: string; email?: string };
  banner?: {
    visible?: boolean;
    text?: string;
    /** Hex value picked from the brand list in the Studio. */
    color?: string;
    /** ISO date; after it the banner stops showing. */
    expiresAt?: string;
  };
}

// ===== GROQ Queries =====
const PACKAGES_QUERY = `
  *[_type == "package" && available != false] | order(order asc) {
    _id, id, name, description, price, image, tags, order, available, orderUrl
  }
`;

const BOX_TYPES_QUERY = `
  *[_type == "boxType"] | order(order asc) {
    _id, id, name, basePrice, image, order
  }
`;

const BOX_PRODUCTS_QUERY = `
  *[_type == "boxProduct" && available != false] | order(order asc) {
    _id, id, name, unitPrice, image, available, order
  }
`;

const VIDEOS_QUERY = `
  *[_type == "video"] | order(order asc) {
    _id, id, title, url, thumbnail, order
  }
`;

const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && available != false] | order(order asc) {
    _id, image, order, available
  }
`;

const FAQ_QUERY = `
  *[_type == "faqItem" && available != false] | order(order asc) {
    _id, question, answer, order, available
  }
`;

// Ordered oldest-first so a later edit to the same slot wins the reduce below,
// which is what the Studio field promises.
const MEDIA_QUERY = `
  *[_type == "mediaBlock" && active != false] | order(_updatedAt asc) {
    _id, slot, image, active
  }
`;

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    about, hero, contact, banner
  }
`;

// ===== Fetch helpers with graceful fallbacks =====

/**
 * Photos that already ship with the site, keyed by package id.
 * A package migrated into Sanity without its photo still renders the real
 * one from here, rather than a placeholder.
 */
const STATIC_PACKAGE_IMAGES = new Map(
  [...CONFIG.packages, ...CONFIG.borderPackages]
    .filter((p) => p.image)
    .map((p) => [p.id, p.image] as const),
);

/** Last-resort image. Brand palette only — no yellow, no amber. */
function placeholderImage(label: string): string {
  return `https://placehold.co/400x300/80182c/FFFFFF?text=${encodeURIComponent(label)}`;
}

/**
 * Where a package's order button goes.
 *
 * The Studio's link wins. With none, the button opens WhatsApp with the
 * package already named in the message — so a package nobody has given a link
 * still gets a button that says which package it is, and Ricky can tell the
 * orders apart without asking.
 *
 * The greeting is the one lib/botEngine.ts already sends when it hands an
 * order over, so the two routes read the same on her phone.
 */
function packageOrderHref(orderUrl: string | undefined, name: string, whatsapp: string): string {
  const explicit = orderUrl?.trim();
  if (explicit) return explicit;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(`שלום ריקי! 👋 אשמח להזמין: ${name}`)}`;
}

export async function fetchPackages(): Promise<Package[]> {
  // Shares the page's settings query — fetchSiteSettings is cached per request.
  const whatsapp = resolveWhatsapp((await fetchSiteSettings()).contact?.whatsapp);
  const shipped = (): Package[] =>
    CONFIG.packages.map((p) => ({
      ...p,
      orderHref: packageOrderHref(undefined, p.name, whatsapp),
    }));

  if (!sanityClient) return shipped();
  try {
    const data: SanityPackage[] = await sanityClient.fetch(PACKAGES_QUERY);
    if (!data?.length) return shipped();
    return data.map((p) => {
      const id = p.id?.current ?? p._id;
      return {
        id,
        name:        p.name,
        description: p.description ?? "",
        price:       p.price,
        image:
          sanityImageUrl(p.image) ??
          STATIC_PACKAGE_IMAGES.get(id) ??
          placeholderImage(p.name),
        // Only meaningful alongside a Sanity image: the static and placeholder
        // fallbacks are not the picture the editor described.
        imageAlt:    sanityImageUrl(p.image) ? p.image?.alt?.trim() || undefined : undefined,
        tags:        p.tags ?? [],
        orderHref:   packageOrderHref(p.orderUrl, p.name, whatsapp),
      };
    });
  } catch (err) {
    console.error("[Sanity] fetchPackages failed, using fallback:", err);
    return shipped();
  }
}

/**
 * The photos an editor has placed, keyed by slot.
 *
 * Returns only the slots that are actually filled. Each section falls back
 * slot by slot, so one uploaded photo replaces exactly one photo — unlike the
 * all-or-nothing lists, where an empty dataset means "use the shipped copy".
 * There is nothing to migrate here and no trap in leaving it empty.
 *
 * A row whose slot is not in MEDIA_SLOTS is dropped: that is a slot removed
 * from the layout with its document left behind, and rendering it would put a
 * photo somewhere the grid no longer has a cell for.
 */
export async function fetchSiteMedia(): Promise<SiteMedia> {
  if (!sanityClient) return {};
  try {
    const data: SanityMediaBlock[] = await sanityClient.fetch(MEDIA_QUERY);
    const media: SiteMedia = {};
    for (const row of data ?? []) {
      const spec = MEDIA_SLOT_SPECS.get(row.slot as MediaSlot);
      if (!spec) continue;
      const url = sanityImageCrop(row.image, spec.aspect.width, spec.aspect.height);
      if (!url) continue;
      media[spec.slot] = { url, alt: row.image?.alt?.trim() || undefined };
    }
    return media;
  } catch (err) {
    console.error("[Sanity] fetchSiteMedia failed, using the shipped photos:", err);
    return {};
  }
}

export async function fetchBoxTypes(): Promise<SanityBoxType[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch(BOX_TYPES_QUERY) ?? [];
  } catch (err) {
    console.error("[Sanity] fetchBoxTypes failed:", err);
    return [];
  }
}

export async function fetchBoxProducts(): Promise<SanityBoxProduct[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch(BOX_PRODUCTS_QUERY) ?? [];
  } catch (err) {
    console.error("[Sanity] fetchBoxProducts failed:", err);
    return [];
  }
}

export async function fetchVideos(): Promise<Video[]> {
  if (!sanityClient) return CONFIG.videos;
  try {
    const data: SanityVideo[] = await sanityClient.fetch(VIDEOS_QUERY);
    if (!data?.length) return CONFIG.videos;
    return data.map((v) => ({
      id:        v.id?.current ?? v._id,
      title:     v.title,
      url:       v.url,
      thumbnail: v.thumbnail ?? placeholderImage(v.title),
    }));
  } catch (err) {
    console.error("[Sanity] fetchVideos failed, using fallback:", err);
    return CONFIG.videos;
  }
}

/**
 * Wrapped in React's `cache` because two server components now ask for it in
 * the same render: the page, for the section copy, and the root layout, for
 * the contact details the structured data carries. `cache` collapses that to
 * one query per request. Without it the layout would issue a second identical
 * round trip on every render — @sanity/client does its own fetching, so
 * nothing else dedupes it.
 */
export const fetchSiteSettings = cache(async function fetchSiteSettings(): Promise<SanitySettings> {
  if (!sanityClient) return {};
  try {
    return await sanityClient.fetch(SITE_SETTINGS_QUERY) ?? {};
  } catch (err) {
    console.error("[Sanity] fetchSiteSettings failed:", err);
    return {};
  }
});

/**
 * Customer-feedback screenshots for the "מה אומרים עלינו" section.
 *
 * Falls back to the screenshots that ship with the site, so an empty dataset
 * — or an unreachable one — leaves the section exactly as it is today rather
 * than blanking it.
 */
export async function fetchTestimonials(): Promise<TestimonialScreenshot[]> {
  if (!sanityClient) return [];
  try {
    const data: SanityTestimonial[] = await sanityClient.fetch(TESTIMONIALS_QUERY);
    if (!data?.length) return [];
    const shots: TestimonialScreenshot[] = [];
    for (const t of data) {
      const image = sanityImageUrl(t.image);
      // A testimonial is its picture; without one there is nothing to show.
      if (image) shots.push({ id: t._id, image, alt: t.image?.alt?.trim() || undefined });
    }
    return shots;
  } catch (err) {
    console.error("[Sanity] fetchTestimonials failed, using fallback:", err);
    return [];
  }
}

/** FAQ entries. An empty result keeps the questions that ship with the site. */
export async function fetchFaq(): Promise<FAQItem[]> {
  if (!sanityClient) return CONFIG.faq;
  try {
    const data: SanityFaqItem[] = await sanityClient.fetch(FAQ_QUERY);
    if (!data?.length) return CONFIG.faq;
    return data
      .filter((f) => f.question?.trim() && f.answer?.trim())
      .map((f) => ({ id: f._id, question: f.question!.trim(), answer: f.answer!.trim() }));
  } catch (err) {
    console.error("[Sanity] fetchFaq failed, using fallback:", err);
    return CONFIG.faq;
  }
}
