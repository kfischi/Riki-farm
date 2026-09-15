import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import Studio from "./Studio";

export const dynamic = "force-static";

export { viewport } from "next-sanity/studio";

// studioMetadata carries referrer: "same-origin" and robots: "noindex".
// The title is set here so the admin screen does not inherit the site's
// marketing title from the root layout.
export const metadata: Metadata = {
  ...studioMetadata,
  // absolute: bypasses the root layout's "%s | משק שוסטרמן" template.
  title: { absolute: "ניהול תוכן — משק שוסטרמן" },
};

export default function StudioPage() {
  return <Studio />;
}
