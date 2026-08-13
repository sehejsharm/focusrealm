import type { MetadataRoute } from "next";

import { team } from "@/lib/content";
import { teamPhoto } from "@/lib/team-photos";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/platform", changeFrequency: "weekly", priority: 0.9 },
    { path: "/problems", changeFrequency: "monthly", priority: 0.9 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/team", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ] as const;

  const core: MetadataRoute.Sitemap = routes.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const people: MetadataRoute.Sitemap = team.map((person) => {
    const photo = teamPhoto(person.slug);
    return {
      url: absoluteUrl(`/team/${person.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      // Declared so the founders' portraits are eligible for image search,
      // which is a real entry point for a name query.
      ...(photo ? { images: [absoluteUrl(photo)] } : {}),
    };
  });

  return [...core, ...people];
}
