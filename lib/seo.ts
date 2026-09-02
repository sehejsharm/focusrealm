import type { Metadata } from "next";

import { advisors, faqs, property, team, testimonials } from "@/lib/content";
import { sehejGalleryPhotos } from "@/lib/gallery";
import { advisorPhoto, teamPhoto } from "@/lib/team-photos";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
};

/**
 * Every page gets: a unique title + description, a self-referencing canonical,
 * and Open Graph / Twitter cards pointing at the route's generated OG image.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: ogTitle ?? `${title} · ${site.shortName}`,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? `${title} · ${site.shortName}`,
      description,
    },
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD. One @graph per page keeps entity relationships explicit,
 * which is what earns the knowledge-panel style result.
 * ------------------------------------------------------------------ */

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const softwareId = `${siteUrl}/#software`;

/**
 * The `@id` every node uses to refer to a founder. Defaults to the profile
 * URL, but a person described on more than one company site carries a shared
 * identifier instead (`person.schema.id`) so the profiles resolve to one
 * human. Always go through this — a reference that does not match the node's
 * own `@id` silently creates a second, empty entity.
 */
export function personId(slug: string) {
  return team.find((entry) => entry.slug === slug)?.schema?.id ?? `${siteUrl}/team/${slug}#person`;
}

export const organizationSchema = {
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  alternateName: ["Focus Realm", "FocusRealm", "Focus Realm Hospitality Pvt Ltd"],
  legalName: site.legalName,
  url: siteUrl,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
  foundingDate: site.founded,
  logo: {
    "@type": "ImageObject",
    "@id": `${siteUrl}/#logo`,
    url: absoluteUrl("/logo.svg"),
    contentUrl: absoluteUrl("/logo.svg"),
    caption: `${site.name} logo`,
  },
  image: absoluteUrl("/opengraph-image"),
  knowsAbout: [
    "hotel service standards",
    "SOP management for hotels",
    "hotel standard operating procedures",
    "hospitality operations software",
    "hotel audit evidence",
    "housekeeping quality assurance",
    "hotel staff readiness",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  founder: team
    .filter((person) => person.role.includes("Co-Founder"))
    .map((person) => ({ "@id": personId(person.slug) })),
  employee: team.map((person) => ({ "@id": personId(person.slug) })),
  brand: { "@type": "Brand", name: site.shortName, logo: absoluteUrl("/logo.svg") },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 3 },
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@id": softwareId },
    description: "Single-property pilot of the Focus Realm service execution platform.",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: absoluteUrl("/demo"),
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  ],
  areaServed: [
    { "@type": "Place", name: "Asia" },
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "Worldwide" },
  ],
  // Fill site.sameAs in lib/site.ts with the LinkedIn, X and Crunchbase URLs.
  // Emitting an empty array is worse than omitting the property.
  ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
} as const;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: site.name,
  description: site.shortDescription,
  publisher: { "@id": organizationId },
  inLanguage: "en",
} as const;

export const softwareSchema = {
  "@type": "SoftwareApplication",
  "@id": softwareId,
  name: site.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Service Execution Platform",
  operatingSystem: "Web",
  url: siteUrl,
  description: site.description,
  featureList: [
    "Operating standards delivered inside timed tasks",
    "Mandatory photo evidence per step",
    "Supervisor sign-off attached to every task",
    "Audit-ready service record per person and property",
    "Three role interfaces: staff mobile, manager desktop, author desktop",
    "Live readiness and service health for the property",
  ],
  publisher: { "@id": organizationId },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
    price: "0",
    description: "Single-property pilot. Contact Focus Realm for pilot scoping.",
    url: absoluteUrl("/demo"),
  },
} as const;

/**
 * Every off-site URL that identifies this person: the listed profiles plus
 * anything rendered as a link on the page. Deduped, because a URL appearing
 * twice in `sameAs` is a validation warning for no benefit.
 */
export function personSameAs(slug: string) {
  const person = team.find((entry) => entry.slug === slug);
  if (!person) return [];
  return [
    ...new Set([...(person.sameAs ?? []), ...(person.profiles ?? []).map((p) => p.href)]),
  ];
}

export function personSchema(slug: string) {
  const person = team.find((entry) => entry.slug === slug);
  if (!person) return null;

  // The local portrait leads because it is same-origin and guaranteed to
  // resolve; anything in `schema.images` follows as an alternate depiction.
  const localPhoto = person.photo?.src ?? teamPhoto(person.slug);
  const images = [
    ...(localPhoto ? [absoluteUrl(localPhoto)] : []),
    ...(person.schema?.images ?? []),
  ];

  return {
    "@type": "Person",
    "@id": personId(person.slug),
    name: person.name,
    givenName: person.name.split(" ")[0],
    familyName: person.name.split(" ").slice(1).join(" "),
    url: absoluteUrl(`/team/${person.slug}`),
    jobTitle: person.schema?.jobTitle ?? person.role,
    description:
      person.schema?.description ??
      `${person.name} is the ${person.role} of ${site.name}, the ${site.category.toLowerCase()} for hotel operations. ${person.headline}`,
    worksFor: { "@id": organizationId },
    affiliation: { "@id": organizationId },
    memberOf: { "@id": organizationId },
    knowsAbout: [...person.focus, "hotel service standards", "SOP execution", "hospitality operations"],
    // Only emitted once a portrait exists in public/team/ — a 404 in
    // structured data is worse than omitting the property.
    ...(images.length ? { image: images.length === 1 ? images[0] : images } : {}),
    ...(personSameAs(person.slug).length ? { sameAs: personSameAs(person.slug) } : {}),
    mainEntityOfPage: { "@id": `${siteUrl}/team/${person.slug}#webpage` },
  };
}

/**
 * The Person node for the photo page. Same `@id` as the profile node, so the
 * two pages describe one person; `image` carries every photograph as an
 * ImageObject, which is what makes them eligible for image search against
 * his name rather than as anonymous page decoration.
 */
export function sehejGallerySchema() {
  const person = team.find((entry) => entry.slug === "sehej-sharma");
  if (!person) return null;

  return {
    "@type": "Person",
    "@id": personId(person.slug),
    name: person.name,
    url: absoluteUrl("/about-sehej-sharma"),
    image: sehejGalleryPhotos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: photo.contentUrl,
      name: photo.alt,
      caption: photo.caption,
    })),
    sameAs: [...personSameAs(person.slug), absoluteUrl(`/team/${person.slug}`)],
  };
}

/**
 * An advisor's Person node. They live on /team rather than on a route of their
 * own, so the `@id` is a fragment of that page.
 *
 * The relationship is stated from the advisor's side (`affiliation`) rather
 * than by adding them to the Organization node: the Organization is emitted on
 * every page, and a `member` reference there would point at a node that only
 * exists on /team. `worksFor` is their own company — an advisor is not staff,
 * and the markup should not imply they are.
 */
export function advisorSchema(slug: string) {
  const advisor = advisors.find((entry) => entry.slug === slug);
  if (!advisor) return null;

  const photo = advisorPhoto(advisor.slug);

  return {
    "@type": "Person",
    "@id": `${absoluteUrl("/team")}#${advisor.slug}`,
    name: advisor.name,
    ...(advisor.alternateName ? { alternateName: advisor.alternateName } : {}),
    givenName: advisor.name.split(" ")[0],
    familyName: advisor.name.split(" ").slice(1).join(" "),
    jobTitle: advisor.role,
    description: `${advisor.name} — ${advisor.credentials.join(". ")}. Advisor to ${site.name}.`,
    affiliation: { "@id": organizationId },
    ...(advisor.company
      ? { worksFor: { "@type": "Organization", name: advisor.company.name } }
      : {}),
    ...(photo ? { image: absoluteUrl(photo) } : {}),
    mainEntityOfPage: { "@id": `${siteUrl}/team#webpage` },
  };
}

/** Every advisor, in board order. */
export function allAdvisorsSchema() {
  return advisors.map((advisor) => advisorSchema(advisor.slug)).filter(Boolean);
}

/** All three founders, for pages that should answer a founder-name query. */
export function allPeopleSchema() {
  return team.map((person) => personSchema(person.slug)).filter(Boolean);
}

/**
 * Client words as schema.org Review nodes attached to the organisation.
 * No aggregateRating — self-published ratings are not eligible for rich
 * results and claiming one would be dishonest anyway.
 */
export const reviewSchema = testimonials.map((item) => ({
  "@type": "Review",
  itemReviewed: { "@id": organizationId },
  reviewBody: item.quote,
  author: { "@type": "Organization", name: item.author },
}));

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  id,
}: {
  path: string;
  name: string;
  description: string;
  id?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": id ?? `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en",
  };
}

export const faqSchema = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
} as const;

export const demoPropertySchema = {
  "@type": "CreativeWork",
  name: `${property.name} demo environment`,
  description: `Every Focus Realm demonstration runs against a single consistent fictional property: ${property.name}, ${property.location} — ${property.staff} staff across ${property.floors} guest floors.`,
} as const;

/** Serialises a JSON-LD @graph for injection into a page. */
export function jsonLdGraph(...nodes: unknown[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
}
