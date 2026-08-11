import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { buyers, pains } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "The six pains that compound on a hotel floor";
const description =
  "Supervisor bottleneck, ghost SOP, invisible performance gap, attrition bleed, star rating ceiling, audit ambush. The six operational pains hotels actually carry, how each one sets off the next, and the single mechanism that answers all six.";

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
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/problems", type: "website" },
};

export default function ProblemsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/problems", name: title, description }),
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
          <>Six pains.</>,
          <>
            They do not sit <span className="text-gradient">side by side.</span>
          </>,
          <>
            They <span className="text-gradient">compound.</span>
          </>,
        ]}
        lede="We never open with features. We open with the snowball — because in a working property these six do not queue politely. Each one makes the next one worse, and by the time the audit lands you are carrying all six at once."
      />

      {/* Chain overview */}
      <Container className="pb-6">
        <Reveal>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pains.map((pain) => (
              <li key={pain.id}>
                <a
                  href={`#${pain.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-white/[0.02] px-4 py-3.5 transition-all duration-500 hover:border-brand-bright/40 hover:bg-brand/8"
                >
                  <span className="font-mono text-[0.68rem] text-brand-ice">{pain.index}</span>
                  <span className="text-[0.9rem] text-paper transition-colors group-hover:text-white">
                    {pain.name}
                  </span>
                  <span className="ml-auto text-brand-cyan opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    <ArrowRight className="size-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>

      {/* Full detail */}
      <div className="py-12 sm:py-16">
        {pains.map((pain, index) => (
          <section
            key={pain.id}
            id={pain.id}
            className="relative scroll-mt-28 border-t border-line py-16 sm:py-20"
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Reveal>
                    <span className="font-mono text-[clamp(3.5rem,9vw,7rem)] leading-none font-semibold text-white/8">
                      {pain.index}
                    </span>
                  </Reveal>
                  <Reveal delay={60}>
                    <h2 className="mt-2 text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.04] font-semibold text-white">
                      {pain.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="mt-5 inline-flex rounded-full border border-line px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.12em] text-brand-ice uppercase">
                      {pain.metric}
                    </p>
                  </Reveal>
                  {index < pains.length - 1 ? (
                    <Reveal delay={180}>
                      <p className="mt-8 max-w-xs text-[0.82rem] leading-relaxed text-faint">
                        Which feeds directly into{" "}
                        <a href={`#${pains[index + 1].id}`} className="text-brand-ice underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white">
                          {pains[index + 1].name.toLowerCase()}
                        </a>
                        .
                      </p>
                    </Reveal>
                  ) : null}
                </div>

                <div className="space-y-8">
                  <Reveal>
                    <div>
                      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                        Status quo
                      </p>
                      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{pain.statusQuo}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={80}>
                    <div>
                      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                        Impact chain
                      </p>
                      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{pain.impactChain}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={160}>
                    <div className="border-l-2 border-[#ff9b9b]/50 pl-5">
                      <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-[#ff9b9b]">
                        The wound
                      </p>
                      <p className="mt-3 text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug font-medium text-white">
                        {pain.wound}
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={220}>
                    <SpotlightCard className="rounded-2xl border border-brand-bright/25 bg-brand/8 p-6">
                      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-brand-cyan uppercase">
                        How Focus Realm answers it
                      </p>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-paper">{pain.answer}</p>
                    </SpotlightCard>
                  </Reveal>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <Rule />

      {/* One mechanism */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_oklab,var(--color-brand)_12%,transparent),transparent)]"
        />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">The answer</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.04] font-semibold text-white">
                Six pains. One mechanism.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
                Standard inside the task → evidence generated automatically → service record that compounds. Not
                six modules bolted together. One loop, installed once, that stops the snowball at the point it
                forms.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/platform" size="lg">
                  See how it works
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/demo" variant="outline" size="lg">
                  Book a 15-min demo
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-5 lg:grid-cols-3">
            {buyers.map((buyer, index) => (
              <Reveal key={buyer.title} delay={index * 90}>
                <div className="panel h-full p-7">
                  <h3 className="text-[1.05rem] font-semibold text-white">{buyer.title}</h3>
                  <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">{buyer.pain}</p>
                  <p className="mt-4 border-t border-line pt-4 text-[0.88rem] leading-relaxed text-paper">
                    {buyer.win}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
