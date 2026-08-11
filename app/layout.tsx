import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import StickyCta from "@/components/site/StickyCta";
import { jsonLdGraph, organizationSchema, softwareSchema, websiteSchema } from "@/lib/seo";
import { site, siteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Service Execution Platform for Hotels`,
    template: `%s · ${site.name}`,
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Service Execution Platform for Hotels`,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    "theme-color": "#04070f",
  },
};

export const viewport: Viewport = {
  themeColor: "#04070f",
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
        {/* Site-wide entity graph: Organization, WebSite and the product itself. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdGraph(organizationSchema, websiteSchema, softwareSchema),
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
