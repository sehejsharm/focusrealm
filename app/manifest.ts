import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Software for Education and Hospitality`,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f5fb",
    theme_color: "#f4f5fb",
    categories: ["business", "education", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
