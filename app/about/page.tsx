import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import DemoProperty from "@/components/home/DemoProperty";
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
    body: "Every screen has to justify its existence against the task in front of the person using it. Our CTO's job description is, in practice, removing things. The authoring workspace is a form, not a page builder, because a page builder would have been easier to build and worse to use.",
  },
  {
    number: "02",
    title: "Three interfaces, not one responsive compromise",
    body: "A room attendant holding a phone in a corridor, a manager at a desk, and an author writing a standard are three different jobs. We built three interfaces optimised for each, rather than one layout that is mediocre in all three postures.",
  },
  {
    number: "03",
    title: "Evidence is a gate, not a report",
    body: "If proof is optional it does not exist. A step marked for photo evidence cannot be ticked until the photo is captured. That single decision is the difference between a record you can defend and a folder you assemble in a panic.",
  },
  {
    number: "04",
    title: "Independence by design",
    body: "No PMS integration at this stage. The platform is web-based, runs on standard browsers over mobile data, and needs no special hardware. A property can start next week without a systems project in front of it.",
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
        lede="Focus Realm Hospitality exists because of a gap every hotel operator recognises instantly: the distance between the standard a property has written down and the work that actually happens on the floor at 08:36 on a Sunday."
      />

      {/* The thesis */}
      <section className="relative overflow-hidden pb-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="font-mono text-[0.6rem] tracking-[0.16em] text-brand-ice uppercase">The thesis</p>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.28] font-medium text-white">
                  The SOP lives inside the timed task. Completing the task generates photo and supervisor
                  evidence. That evidence compounds into an audit-ready service record.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-7 text-[0.95rem] leading-relaxed text-faint">
                  Three sentences. Everything we have built, and everything we have refused to build, follows
                  from them.
                </p>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal>
                <p className="text-[1.02rem] leading-relaxed text-muted">
                  Hotels do not have a knowledge problem. Walk into any four- or five-star property and you will
                  find standards that are thorough, specific and genuinely good. They have been signed off,
                  version-controlled, printed and filed.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-[1.02rem] leading-relaxed text-muted">
                  What they have is an <strong className="font-medium text-paper">execution</strong> problem, and
                  underneath it an <strong className="font-medium text-paper">evidence</strong> problem. The
                  standard is a document. The work is a shift. Nothing connects the two except a supervisor&rsquo;s
                  memory and a WhatsApp group — which is why the audit is always a fire drill and why service
                  quality resets every time someone resigns.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-[1.02rem] leading-relaxed text-muted">
                  So we stopped treating standards as content to be delivered and started treating them as the
                  unit of work itself. The standard is not something a staff member studies before their shift.
                  It is the screen they are looking at during it, with a timer running and a camera attached.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="panel p-6">
                  <p className="text-[0.95rem] leading-relaxed text-paper">
                    That is the whole company. The category name is still settling —{" "}
                    <strong className="font-medium text-white">Service Execution Platform</strong> is our current
                    recommendation — but the mechanism is not up for debate.
                  </p>
                </div>
              </Reveal>
            </div>
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
            body="These are not values on a wall. Each one has cost us a feature somebody asked for."
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

      <DemoProperty />

      <TeamStrip order="canonical" />

      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[clamp(1.3rem,2.6vw,1.8rem)] leading-snug font-semibold text-white">
                  Want the long version?
                </p>
                <p className="mt-2 max-w-lg text-[0.95rem] text-muted">
                  We will walk your property through the six pains, show you the three interfaces, and scope a
                  pilot against your own standards.
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
