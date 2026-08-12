import type { Metadata } from "next";

import Buyers from "@/components/home/Buyers";
import Comparison from "@/components/home/Comparison";
import DemoProperty from "@/components/home/DemoProperty";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Mechanism from "@/components/home/Mechanism";
import NotAnLms from "@/components/home/NotAnLms";
import PainSnowball from "@/components/home/PainSnowball";
import RoleShowcase from "@/components/home/RoleShowcase";
import TeamStrip from "@/components/home/TeamStrip";
import Testimonials from "@/components/home/Testimonials";
import TrustedBy from "@/components/home/TrustedBy";
import { Rule } from "@/components/ui/Section";
import {
  allPeopleSchema,
  demoPropertySchema,
  faqSchema,
  jsonLdGraph,
  reviewSchema,
  webPageSchema,
} from "@/lib/seo";
import { site } from "@/lib/site";

const ogDescription =
  "Focus Realm Hospitality is the service execution platform for hotel operations. The SOP lives inside the timed task, photo and supervisor evidence is captured automatically, and it compounds into an audit-ready service record. Founded by Sehej Sharma, Ali Electricwala and Aditya Mishra.";

export const metadata: Metadata = {
  // Absolute so the layout template does not append the company name twice.
  title: { absolute: `${site.name} — Hotel SOP Execution Platform` },
  description: site.shortDescription,
  keywords: [
    "Focus Realm",
    "Focus Realm Hospitality",
    "service execution platform",
    "SOP management system for hotels",
    "hotel SOP software",
    "SOP development system",
    "hotel operations software",
    "Sehej Sharma",
    "Ali Electricwala",
    "Aditya Mishra",
    "Focus Realm founders",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — the operating system for hotel service standards`,
    description: ogDescription,
    url: "/",
    type: "website",
  },
  twitter: { card: "summary_large_image", description: ogDescription },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({
              path: "/",
              name: `${site.name} — Service Execution Platform for Hotels`,
              description: site.shortDescription,
            }),
            faqSchema,
            demoPropertySchema,
            // The founders are declared on the home page too, so a name query
            // can resolve here as well as on the individual profile.
            ...allPeopleSchema(),
            ...reviewSchema,
          ),
        }}
      />

      <Hero />
      <TrustedBy />
      <Mechanism />
      <RoleShowcase />
      <Rule />
      <PainSnowball />
      <NotAnLms />
      <Comparison />
      <Testimonials />
      <DemoProperty />
      <Buyers />
      <TeamStrip />
      <Faq />
    </>
  );
}
