import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Package, Video } from "./types";
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
    _id, id, name, description, price, image, tags, order, available
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

export async function fetchPackages(): Promise<Package[]> {
  if (!sanityClient) return CONFIG.packages; // fallback to static config
  try {
    const data: SanityPackage[] = await sanityClient.fetch(PACKAGES_QUERY);
    if (!data?.length) return CONFIG.packages;
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
      };
    });
  } catch (err) {
    console.error("[Sanity] fetchPackages failed, using fallback:", err);
    return CONFIG.packages;
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

export async function fetchSiteSettings(): Promise<SanitySettings> {
  if (!sanityClient) return {};
  try {
    return await sanityClient.fetch(SITE_SETTINGS_QUERY) ?? {};
  } catch (err) {
    console.error("[Sanity] fetchSiteSettings failed:", err);
    return {};
  }
}
