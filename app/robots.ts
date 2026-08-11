import type { MetadataRoute } from "next";

import { absoluteUrl, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Answer engines increasingly drive discovery for category terms, so
      // they are named explicitly rather than left to the wildcard.
      { userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot"], allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
