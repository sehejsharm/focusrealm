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
  name: "Focus Realm",
  shortName: "Focus Realm",
  legalName: "Focus Realm",
  tagline: "Software for the work that has to go right.",
  category: "Software company",
  categoryLine: "A software company building learning and operations platforms.",
  description:
    "Focus Realm is a software company building bespoke learning and operations platforms. It runs two product lines: Mise, the service execution platform for hotels, and the Focus Realm education platform for schools, colleges and universities.",
  /** Kept under 155 characters — this is the default meta description. */
  shortDescription:
    "Focus Realm is a software company with two product lines: Mise for hotel operations, and an AI-driven learning platform for schools and universities.",
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
  entity: "Focus Realm",
  jurisdiction: "India",
  courts: "Jaipur, Rajasthan, India",
  registeredAddress: "",
  effectiveDate: "11 August 2026",
  dataProtectionLaws: "the Digital Personal Data Protection Act, 2023 (India) and, where it applies, the UK GDPR and EU GDPR",
} as const;

export const nav = [
  { href: "https://focus-realm.com", label: "Education", description: "Learning and capability programmes" },
  { href: "https://misehotel.com", label: "Hospitality", description: "Mise, the service execution platform for hotels" },
  { href: "/about", label: "About", description: "Why we work in two verticals" },
  { href: "/team", label: "Team", description: "The people behind Focus Realm" },
  { href: "/contact", label: "Contact", description: "Talk to the founding team" },
] as const;

export const footerNav = [
  {
    heading: "Verticals",
    links: [
      { href: "https://focus-realm.com", label: "Education", external: true },
      { href: "https://misehotel.com", label: "Hospitality · Mise", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Founders",
    links: [
      { href: "/team/sehej-sharma", label: "Sehej Sharma" },
      { href: "/team/ali-electricwala", label: "Ali Electricwala" },
      { href: "/team/aditya-mishra", label: "Aditya Mishra" },
    ],
  },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  // Reopens the consent banner. Withdrawing has to be as easy as granting.
  { href: "#cookie-preferences", label: "Cookie preferences" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
