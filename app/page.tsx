import type { Metadata } from "next";

import Aurora from "@/components/fx/Aurora";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import HeroVisual from "@/components/home/HeroVisual";
import Marquee from "@/components/home/Marquee";
import TeamStrip from "@/components/home/TeamStrip";
import TrustedBy from "@/components/home/TrustedBy";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { allPeopleSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Focus Realm | Software for Education and Hospitality";

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.shortDescription,
  alternates: { canonical: "/" },
  openGraph: { title, description: site.shortDescription, url: "/", type: "website" },
  twitter: { card: "summary_large_image", title, description: site.shortDescription },
};

/**
 * The parent-company page. Focus Realm is a software company with two product
 * lines, each with its own site, so this page introduces the company and hands
 * the visitor to the right product. It describes products, not websites.
 *
 * The two lines stay separate on purpose: Mise is explicitly not a learning
 * platform, so the education product is never presented as part of it.
 */
const products = [
  {
    id: "education",
    index: "01",
    sector: "Education",
    name: "Focus Realm Education",
    line: "An AI-driven, gamified learning platform for schools, colleges and universities, built to work with interactive classroom boards.",
    layers: [
      {
        title: "Core academic hub",
        body: "Courses and content, assignments and grading, attendance and notices — the essentials, without the clutter.",
      },
      {
        title: "Optional modules",
        body: "AI analytics that flag students who need help, gamification, a parent portal, faculty development tracking and timetabling.",
      },
      {
        title: "Employability layer",
        body: "Industry-recognised certification courses, and a skills dashboard that becomes a student's digital résumé.",
      },
    ],
    who: "schools, colleges and universities",
    cta: { label: "Explore Focus Realm Education", href: "https://focus-realm.com" },
  },
  {
    id: "hospitality",
    index: "02",
    sector: "Hospitality",
    name: "Mise",
    line: "The service execution platform for hotels. Hotel SOPs run as timed tasks on staff phones, and the work produces its own evidence.",
    layers: [
      {
        title: "Timed tasks on staff phones",
        body: "Each standard runs step by step, against the clock, on the phones staff already carry.",
      },
      {
        title: "Evidence in the work",
        body: "Photo evidence and supervisor sign-off are captured as the task is done, not reconstructed afterwards.",
      },
      {
        title: "An audit-ready record",
        body: "Every task compounds into a service record per person and property, ready when the auditor arrives.",
      },
    ],
    who: "hotels, hotel groups and distributed properties",
    cta: { label: "Explore Mise", href: "https://misehotel.com" },
  },
] as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/", name: title, description: site.shortDescription }),
            organizationSchema,
            ...allPeopleSchema(),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-40 sm:pb-24">
        <Aurora variant="hero" />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
          <Reveal immediate>
            <Eyebrow dot>Software company</Eyebrow>
          </Reveal>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.2vw,4.1rem)] leading-[1.04] font-bold tracking-[-0.035em] text-paper">
            <MaskedLines
              lines={[<>Software for the work</>, <span key="b" className="text-gradient">that has to go right.</span>]}
              stagger={80}
              immediate
            />
          </h1>
          <Reveal delay={300} immediate>
            <p className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-muted sm:text-[1.15rem]">
              Focus Realm builds learning and operations platforms. Two product lines today: Mise for
              hotels, and an AI-driven learning platform for schools, colleges and universities.
            </p>
          </Reveal>
          <Reveal delay={400} immediate>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#products" size="lg">
                Our products
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Talk to us
              </ButtonLink>
            </div>
          </Reveal>
          </div>
          <Reveal delay={200} immediate variant="scale">
            <HeroVisual />
          </Reveal>
        </Container>
      </section>

      <Marquee />

      {/* Products */}
      <section id="products" className="relative scroll-mt-24 overflow-hidden py-14 sm:py-24">
        <Container>
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Products</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-bold text-paper">
                Two product lines. Two verticals.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-2 lg:gap-6">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className="h-full">
                <article id={p.id} className="panel group flex h-full scroll-mt-28 flex-col p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-9">
                  <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
                    {p.index} · {p.sector}
                  </p>
                  <h3 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-bold text-paper">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{p.line}</p>

                  <ul className="mt-7 space-y-5">
                    {p.layers.map((layer) => (
                      <li key={layer.title} className="border-l-2 border-brand/25 pl-5 transition-colors duration-500 group-hover:border-brand">
                        <p className="text-[0.95rem] font-medium text-paper">{layer.title}</p>
                        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-faint">{layer.body}</p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 text-[0.86rem] text-faint">
                    <span className="text-paper">Built for </span>
                    {p.who}.
                  </p>

                  <div className="mt-auto pt-8">
                    <a
                      href={p.cta.href}
                      className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-brand-cyan underline decoration-brand/40 underline-offset-4 hover:decoration-brand-bright"
                    >
                      {p.cta.label}
                      <ArrowRight />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* How we build */}
      <section className="relative overflow-hidden py-14 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>How we build</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.06] font-bold text-paper">
                Strategic minimalism.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-5 text-[1rem] leading-relaxed text-muted lg:pt-10">
                <p>
                  Most institutional software fails at adoption, not at features. It arrives with
                  everything switched on, and the people who have to use it every day stop opening it.
                </p>
                <p>
                  We build the opposite way, in both verticals: only what the school or the property
                  actually uses, shaped around the person doing the work.{" "}
                  <span className="text-paper">If it doesn&rsquo;t help them, it comes out.</span>
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
