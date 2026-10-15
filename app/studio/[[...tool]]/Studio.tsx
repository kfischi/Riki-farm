"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Client boundary for the Studio.
 *
 * sanity.config.ts must not be reached from the Server Component graph: there
 * the "react-server" export condition applies, and swr's react-server build has
 * no default export, which sanity/lib/index.js imports. Keeping the config
 * import on this side of the boundary resolves swr through its normal build.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
