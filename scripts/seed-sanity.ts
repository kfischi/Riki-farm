/**
 * One-off migration: move the site's existing content from lib/config.ts
 * (and the two static arrays in components/BoxBuilder.tsx) into Sanity.
 *
 * Every value here is copied verbatim from the repo. Nothing is invented.
 * Where the repo has no value for a schema field, the field is left out and
 * reported under "שדות לא מולאו" at the end of the run.
 *
 * Usage:
 *   node --experimental-strip-types scripts/seed-sanity.ts            # dry run
 *   node --experimental-strip-types scripts/seed-sanity.ts --commit   # writes
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN        (Editor permission — not the read token)
 *
 * Documents use deterministic _id values and createIfNotExists, so running
 * this twice never overwrites anything the editor has since changed.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { CONFIG } from "../lib/config.ts";
import type { BoxProduct } from "../lib/pricing.ts";

const COMMIT = process.argv.includes("--commit");
// --json prints the exact document payloads without contacting Sanity.
// Used when the network cannot reach the API and the documents must be
// created through another channel.
const JSON_ONLY = process.argv.includes("--json");

// ---------------------------------------------------------------- env

function loadEnvLocal() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    // .env.local is optional when the variables are already exported
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("חסר NEXT_PUBLIC_SANITY_PROJECT_ID");
if (COMMIT && !token) throw new Error("חסר SANITY_API_WRITE_TOKEN — נדרש להרצה עם --commit");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------- sources
//
// Copied verbatim from components/BoxBuilder.tsx (BOX_TYPES, BOX_PRODUCTS).
// They live inside a client component, so they cannot be imported here.

const BOX_TYPES = [
  { id: "eco", name: "קופסת אקולוגית", basePrice: 35 },
  { id: "wood", name: "קופסת עץ טבעי", basePrice: 65 },
  { id: "premium", name: "קופסת עץ יוקרה", basePrice: 120 },
];

const BOX_PRODUCTS_LOCAL: BoxProduct[] = [
  { id: "olive_oil", name: "שמן זית כתית מעולה", unitPrice: 45, image: "" },
  { id: "halva", name: "חלבה ממרח", unitPrice: 22, image: "" },
  { id: "date_syrup", name: "סילאן תמרים", unitPrice: 28, image: "" },
  { id: "jam", name: "ריבה תוצרת בית", unitPrice: 25, image: "" },
];

// Alt text taken from where each image is actually rendered.
// hero and catalogFeature are declared in CONFIG.images but rendered nowhere,
// so they have no alt to copy.
const SITE_IMAGES = [
  { key: "hero", url: CONFIG.images.hero, placement: "hero", alt: "" },
  {
    key: "aboutPrimary",
    url: CONFIG.images.aboutPrimary,
    placement: "about",
    alt: "ריקי שוסטרמן בחממה — חקלאית מגבול הצפון", // components/sections/AboutSection.tsx:124
  },
  {
    key: "aboutNorth",
    url: CONFIG.images.aboutNorth,
    placement: "about",
    alt: "נוף גבול הצפון — מושב לימן, שדות המשק", // components/sections/AboutSection.tsx:220
  },
  { key: "catalogFeature", url: CONFIG.images.catalogFeature, placement: "catalog", alt: "" },
];

// ---------------------------------------------------------------- report

const unfilled: string[] = [];
const skipped: string[] = [];
function note(list: string[], msg: string) {
  if (!list.includes(msg)) list.push(msg);
}

// ---------------------------------------------------------------- helpers

const assetCache = new Map<string, string>();

/** Uploads a remote image into Sanity and returns the asset _id. */
async function uploadImage(url: string, filename: string): Promise<string | null> {
  if (!url) return null;
  if (assetCache.has(url)) return assetCache.get(url)!;
  if (!COMMIT) {
    assetCache.set(url, "(dry-run)");
    return "(dry-run)";
  }
  const res = await fetch(url);
  if (!res.ok) {
    note(skipped, `תמונה לא נמשכה (${res.status}): ${filename}`);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  assetCache.set(url, asset._id);
  return asset._id;
}

function imageField(assetId: string | null, alt: string) {
  if (!assetId) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(alt ? { alt } : {}),
  };
}

/** Strips undefined so empty fields are simply absent in Sanity. */
function clean<T extends Record<string, unknown>>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
}

const created: string[] = [];
const payloads: Record<string, unknown>[] = [];
async function put(doc: Record<string, unknown>) {
  created.push(`${doc._type}  ${doc._id}`);
  payloads.push(doc);
  if (COMMIT) await client.createIfNotExists(doc as never);
}

// ---------------------------------------------------------------- build

async function seedSiteSettings() {
  // CONFIG.about.heroLine is the only hero-level headline that exists in the
  // repo. It is mapped to hero.headline; flagged in the report as a judgement
  // call rather than a literal field-to-field match.
  const doc = clean({
    _id: "siteSettings",
    _type: "siteSettings",
    about: clean({
      headline: CONFIG.about.headline,
      body: CONFIG.about.body,
    }),
    hero: clean({
      headline: CONFIG.about.heroLine,
      tagline: CONFIG.brand.tagline,
      ctaLabel: "להזמנות — לחצו כאן", // components/sections/HeroSection.tsx:178
      ctaHref: undefined,
    }),
    contact: clean({
      phone: CONFIG.legal.contactPhone,
      whatsapp: CONFIG.whatsappNumber,
      email: CONFIG.legal.contactEmail,
    }),
    banner: { visible: false },
  });

  note(unfilled, "siteSettings.hero.ctaHref — הכפתור באתר פותח צ'אט ולא מוביל לקישור");
  note(unfilled, "siteSettings.banner.text / color / expiresAt — אין באנר פעיל בקוד");
  await put(doc);
}

async function seedPackages() {
  const all = [...CONFIG.packages, ...CONFIG.borderPackages];
  let order = 0;
  for (const p of all) {
    const assetId = await uploadImage(p.image, `${p.id}.jpg`);
    if (!p.image) note(unfilled, `package.image — ${p.id} (${p.name})`);
    if (!p.price) note(unfilled, `package.price — ${p.id} (${p.name})`);

    await put(
      clean({
        _id: `package-${p.id}`,
        _type: "package",
        id: { _type: "slug", current: p.id },
        name: p.name,
        description: p.description || undefined,
        price: p.price || undefined,
        image: imageField(assetId, ""),
        tags: p.tags?.length ? p.tags : undefined,
        order: order++,
        available: true,
      }),
    );
  }
  note(unfilled, "package.fullDescription — אין תיאור ארוך בקוד לאף מארז");
  note(unfilled, "package.bulkPrice — אין מחיר לכמות גדולה בקוד לאף מארז");
  note(unfilled, "package.minOrderQty — אין כמות מינימלית בקוד לאף מארז");
  note(unfilled, "package.gallery — אין גלריה בקוד לאף מארז");
  note(unfilled, "package.category — אין קטגוריה בקוד; התגיות אינן מיפוי חד-ערכי לרשימה הסגורה");
  note(unfilled, "package.image.alt — אין טקסט חלופי בקוד לתמונות המארזים");
}

async function seedBoxTypes() {
  let order = 0;
  for (const b of BOX_TYPES) {
    await put({
      _id: `boxType-${b.id}`,
      _type: "boxType",
      id: { _type: "slug", current: b.id },
      name: b.name,
      basePrice: b.basePrice,
      order: order++,
    });
  }
  note(unfilled, "boxType.image — כל שלוש הקופסאות ללא תמונה בקוד");
}

async function seedBoxProducts() {
  const all = [...BOX_PRODUCTS_LOCAL, ...CONFIG.borderProducts];
  let order = 0;
  for (const p of all) {
    await put({
      _id: `boxProduct-${p.id}`,
      _type: "boxProduct",
      id: { _type: "slug", current: p.id },
      name: p.name,
      unitPrice: p.unitPrice,
      available: true,
      order: order++,
    });
  }
  note(unfilled, `boxProduct.image — כל ${all.length} המוצרים ללא תמונה בקוד`);
}

async function seedMediaBlocks() {
  let order = 0;
  for (const img of SITE_IMAGES) {
    const assetId = await uploadImage(img.url, `${img.key}.jpg`);
    if (!img.alt) note(unfilled, `mediaBlock.image.alt — ${img.key} (התמונה לא מרונדרת באתר, אין alt להעתיק)`);
    await put(
      clean({
        _id: `mediaBlock-${img.key}`,
        _type: "mediaBlock",
        title: img.key,
        image: imageField(assetId, img.alt),
        placement: img.placement,
        order: order++,
        active: true,
      }),
    );
  }
}

function reportNotMigrated() {
  // Content that exists in the repo but has no field in any current schema.
  note(skipped, `CONFIG.videos (${CONFIG.videos.length}) — ה-url הוא placeholder ("https://youtube.com/"), לא הועבר כדי לא להזרים נתון מזויף`);
  note(skipped, `CONFIG.testimonials (${CONFIG.testimonials.length}) — אין סכמת המלצות`);
  note(skipped, `CONFIG.faq (${CONFIG.faq.length}) — אין סכמת שאלות ותשובות`);
  note(skipped, `CONFIG.usps (${CONFIG.usps.length}) — אין סכמת יתרונות`);
  note(skipped, `CONFIG.clientLogos (${CONFIG.clientLogos.length}) — אין סכמת לקוחות, וכל הלוגואים ריקים בקוד`);
  note(skipped, `CONFIG.about.story (${CONFIG.about.story.length} פסקאות) — אין שדה בסכמה`);
  note(skipped, `CONFIG.about.pullQuotes (${CONFIG.about.pullQuotes.length}) — אין שדה בסכמה`);
  note(skipped, "CONFIG.legal — אין סכמה לפרטים משפטיים");
  note(skipped, "CONFIG.brand.ownerName / ownerTitle — אין שדה בסכמה");
  note(skipped, "CONFIG.seo.siteUrl / ogImage — אין שדה בסכמה");
  note(skipped, "CONFIG.rickyAvatar — אין שדה בסכמה");
  note(skipped, "CONFIG.borderCategoryLabel — אין שדה בסכמה");
  note(skipped, "מחירי הליצ'י ב-lib/botEngine.ts — אין סכמה למחירון הצ'אטבוט");
  note(skipped, "CAPTIONS ב-HeroSection.tsx (5 כותרות מתחלפות) — אין שדה בסכמה");
}

// ---------------------------------------------------------------- run

async function main() {
  if (JSON_ONLY) {
    await seedSiteSettings();
    await seedPackages();
    await seedBoxTypes();
    await seedBoxProducts();
    await seedMediaBlocks();
    console.log(JSON.stringify(payloads, null, 0));
    return;
  }
  console.log(COMMIT ? "מצב: כתיבה (--commit)" : "מצב: הרצה יבשה — לא נכתב דבר");
  console.log(`יעד: ${projectId} / ${dataset}\n`);

  await seedSiteSettings();
  await seedPackages();
  await seedBoxTypes();
  await seedBoxProducts();
  await seedMediaBlocks();
  reportNotMigrated();

  console.log(`מסמכים (${created.length}):`);
  for (const c of created) console.log("  " + c);

  console.log(`\nשדות לא מולאו (${unfilled.length}):`);
  for (const u of unfilled) console.log("  • " + u);

  console.log(`\nתוכן שלא הועבר — אין לו שדה בסכמה (${skipped.length}):`);
  for (const s of skipped) console.log("  • " + s);

  if (!COMMIT) console.log("\nשום דבר לא נכתב. להרצה אמיתית: --commit");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
