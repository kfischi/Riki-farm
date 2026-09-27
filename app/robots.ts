import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Without the trailing slash, deliberately. A rule written "/x/" closes
        // what sits under /x and leaves /x itself open, so "/accessibility/"
        // blocked nothing: the page's own path has no trailing segment. The
        // intent to keep it out of search is visible in two places — this rule
        // and its absence from app/sitemap.ts — so the rule is made to do what
        // it already says.
        //
        // /studio is deliberately NOT listed. It carries robots: "noindex" of
        // its own, via next-sanity/studio, and disallowing it here would stop
        // Google crawling the page and therefore stop it ever seeing that
        // noindex — which is how a blocked URL still lands in the index, as a
        // bare link. A noindex page must stay crawlable to be obeyed.
        disallow: ["/api/", "/accessibility"],
      },
    ],
    sitemap: `${CONFIG.seo.siteUrl}/sitemap.xml`,
  };
}
