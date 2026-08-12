import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import ArchitectureDiagram from "@/components/viz/ArchitectureDiagram";
import NotAnLms from "@/components/home/NotAnLms";
import TeamStrip from "@/components/home/TeamStrip";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container, Rule, SectionHeading } from "@/components/ui/Section";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "About Focus Realm Hospitality";
const description =
  "Why Focus Realm Hospitality exists: a standard that does not live inside the timed task is not a standard, it is a document. Our category and principles.";
const ogDescription =
  "Focus Realm Hospitality builds the service execution platform for hotel operations — founded on one thesis: a standard that does not live inside the timed task is not a standard, it is a document. Our category, our principles and the team behind them.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "about Focus Realm Hospitality",
    "Focus Realm company",
    "service execution platform company",
    "hospitality technology startup",
    "hotel operations software company",
  ],
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} · ${site.shortName}`, description: ogDescription, url: "/about", type: "website" },
  twitter: { card: "summary_large_image", description: ogDescription },
};

const principles = [
  {
    number: "01",
    title: "Subtraction first",
    body: "Every screen justifies itself against the task in front of the person using it, or it comes out.",
  },
  {
    number: "02",
    title: "Three interfaces, not one responsive compromise",
    body: "Three different jobs, three postures. One responsive layout would have been mediocre at all three.",
  },
  {
    number: "03",
    title: "Evidence is a gate, not a report",
    body: "If proof is optional it does not exist. The step will not close without the photo.",
  },
  {
    number: "04",
    title: "Independence by design",
    body: "No PMS, no hardware, no systems project. A property can start next week.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              ...webPageSchema({ path: "/about", name: title, description }),
              "@type": "AboutPage",
            },
            breadcrumbSchema([{ name: "About", path: "/about" }]),
            organizationSchema,
          ),
        }}
      />

      <PageHero
        eyebrow="Our thesis"
        breadcrumb={[{ label: "About" }]}
        titleLines={[
          <>We put the standard</>,
          <>
            inside the <span className="text-gradient">shift.</span>
          </>,
        ]}
        lede="The distance between the standard a property has written down and the work that happens at 08:36 on a Sunday."
      />

      {/* The thesis, in three sentences */}
      <section className="relative overflow-hidden pb-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <p className="text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.28] font-medium text-white">
                The SOP lives inside the timed task. Completing the task generates photo and supervisor
                evidence. That evidence compounds into an audit-ready service record.
              </p>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-faint">
                Everything we have built, and everything we have refused to build, follows from those three
                sentences.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ArchitectureDiagram />
            </Reveal>
          </div>
        </Container>
      </section>

      <NotAnLms />

      <Rule />

      {/* Principles */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="How we build"
            title="Four decisions we keep"
            accent="making on purpose."
            body="Each one has cost us a feature somebody asked for."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 90}>
                <SpotlightCard className="panel flex h-full flex-col p-8">
                  <span aria-hidden className="font-mono text-[2.4rem] leading-none font-semibold text-white/40">
                    {principle.number}
                  </span>
                  <h3 className="mt-6 text-[1.2rem] leading-snug font-semibold text-white">{principle.title}</h3>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">{principle.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>


      <TeamStrip order="canonical" />

      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[clamp(1.3rem,2.6vw,1.8rem)] leading-snug font-semibold text-white">
                  See it on your floor.
                </p>
                <p className="mt-2 max-w-lg text-[0.95rem] text-muted">
                  Fifteen minutes on your floor, then a pilot scoped to your own standards.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo">
                  Book a 15-min demo
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Contact us
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
