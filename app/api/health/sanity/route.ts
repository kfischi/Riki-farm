import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

/**
 * Connection check for the content backend.
 *
 * The site is built to survive Sanity being unreachable: every fetch falls
 * back to the copy in CONFIG. That is right for visitors and wrong for
 * whoever is deploying, because a broken connection looks identical to a
 * working one. This route makes the difference visible.
 *
 * Runs on every request, never cached, so it reports the runtime environment
 * rather than whatever was true when the page was built — which is the exact
 * distinction that matters when build-time and runtime env vars differ.
 *
 * Safe to expose: the project id and dataset name are already in the browser
 * bundle by design, and no token value is ever read or returned.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? null;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? null;

  const env = {
    projectId,
    dataset,
    // Presence only — the value itself is never returned.
    readTokenPresent: Boolean(process.env.SANITY_API_READ_TOKEN),
    revalidateSecretPresent: Boolean(process.env.SANITY_REVALIDATE_SECRET),
  };

  if (!sanityClient) {
    return NextResponse.json(
      {
        ok: false,
        reason: "client-not-configured",
        detail:
          "NEXT_PUBLIC_SANITY_PROJECT_ID is missing at runtime, so no client was created and every fetch falls back to CONFIG. Note that netlify.toml [build.environment] applies to the build only — runtime needs the variable set in the Netlify UI.",
        env,
      },
      { status: 503 },
    );
  }

  try {
    const result = await sanityClient.fetch<{
      packages: number;
      heroHeadline: string | null;
      settingsId: string | null;
    }>(`{
      "packages": count(*[_type == "package"]),
      "heroHeadline": *[_type == "siteSettings"][0].hero.headline,
      "settingsId": *[_type == "siteSettings"][0]._id
    }`);

    return NextResponse.json({
      ok: true,
      // If these match what the Studio shows, the live path is working.
      reachable: true,
      packages: result?.packages ?? 0,
      heroHeadline: result?.heroHeadline ?? null,
      settingsId: result?.settingsId ?? null,
      env,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        reason: "fetch-failed",
        detail: err instanceof Error ? err.message : String(err),
        env,
      },
      { status: 502 },
    );
  }
}
