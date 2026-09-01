import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import CursorField from "@/components/fx/CursorField";
import { AnalyticsNoScript, AnalyticsScripts } from "@/components/site/Analytics";
import RouteTransition from "@/components/fx/RouteTransition";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import StickyCta from "@/components/site/StickyCta";
import { jsonLdGraph, organizationSchema, softwareSchema, websiteSchema } from "@/lib/seo";
import { isUnindexableHost, site, siteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Hotel SOP Execution Platform`,
    // Short suffix on purpose: page titles have ~60 chars before Google
    // truncates, and the full company name ate 26 of them.
    template: `%s · ${site.shortName}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  category: "Hospitality operations software",
  keywords: [
    "Focus Realm",
    "Focus Realm Hospitality",
    "service execution platform",
    "SOP management system for hotels",
    "hotel SOP software",
    "SOP development system",
    "hotel standard operating procedures software",
    "hospitality operations platform",
    "hotel staff app",
    "housekeeping SOP app",
    "hotel audit evidence software",
    "hotel service standards software",
    "hotel quality assurance software",
    "hotel operations compliance tracking",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — the operating system for hotel service standards`,
    description: site.shortDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — the operating system for hotel service standards`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Service Execution Platform for Hotels`,
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
    "theme-color": "#061417",
  },
};

export const viewport: Viewport = {
  themeColor: "#061417",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Reveals are JS-driven; without it every section must still be visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.mask-line>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-void antialiased">
        <AnalyticsNoScript />
        {/* Site-wide entity graph: Organization, WebSite and the product itself. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdGraph(organizationSchema, websiteSchema, softwareSchema),
          }}
        />
        <CursorField />
        <Header />
        <main id="main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <StickyCta />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
