/**
 * Single source of truth for canonical URLs, brand strings and navigation.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment (Vercel → Settings →
 * Environment Variables) the moment the production domain is live: every
 * canonical tag, sitemap entry, OG URL and JSON-LD @id is derived from it.
 */

const fallbackUrl = "https://www.focusrealm.com";

function resolveSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (!fromEnv) return fallbackUrl;
  return fromEnv.startsWith("http") ? fromEnv.replace(/\/$/, "") : `https://${fromEnv.replace(/\/$/, "")}`;
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Focus Realm Hospitality",
  shortName: "Focus Realm",
  legalName: "Focus Realm Hospitality",
  tagline: "Every shift, five-star.",
  category: "Service Execution Platform",
  categoryLine: "The operating system for hotel service standards.",
  description:
    "Focus Realm Hospitality is a mobile-first service execution platform for hotel operations. The standard lives inside the timed task, completing the task captures photo and supervisor evidence, and that evidence compounds into an audit-ready service record.",
  shortDescription:
    "The service execution platform for hotel operations. Standards inside timed tasks, evidence captured automatically, an audit-ready service record.",
  email: "hello@focusrealm.com",
  demoEmail: "demo@focusrealm.com",
  prototypeUrl: "https://fr2-b6s.pages.dev/",
  founded: "2024",
  locality: "Colombo",
  country: "LK",
  sameAs: [] as string[],
} as const;

export const nav = [
  { href: "/platform", label: "Platform", description: "Three role interfaces, one service record" },
  { href: "/problems", label: "Problems", description: "The six pains that compound on the floor" },
  { href: "/about", label: "About", description: "Why we built a service execution platform" },
  { href: "/team", label: "Team", description: "The people behind Focus Realm" },
  { href: "/contact", label: "Contact", description: "Talk to the founding team" },
] as const;

export const footerNav = [
  {
    heading: "Platform",
    links: [
      { href: "/platform", label: "Overview" },
      { href: "/platform#staff", label: "Staff · mobile" },
      { href: "/platform#manager", label: "Manager · desktop" },
      { href: "/platform#author", label: "Author · desktop" },
      { href: "/platform#service-record", label: "The service record" },
    ],
  },
  {
    heading: "The case",
    links: [
      { href: "/problems", label: "The six pains" },
      { href: "/problems#ghost-sop", label: "Ghost SOP" },
      { href: "/problems#audit-ambush", label: "Audit ambush" },
      { href: "/about", label: "About us" },
      { href: "/about#not-an-lms", label: "Why this is not an LMS" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/team", label: "Team" },
      { href: "/team/sehej-sharma", label: "Sehej Sharma · CEO" },
      { href: "/team/ali-electricwala", label: "Ali Electricwala · COO" },
      { href: "/team/aditya-mishra", label: "Aditya Mishra · CTO" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "/demo", label: "Book a demo" },
      { href: "/demo#what-you-see", label: "What a demo covers" },
      { href: site.prototypeUrl, label: "Live prototype", external: true },
      { href: "/sitemap.xml", label: "Sitemap", external: true },
    ],
  },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
