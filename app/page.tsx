import type { Metadata } from "next";

import Buyers from "@/components/home/Buyers";
import DemoProperty from "@/components/home/DemoProperty";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Mechanism from "@/components/home/Mechanism";
import NotAnLms from "@/components/home/NotAnLms";
import PainSnowball from "@/components/home/PainSnowball";
import RoleShowcase from "@/components/home/RoleShowcase";
import TeamStrip from "@/components/home/TeamStrip";
import { Rule } from "@/components/ui/Section";
import { demoPropertySchema, faqSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Service Execution Platform for Hotels`,
  description:
    "Focus Realm Hospitality is the service execution platform for hotel operations. The SOP lives inside the timed task, photo and supervisor evidence is captured automatically, and it compounds into an audit-ready service record. Every shift, five-star.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — the operating system for hotel service standards`,
    description: site.shortDescription,
    url: "/",
    type: "website",
  },
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
          ),
        }}
      />

      <Hero />
      <Mechanism />
      <RoleShowcase />
      <Rule />
      <PainSnowball />
      <NotAnLms />
      <DemoProperty />
      <Buyers />
      <TeamStrip />
      <Faq />
    </>
  );
}
