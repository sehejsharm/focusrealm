import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import PainChain from "@/components/viz/PainChain";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { pains } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "The six pains on a hotel floor";
const description =
  "Supervisor bottleneck, ghost SOP, invisible performance, attrition, rating ceiling, audit ambush — six hotel operations pains, and one mechanism for all.";
const ogDescription =
  "Supervisor bottleneck, ghost SOP, invisible performance gap, attrition bleed, star rating ceiling, audit ambush. The six operational pains hotels actually carry, how each one sets off the next, and the single mechanism that answers all six.";
const pageName = "The six pains that compound on a hotel floor";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hotel SOP compliance problems",
    "hotel staff turnover operations",
    "failed hotel health and safety audit",
    "hotel quality inconsistency",
    "manual compliance tracking hotels",
    "hotel supervisor workload",
  ],
  alternates: { canonical: "/problems" },
  openGraph: { images: ["/opengraph-image"], title: `${pageName} · ${site.shortName}`, description: ogDescription, url: "/problems", type: "website" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], description: ogDescription },
};

export default function ProblemsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/problems", name: pageName, description }),
            breadcrumbSchema([{ name: "Problems", path: "/problems" }]),
            {
              "@type": "ItemList",
              name: "The six pains of hotel service execution",
              itemListElement: pains.map((pain, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: pain.name,
                description: `${pain.statusQuo} ${pain.wound}`,
              })),
            },
          ),
        }}
      />

      <PageHero
        eyebrow="The case"
        breadcrumb={[{ label: "Problems" }]}
        titleLines={[
          <>Six problems.</>,
          <>
            They <span className="text-gradient">compound.</span>
          </>,
        ]}
        lede="In a working property these do not queue politely. Each one makes the next one worse."
      />

      <Container className="pb-10">
        <Reveal>
          <PainChain />
        </Reveal>
      </Container>

      <Rule />

      {/* Detail, two lines per pain */}
      <div className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <Eyebrow>In full</Eyebrow>
          </Reveal>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {pains.map((pain) => (
              // Reveal renders the div itself, so the structure stays a valid
              // dl > div > dt + dd — no wrapper between them.
              <Reveal
                key={pain.id}
                as="div"
                id={pain.id}
                className="grid scroll-mt-28 gap-4 py-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-10"
              >
                <dt>
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.76rem] tabular-nums text-brand-cyan">
                      {pain.index}
                    </span>
                    <span className="text-[1.15rem] leading-tight font-semibold text-white">
                      {pain.name}
                    </span>
                  </span>
                  <span className="mt-2.5 block font-mono text-[0.72rem] tracking-[0.12em] text-faint uppercase">
                    {pain.metric}
                  </span>
                </dt>
                <dd className="grid gap-4 sm:grid-cols-2 sm:gap-8">
                  <p className="text-[0.92rem] leading-relaxed text-muted">{pain.statusQuo}</p>
                  <p className="border-l border-brand/45 pl-4 text-[0.92rem] leading-relaxed text-paper">
                    {pain.answer}
                  </p>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={80} className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demo" size="lg">
              Book a 15-min demo
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/platform" variant="outline" size="lg">
              See the platform
            </ButtonLink>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
