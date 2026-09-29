import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";

/**
 * Revalidation webhook for Sanity.
 *
 * Registered in sanity.io/manage as a POST webhook with a custom header
 * `x-revalidate-secret` matching SANITY_REVALIDATE_SECRET. Publishing in the
 * Studio then refreshes the site immediately instead of waiting out the ISR
 * window.
 *
 * The ISR window is the safety net: with or without this route, published
 * content appears within `revalidate` seconds.
 */

function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  // Without a configured secret the route would be an open revalidation
  // trigger, so it stays closed instead.
  if (!expected) {
    return NextResponse.json(
      { revalidated: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  if (!secretMatches(req.headers.get("x-revalidate-secret"), expected)) {
    return NextResponse.json(
      { revalidated: false, reason: "unauthorized" },
      { status: 401 },
    );
  }

  // Every content type on this site feeds the home page; there are no
  // per-document routes yet. Revalidating one path keeps this honest rather
  // than implying finer granularity than exists.
  revalidatePath("/");

  return NextResponse.json({ revalidated: true, path: "/" });
}
