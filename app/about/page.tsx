import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import TeamStrip from "@/components/home/TeamStrip";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container, Rule, SectionHeading } from "@/components/ui/Section";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "About Focus Realm";
const description =
  "Focus Realm is a software company building learning and operations platforms: Mise for hotels, and an AI-driven learning platform for schools and universities.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["about Focus Realm", "Focus Realm software company", "Focus Realm Mise", "Focus Realm education"],
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/about", type: "website" },
  twitter: { card: "summary_large_image", description },
};

const lines = [
  {
    sector: "Hospitality",
    name: "Mise",
    body: "The service execution platform for hotels. Standards run as timed tasks on staff phones, and every task leaves evidence and a service record behind.",
    href: "https://misehotel.com",
    cta: "Explore Mise",
  },
  {
    sector: "Education",
    name: "Focus Realm Education",
    body: "An AI-driven, gamified learning platform for schools, colleges and universities — a clean core, optional modules, and a layer built for employability.",
    href: "https://focus-realm.com",
    cta: "Explore Focus Realm Education",
  },
];

const principles = [
  {
    number: "01",
    title: "Strategic minimalism",
    body: "Only what the institution or the property actually uses. Every feature justifies itself against the person using it, or it comes out.",
  },
  {
    number: "02",
    title: "Built for the real room",
    body: "A staff phone on mobile data, a classroom board in a busy lesson. We design for the hardest conditions, so everything above them comes free.",
  },
  {
    number: "03",
    title: "One product per job",
    body: "Running a hotel shift and teaching a class are different problems, so they get different products. Neither borrows the other's shape.",
  },
  {
    number: "04",
    title: "Adoption over features",
    body: "Software that is switched on and unused has failed, however much it can do. We measure ourselves by what people open every day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            { ...webPageSchema({ path: "/about", name: title, description }), "@type": "AboutPage" },
            breadcrumbSchema([{ name: "About", path: "/about" }]),
            organizationSchema,
          ),
        }}
      />

      <PageHero
        eyebrow="About"
        breadcrumb={[{ label: "About" }]}
        titleLines={[<>A software company</>, <span key="b" className="text-gradient">for two sectors.</span>]}
        lede={site.description}
      />

      {/* The two product lines */}
      <section className="relative overflow-hidden pb-14 sm:pb-24">
        <Container>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            {lines.map((line, index) => (
              <Reveal key={line.name} delay={index * 90} className="h-full">
                <div className="panel flex h-full flex-col p-7 sm:p-8">
                  <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
                    {line.sector}
                  </p>
                  <h2 className="mt-4 text-[1.5rem] leading-tight font-semibold text-white">{line.name}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{line.body}</p>
                  <a
                    href={line.href}
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.92rem] font-medium text-brand-cyan underline decoration-brand/40 underline-offset-4 hover:decoration-brand-bright"
                  >
                    {line.cta}
                    <ArrowRight />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* Principles */}
      <section className="relative overflow-hidden py-14 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we build"
            title="Four decisions we keep"
            accent="making on purpose."
            body="They apply to both product lines, and each one has cost us a feature somebody asked for."
          />
          <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 90} className="h-full">
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
                  Tell us what you are trying to fix.
                </p>
                <p className="mt-2 max-w-lg text-[0.95rem] text-muted">
                  A school, a training team or a hotel — we will point you to the right product.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">
                  Talk to us
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/team" variant="outline">
                  Meet the founders
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
