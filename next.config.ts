import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * HSTS is what actually forces HTTPS: the host already redirects http to
 * https, but that first redirect is a plaintext round trip a network attacker
 * can intercept. This tells the browser never to attempt http for this origin
 * again, so after one visit the redirect stops being a window at all.
 *
 * `preload` is declared, but inclusion is not automatic — it needs a manual
 * submission at hstspreload.org, and that is effectively irreversible, so
 * leave it unsubmitted unless every present and future subdomain is
 * guaranteed to serve HTTPS.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stops the browser second-guessing a declared Content-Type, which is how a
  // user-supplied file gets treated as script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No part of this site is meant to be framed, so clickjacking has no surface.
  { key: "X-Frame-Options", value: "DENY" },
  // Send the full URL same-origin, bare origin cross-origin: enough for
  // referrer analytics without leaking paths to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these, so deny them outright rather than leaving
  // them available to anything that ends up embedded later.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Removes `X-Powered-By: Next.js` — free information about the stack.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
