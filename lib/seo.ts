import type { Metadata } from "next";

import { faqs, property, team } from "@/lib/content";
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
  founder: team
    .filter((person) => person.role.includes("Co-Founder"))
    .map((person) => ({ "@id": `${siteUrl}/team/${person.slug}#person` })),
  employee: team.map((person) => ({ "@id": `${siteUrl}/team/${person.slug}#person` })),
  areaServed: [
    { "@type": "Place", name: "Asia" },
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "Worldwide" },
  ],
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
  operatingSystem: "Web browser, iOS, Android",
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

export function personSchema(slug: string) {
  const person = team.find((entry) => entry.slug === slug);
  if (!person) return null;

  return {
    "@type": "Person",
    "@id": `${siteUrl}/team/${person.slug}#person`,
    name: person.name,
    url: absoluteUrl(`/team/${person.slug}`),
    jobTitle: person.role,
    description: `${person.name} is the ${person.role} of ${site.name}, the ${site.category.toLowerCase()} for hotel operations.`,
    worksFor: { "@id": organizationId },
    affiliation: { "@id": organizationId },
    knowsAbout: person.focus,
    mainEntityOfPage: { "@id": `${siteUrl}/team/${person.slug}#webpage` },
  };
}

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
  description: `Every Focus Realm demonstration runs against a single consistent fictional property: ${property.name}, ${property.location} — ${property.rooms} rooms and ${property.staff} staff across ${property.floors} guest floors.`,
} as const;

/** Serialises a JSON-LD @graph for injection into a page. */
export function jsonLdGraph(...nodes: unknown[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
}
