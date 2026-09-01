/**
 * Single source of truth for canonical URLs, brand strings and navigation.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment (Vercel → Settings →
 * Environment Variables) the moment the production domain is live: every
 * canonical tag, sitemap entry, OG URL and JSON-LD @id is derived from it.
 */

/**
 * The apex domain is what is actually deployed and served. Keep this in sync
 * with the host in DNS: every canonical, sitemap entry, OG URL and JSON-LD
 * `@id` on the site is derived from it, and a mismatch between this string
 * and the live host splits the site into two entities in Google's index.
 */
const fallbackUrl = "https://focusrealm.org";

/**
 * Deliberately does NOT fall back to Vercel's deployment URL.
 *
 * It used to, which meant a deployment with no NEXT_PUBLIC_SITE_URL set
 * published canonicals, OG image URLs, sitemap entries and JSON-LD @ids
 * pointing at the *.vercel.app host — inviting Google to index the preview as
 * the canonical site and stranding any authority it earned on a throwaway
 * domain. The production domain is the answer unless someone says otherwise.
 */
function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (!fromEnv) return fallbackUrl;
  return fromEnv.startsWith("http") ? fromEnv.replace(/\/$/, "") : `https://${fromEnv.replace(/\/$/, "")}`;
}

export const siteUrl = resolveSiteUrl();

/**
 * True for anything that is not the real production site — Vercel previews and
 * branch deploys, or a deployment still being served from a *.vercel.app host.
 * These are kept out of the index entirely: a presentation link should not
 * compete with the production domain in search results.
 */
export const isUnindexableHost =
  (process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production") ||
  /\.vercel\.app$/.test(new URL(siteUrl).hostname);

export const site = {
  name: "Focus Realm Hospitality",
  shortName: "Focus Realm",
  legalName: "Focus Realm Hospitality",
  tagline: "Every shift, five-star.",
  category: "Service Execution Platform",
  categoryLine: "The operating system for hotel service standards.",
  description:
    "Focus Realm Hospitality is a mobile-first service execution platform for hotel operations. The standard lives inside the timed task, completing the task captures photo and supervisor evidence, and that evidence compounds into an audit-ready service record.",
  /** Kept under 155 characters — this is the default meta description. */
  shortDescription:
    "Turn hotel SOPs into timed tasks on staff phones. Photo evidence, supervisor sign-offs and audit-ready service records. Not an LMS. No PMS required.",
  /**
   * One public address, one domain. Everything on the site — footer, contact
   * routes, demo form, JSON-LD contactPoint, the policy pages — reads from
   * these, and they all resolve to the same inbox on purpose.
   */
  email: "hello@focusrealm.org",
  demoEmail: "hello@focusrealm.org",
  privacyEmail: "hello@focusrealm.org",
  prototypeUrl: "https://fr2-b6s.pages.dev/",
  founded: "2024",
  /** Public profiles for the company. Emitted as schema.org sameAs. */
  sameAs: [] as string[],
} as const;

/**
 * Legal identity. These strings appear verbatim in the Privacy Policy and
 * Terms of Service, so confirm each one with counsel before launch.
 * `registeredAddress` is only rendered when it is non-empty.
 */
export const legal = {
  entity: "Focus Realm Hospitality",
  jurisdiction: "India",
  courts: "Jaipur, Rajasthan, India",
  registeredAddress: "",
  effectiveDate: "11 August 2026",
  dataProtectionLaws: "the Digital Personal Data Protection Act, 2023 (India) and, where it applies, the UK GDPR and EU GDPR",
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
      { href: "/platform#author", label: "Standards · desktop" },
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
      { href: "/team/sehej-sharma", label: "Sehej Sharma" },
      { href: "/team/ali-electricwala", label: "Ali Electricwala · COO" },
      { href: "/team/aditya-mishra", label: "Aditya Mishra · CTO" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "/demo", label: "Book a 15-min demo" },
      { href: "/demo#what-you-see", label: "What a demo covers" },
      { href: site.prototypeUrl, label: "Live prototype", external: true },
      { href: "/sitemap.xml", label: "Sitemap", external: true },
    ],
  },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
