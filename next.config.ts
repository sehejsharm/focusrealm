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
  // Isolates this browsing context from cross-origin popups.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
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

/**
 * The hotel product moved to misehotel.com. Every hotel page this site used
 * to serve is permanently redirected to its counterpart there, page to page
 * rather than all to the homepage, so the search equity each one earned
 * transfers to the matching Mise page instead of evaporating.
 */
const MISE = "https://misehotel.com";
const miseRedirects: [string, string][] = [
  ["/platform", "/platform"],
  ["/problems", "/problems"],
  ["/demo", "/demo"],
  ["/guides", "/solutions"],
  ["/what-is-focus-realm", "/"],
  ["/mise", "/"],
  ["/hotel-sop-software", "/standards-to-execution"],
  ["/service-execution-platform", "/glossary/service-execution-platform"],
  ["/hotel-operations-software", "/platform"],
  ["/hotel-task-management-software", "/how-it-works"],
  ["/hotel-timed-task-software", "/glossary/timed-task"],
  ["/digitize-hotel-sops", "/standards-to-execution"],
  ["/replace-hotel-sop-binders", "/compare/mise-vs-excel"],
  ["/replace-whatsapp-hotel-operations", "/compare/mise-vs-whatsapp"],
  ["/hotel-sop-app", "/how-it-works"],
  ["/hotel-sop-automation", "/how-it-works"],
  ["/hotel-shift-management", "/glossary/shift-handover"],
  ["/hotel-photo-evidence-app", "/glossary/photo-gate"],
  ["/hotel-audit-software", "/audit-readiness"],
  ["/hotel-compliance-software", "/audit-readiness"],
  ["/hotel-sop-compliance", "/problems/ghost-sop"],
  ["/hotel-housekeeping-sop-software", "/solutions/housekeeping"],
  ["/hotel-department-sop-software", "/solutions"],
  ["/hotel-supervisor-workload", "/problems/supervisor-bottleneck"],
  ["/hotel-service-consistency", "/problems/invisible-performance-gap"],
  ["/standalone-hotel-sop-software", "/solutions/boutique-hotels"],
  ["/multi-property-hotel-sop-software", "/solutions/hotel-chains"],
  ["/hotel-sop-software-india", "/hotel-service-execution-india"],
  ["/hotel-sop-software-for-managers", "/for"],
  ["/hotel-sop-software-vs-lms", "/compare/mise-vs-hotel-lms"],
  ["/best-hotel-sop-software", "/compare"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return miseRedirects.map(([source, path]) => ({
      source,
      destination: `${MISE}${path}`,
      // 301 rather than Next's default 308: both pass equity, but 301 is what
      // every SEO tool and Search Console report expects to see.
      statusCode: 301 as const,
    }));
  },
  // Removes `X-Powered-By: Next.js` — free information about the stack.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
