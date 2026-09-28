import type { MetadataRoute } from "next";

import { absoluteUrl, isUnindexableHost, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment disallows everything: canonicals already point at the
  // production domain, so letting crawlers in here only creates a duplicate.
  if (isUnindexableHost) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Answer engines increasingly drive discovery for category terms, so
      // they are named explicitly rather than left to the wildcard.
      { userAgent: ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot"], allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "meta-externalagent",
          "CCBot",
          "cohere-ai",
          "YouBot",
        ],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
