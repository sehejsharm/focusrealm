import type { Metadata } from "next";
import Link from "next/link";

import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import Architecture from "@/components/home/Architecture";
import ConsoleStage from "@/components/home/ConsoleStage";
import EducationShowcase from "@/components/home/EducationShowcase";
import HeroNetwork from "@/components/home/HeroNetwork";
import MiseShowcase from "@/components/home/MiseShowcase";
import PlatformConsole from "@/components/home/PlatformConsole";
import TeamStrip from "@/components/home/TeamStrip";
import TrustedBy from "@/components/home/TrustedBy";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { allPeopleSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site, siteUrl } from "@/lib/site";

const title = "Focus Realm | Software for Education and Hospitality";

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.shortDescription,
  keywords: [
    "Focus Realm",
    "education software India",
    "learning management platform for schools",
    "AI learning platform for universities",
    "interactive classroom board software",
    "hotel operations software",
    "hotel SOP software",
    "Mise hotel",
    "Focus Realm Education",
  ],
  alternates: { canonical: "/" },
  openGraph: { title, description: site.shortDescription, url: "/", type: "website" },
  twitter: { card: "summary_large_image", title, description: site.shortDescription },
};

/**
 * The parent-company page. Introduces the company, shows each product line as
 * product, then answers what an institutional buyer asks next: how it is
 * built, how data is handled, and who is accountable.
 */
const educationPoints = [
  ["Core academic hub", "Courses, assignments, grading, attendance and notices."],
  ["Optional modules", "AI analytics, gamification, parent portal, timetabling."],
  ["Employability layer", "Certification courses and a skills-led digital résumé."],
] as const;

const misePoints = [
  ["Timed tasks", "Every standard runs step by step on staff phones."],
  ["Evidence built in", "Photo and sign-off captured as the work happens."],
  ["Audit-ready record", "A service record per person, per property."],
] as const;

const trust = [
  ["Encrypted in transit", "HTTPS everywhere, with HSTS enforced on every response."],
  ["Role-based access", "Staff, managers and administrators see only what their role needs."],
  ["Activity record", "Work is timestamped and attributable, so it stands up to review."],
  ["Data protection", "Personal data handled under India's DPDP Act, 2023."],
  ["Cloud infrastructure", "Built on Google Cloud and Firebase."],
  ["Responsible disclosure", "A published security contact, answered by the founding team."],
] as const;


/**
 * Answer-ready FAQ. Rendered on the page and mirrored in FAQPage schema, so
 * search and answer engines quote the same words a visitor reads.
 */
const faqs = [
  {
    q: "What is Focus Realm?",
    a: `Focus Realm is a software company founded in ${site.founded} in India. It builds learning and operations platforms for institutions, with two product lines: Focus Realm Education for schools, colleges and universities, and Mise for hotels.`,
  },
  {
    q: "What products does Focus Realm make?",
    a: "Focus Realm Education is an AI-driven, gamified learning platform for schools, colleges and universities, built to work with interactive classroom boards. Mise is the service execution platform for hotels: standard operating procedures run as timed tasks on staff phones, with photo evidence and an audit-ready service record.",
  },
  {
    q: "What does Focus Realm Education include?",
    a: "Three layers: a core academic hub (courses, assignments, grading, attendance and notices), optional modules (AI analytics, gamification, a parent portal, faculty development and timetabling), and an employability layer with certification courses and a skills-led digital résumé.",
  },
  {
    q: "Is Mise a learning management system?",
    a: "No. A learning management system records that someone completed training. Mise makes sure the work itself gets done on time and to standard, and records the evidence that it was.",
  },
  {
    q: "Who founded Focus Realm?",
    a: "Focus Realm was founded by Sehej Sharma (Founder & CEO), Ali Electricwala (Founder & COO) and Aditya Mishra (Founder & CTO).",
  },
  {
    q: "How does Focus Realm protect institutional data?",
    a: "The products run on Google Cloud and Firebase, with encryption in transit and at rest, role-based access, and a timestamped activity record. Personal data is handled under India's DPDP Act, 2023. Details are on the Focus Realm Trust centre at focusrealm.org/security.",
  },
  {
    q: "Where does Focus Realm work?",
    a: "Focus Realm works with schools, universities and hotels across India, the wider Asia region and the Middle East.",
  },
];

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[0.85rem] font-semibold ${dark ? "text-[#a9c1ff]" : "text-brand"}`}>{children}</p>
  );
}

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
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/#faq`,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#070d1f] pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_10%,rgba(42,91,215,0.35),transparent_70%)]"
        />
        <HeroNetwork />
        <Container>
          <div className="max-w-3xl">
            <Reveal immediate>
              <p className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.04] px-3 py-1 text-[0.82rem] text-white/75">
                <span className="size-1.5 rounded-full bg-[#7fa6ff]" />
                Software for education and hospitality
              </p>
            </Reveal>
            <h1 className="mt-7 text-[clamp(2.5rem,5.4vw,4.4rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-white">
              <MaskedLines
                lines={[<>Software for the work</>, <span key="b" className="text-[#a9c1ff]">that has to go right.</span>]}
                stagger={90}
                immediate
              />
            </h1>
            <Reveal delay={300} immediate>
              <p className="mt-7 max-w-2xl text-[1.12rem] leading-relaxed text-white/75">
                Focus Realm builds learning and operations platforms for institutions. Focus Realm Education runs
                classrooms; Mise runs hotel service. Both are built to be used every day, not just bought.
              </p>
            </Reveal>
            <Reveal delay={400} immediate>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Talk to our team
                  <ArrowRight />
                </ButtonLink>
                <Link
                  href="#products"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border border-white/20 px-7 text-[0.98rem] font-semibold text-white transition-colors hover:border-white/50"
                >
                  Explore the products
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} immediate variant="scale" className="mt-16 sm:mt-20">
            <ConsoleStage>
              <PlatformConsole />
            </ConsoleStage>
          </Reveal>
        </Container>
      </section>

      <TrustedBy />

      {/* Products */}
      <section id="products" className="relative scroll-mt-24 py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>Products</Kicker>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-paper">
              Two verticals, each with its own product.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              A classroom and a hotel floor are different problems, so they get different products, held to one
              engineering standard.
            </p>
          </Reveal>

          {/* Education */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal variant="scale">
              <EducationShowcase />
            </Reveal>
            <div>
              <Reveal>
                <Kicker>Education</Kicker>
                <h3 className="mt-2 text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-paper">
                  Focus Realm Education
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                  An AI-driven, gamified learning platform for schools, colleges and universities, made for the
                  interactive board at the front of the room.
                </p>
              </Reveal>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {educationPoints.map(([t, b]) => (
                  <li key={t} className="py-3.5">
                    <span className="block text-[0.98rem] font-semibold text-paper">{t}</span>
                    <span className="mt-0.5 block text-[0.92rem] text-muted">{b}</span>
                  </li>
                ))}
              </ul>
              <a href="https://focus-realm.com" className="group mt-7 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-brand">
                Explore Focus Realm Education
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Mise */}
          <div className="mt-24 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:order-1">
              <Reveal>
                <Kicker>Hospitality</Kicker>
                <h3 className="mt-2 text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-paper">
                  Mise
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                  The service execution platform for hotels. Standards become timed tasks on staff phones, and the
                  work produces its own evidence.
                </p>
              </Reveal>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {misePoints.map(([t, b]) => (
                  <li key={t} className="py-3.5">
                    <span className="block text-[0.98rem] font-semibold text-paper">{t}</span>
                    <span className="mt-0.5 block text-[0.92rem] text-muted">{b}</span>
                  </li>
                ))}
              </ul>
              <a href="https://misehotel.com" className="group mt-7 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-brand">
                Explore Mise
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <Reveal variant="scale" className="lg:order-2">
              <div className="rounded-2xl bg-[#0b1430] p-6 sm:p-10">
                <MiseShowcase />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Platform */}
      <section className="relative isolate overflow-hidden bg-[#070d1f] py-20 text-white sm:py-28">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Kicker dark>How we build</Kicker>
              <h2 className="mt-3 text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white">
                Strategic minimalism, engineered for scale.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-white/75">
                Most institutional software fails at adoption, not features. We ship only what gets used, on
                foundations that hold up across a campus or a hotel group.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <Architecture />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <Kicker>Security and trust</Kicker>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-paper">
                Built for institutions that answer to someone.
              </h2>
            </Reveal>
            <ButtonLink href="/security" variant="outline">
              Trust centre
              <ArrowRight />
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {trust.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="bg-white p-6 sm:p-7">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <svg viewBox="0 0 20 20" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M10 2.5l6 2.5v4.5c0 4-2.6 6.6-6 8-3.4-1.4-6-4-6-8V5l6-2.5z" />
                    <path d="M7.2 10l2 2 3.8-4" />
                  </svg>
                </span>
                <p className="mt-4 text-[1.02rem] font-semibold text-paper">{t}</p>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <Kicker>FAQ</Kicker>
              <h2 className="mt-3 text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-paper">
                Questions institutions ask us first.
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-muted">
                Anything else, <Link href="/contact" className="font-medium text-brand underline underline-offset-4">ask the founders directly</Link>.
              </p>
            </Reveal>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold text-paper [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line text-brand transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <TeamStrip />
    </>
  );
}
