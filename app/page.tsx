import type { Metadata } from "next";
import Link from "next/link";

import Aurora from "@/components/fx/Aurora";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import TeamStrip from "@/components/home/TeamStrip";
import TrustedBy from "@/components/home/TrustedBy";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { allPeopleSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";

const title = "Focus Realm | Technology for Education and Hospitality";
const description =
  "Focus Realm builds technology for two sectors: learning and training programmes in education, and Mise, the service execution platform for hotels.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * The parent-company page. Focus Realm works in two sectors and runs each as
 * its own product, so this page introduces the company and hands the visitor
 * to the right one. It describes products, not sites, and it keeps the two
 * apart on purpose: the hospitality product is explicitly not a learning
 * platform, so the education offer is never presented as part of it.
 */
const sectors = [
  {
    id: "education",
    index: "01",
    sector: "Education",
    name: "Focus Realm Education",
    line: "Learning and capability programmes for schools, trainers and teams.",
    products: [
      {
        title: "Learning platform",
        body: "Courses, staff training and compliance tracking, with the reporting an institution or training team needs.",
      },
      {
        title: "AI training programmes",
        body: "Outcome-driven programmes that take teams from first exposure to real, day-to-day use of AI.",
      },
    ],
    who: "Schools, corporate trainers, startups and technology teams.",
    cta: { label: "Explore Focus Realm Education", href: "https://focus-realm.com", external: true },
  },
  {
    id: "hospitality",
    index: "02",
    sector: "Hospitality",
    name: "Mise",
    line: "The service execution platform for hotels.",
    products: [
      {
        title: "Timed tasks on staff phones",
        body: "Hotel SOPs run step by step, against the clock, on the phones staff already carry.",
      },
      {
        title: "Evidence and an audit-ready record",
        body: "Photo evidence and supervisor sign-off captured in the work, compounding into a service record per property.",
      },
    ],
    who: "Hotels, hotel groups and distributed properties.",
    cta: { label: "Explore Mise", href: "https://misehotel.com", external: true },
  },
] as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/", name: "Focus Realm — education and hospitality", description }),
            organizationSchema,
            ...allPeopleSchema(),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-40 sm:pb-24">
        <Aurora variant="hero" />
        <Container>
          <Reveal immediate>
            <Eyebrow>Focus Realm</Eyebrow>
          </Reveal>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[1] font-semibold tracking-[-0.04em] text-white">
            <MaskedLines
              lines={[<>One company.</>, <span key="b" className="text-gradient">Two sectors.</span>]}
              stagger={80}
              immediate
            />
          </h1>
          <Reveal delay={300} immediate>
            <p className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-muted sm:text-[1.15rem]">
              Focus Realm builds the systems that make a standard stick — in the classroom and the
              training room, and on the hotel floor.
            </p>
          </Reveal>
          <Reveal delay={400} immediate>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#sectors" size="lg">
                Our two sectors
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Talk to us
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Sectors */}
      <section id="sectors" className="relative scroll-mt-24 overflow-hidden py-14 sm:py-24">
        <Container>
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Where we work</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white">
                Education and hospitality.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-2 lg:gap-6">
            {sectors.map((s, i) => (
              <Reveal key={s.id} delay={i * 90} className="h-full">
                <article id={s.id} className="panel flex h-full scroll-mt-28 flex-col p-7 sm:p-9">
                  <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
                    Sector {s.index} · {s.sector}
                  </p>
                  <h3 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-muted">{s.line}</p>

                  <ul className="mt-7 space-y-5">
                    {s.products.map((p) => (
                      <li key={p.title} className="border-l border-line pl-5">
                        <p className="text-[0.95rem] font-medium text-white">{p.title}</p>
                        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-faint">{p.body}</p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 text-[0.86rem] text-faint">
                    <span className="text-paper">For </span>
                    {s.who.charAt(0).toLowerCase() + s.who.slice(1)}
                  </p>

                  <div className="mt-auto pt-8">
                    {s.cta.external ? (
                      <a
                        href={s.cta.href}
                        className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-brand-cyan underline decoration-brand/40 underline-offset-4 hover:decoration-brand-bright"
                      >
                        {s.cta.label}
                        <ArrowRight />
                      </a>
                    ) : (
                      <Link
                        href={s.cta.href}
                        className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-brand-cyan underline decoration-brand/40 underline-offset-4 hover:decoration-brand-bright"
                      >
                        {s.cta.label}
                        <ArrowRight />
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* What connects them */}
      <section className="relative overflow-hidden py-14 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Why two sectors</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.06] font-semibold text-white">
                Knowing the standard and meeting it are different problems.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-5 text-[1rem] leading-relaxed text-muted lg:pt-10">
                <p>
                  In education, the work is helping people learn what good looks like. In hospitality,
                  it is making sure good happens on every shift, and proving it did.
                </p>
                <p>
                  We treat them as separate problems with separate products — built by the same team, to
                  the same rule: <span className="text-paper">remove it unless it helps the person doing the work.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <TrustedBy />
      <TeamStrip />
    </>
  );
}
