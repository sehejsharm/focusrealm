import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Poppins } from "next/font/google";

import { AnalyticsNoScript, AnalyticsScripts, ConsentDefaults } from "@/components/site/Analytics";
import ConsentBanner from "@/components/site/ConsentBanner";
import RouteTransition from "@/components/fx/RouteTransition";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { educationSchema, jsonLdGraph, organizationSchema, softwareSchema, websiteSchema } from "@/lib/seo";
import { isUnindexableHost, site, siteUrl } from "@/lib/site";

import "./globals.css";

const logoSerif = Bodoni_Moda({ variable: "--font-logo", subsets: ["latin"], weight: ["500"], display: "block" });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Software for Education and Hospitality`,
    // Short suffix on purpose: page titles have ~60 chars before Google
    // truncates.
    template: `%s · ${site.shortName}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  category: "Software company",
  keywords: [
    "Focus Realm",
    "Focus Realm software company",
    "Focus Realm education",
    "Focus Realm Mise",
    "Mise hotel software",
    "AI LMS for schools",
    "LMS for universities",
    "hotel service execution platform",
    "education technology India",
    "hospitality technology India",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — software for education and hospitality`,
    description: site.shortDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — software for education and hospitality`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software for Education and Hospitality`,
    description: site.shortDescription,
  },
  // Previews and *.vercel.app hosts are excluded from the index so a
  // presentation link never competes with the production domain.
  robots: {
    index: !isUnindexableHost,
    follow: true,
    googleBot: {
      index: !isUnindexableHost,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    "theme-color": "#f4f5fb",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f5fb",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${logoSerif.variable}`}>
      <head>
        {/* Reveals are JS-driven; without it every section must still be visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.mask-line>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-void antialiased">
        <ConsentDefaults />
        <AnalyticsNoScript />
        {/* Site-wide entity graph: Organization, WebSite and the product itself. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdGraph(organizationSchema, websiteSchema, softwareSchema, educationSchema),
          }}
        />
        <Header />
        <main id="main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <AnalyticsScripts />
        <ConsentBanner />
      </body>
    </html>
  );
}
