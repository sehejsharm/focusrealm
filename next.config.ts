import type { NextConfig } from "next";

/**
 * Built as a fully static export and served from Firebase Hosting's CDN.
 *
 * Firebase's framework-aware Hosting is closed to new Next.js projects, so
 * there is no server runtime here: every route must prerender. That is why
 * `app/api/` does not exist and the lead forms hand off to the visitor's mail
 * client (see components/forms/LeadForm.tsx).
 *
 * Response headers are NOT configured here — `headers()` is ignored under
 * `output: "export"`. They live in firebase.json instead.
 */
const nextConfig: NextConfig = {
  output: "export",

  // The Next.js image optimizer is a server feature. Every image on this site
  // is a statically imported local asset, so they are served as-is by the CDN.
  images: { unoptimized: true },

  // Nothing gains from advertising the framework on every response.
  poweredByHeader: false,
};

export default nextConfig;
