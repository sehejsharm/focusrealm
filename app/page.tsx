import type { Metadata } from "next";
import Link from "next/link";

import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import Architecture from "@/components/home/Architecture";
import ConsoleStage from "@/components/home/ConsoleStage";
import EducationShowcase from "@/components/home/EducationShowcase";
import HeroProducts from "@/components/home/HeroProducts";
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
const faqGroups = [
  {
    group: "The company",
    items: [
      {
        q: "What is Focus Realm?",
        a: `Focus Realm is a software company founded in ${site.founded} in India. It builds learning and operations platforms for institutions, with two product lines: Focus Realm Education for schools, colleges and universities, and Mise for hotels.`,
      },
      {
        q: "Who founded Focus Realm?",
        a: "Focus Realm was founded by Sehej Sharma (Founder & CEO), Ali Electricwala (Founder & COO) and Aditya Mishra (Founder & CTO). All three work directly with customers.",
      },
      {
        q: "Where does Focus Realm work?",
        a: "Focus Realm works with schools, universities and hotels across India, the wider Asia region and the Middle East.",
      },
      {
        q: "Are Focus Realm Education and Mise the same product?",
        a: "No. They are separate products for separate jobs. A classroom and a hotel floor are different problems, so each gets its own product, held to the same engineering standard.",
      },
      {
        q: "What does strategic minimalism mean in practice?",
        a: "We ship only what the people using the product need every day. Features that would sit unused are left out, because most institutional software fails at adoption, not at features.",
      },
    ],
  },
  {
    group: "The products",
    items: [
      {
        q: "What does Focus Realm Education include?",
        a: "Three layers: a core academic hub (courses, assignments, grading, attendance and notices), optional modules (AI analytics, gamification, a parent portal, faculty development and timetabling), and an employability layer with certification courses and a skills-led digital résumé.",
      },
      {
        q: "Who is Focus Realm Education for?",
        a: "Schools, colleges and universities. It is designed with principals, deans and boards in mind as the people who decide, and teachers and students as the people who use it every day.",
      },
      {
        q: "Does Focus Realm Education work with interactive classroom boards?",
        a: "Yes. It is built to work with the interactive board at the front of the room, so a lesson, a quick check or a poll can run where the class is already looking.",
      },
      {
        q: "What does Mise do?",
        a: "Mise is the service execution platform for hotels. Standard operating procedures run as timed tasks on staff phones, steps can require photo evidence and supervisor sign-off, and every task adds to an audit-ready service record.",
      },
      {
        q: "Is Mise a learning management system?",
        a: "No. A learning management system records that someone completed training. Mise makes sure the work itself gets done on time and to standard, and records the evidence that it was.",
      },
      {
        q: "Does Mise need special devices?",
        a: "No. Mise runs on the phones staff already carry, and managers use it on the web.",
      },
    ],
  },
  {
    group: "Getting started",
    items: [
      {
        q: "How do we get started?",
        a: "Start with a call with the founders. We scope the problem with you, then begin with a focused pilot before any wider rollout. For Mise, the default pilot covers one property for 30 days.",
      },
      {
        q: "What do we need to prepare?",
        a: "Very little. For Mise, bring the standards you already have, even if nobody follows them; we can author one with you live on the first call. For education, we start from your current courses, classes and timetable.",
      },
      {
        q: "Who supports us during rollout?",
        a: "The founding team. Pilot design and rollout are led by our COO, and the people building the product are the people you talk to.",
      },
      {
        q: "How is pricing decided?",
        a: "Pricing depends on the size and scope of the deployment. We share a written proposal after the first call.",
      },
    ],
  },
  {
    group: "Security and data",
    items: [
      {
        q: "How does Focus Realm protect institutional data?",
        a: "The products run on Google Cloud and Firebase, with encryption in transit and at rest, role-based access, and a timestamped activity record. Details are on the Focus Realm Trust centre at focusrealm.org/security.",
      },
      {
        q: "Which data protection laws do you follow?",
        a: "Personal data is handled under India's Digital Personal Data Protection Act, 2023, and under UK and EU GDPR where they apply.",
      },
      {
        q: "Can you complete our security review?",
        a: "Yes. We complete vendor security questionnaires as part of onboarding. Contact the team through focusrealm.org/contact.",
      },
      {
        q: "How do we report a security issue?",
        a: `Email ${site.email} with "Security" in the subject. Our security contact is also published at focusrealm.org/.well-known/security.txt.`,
      },
    ],
  },
];

const faqs = faqGroups.flatMap((g) => g.items);

const facts = [
  [site.founded, "Founded, in India"],
  ["2", "Product lines, one standard"],
  ["3", "Founders, all customer-facing"],
  ["3", "Regions: India, Asia, Middle East"],
] as const;

const steps = [
  ["Discovery call", "Talk to the founders about the problem you need solved, not a feature tour."],
  ["Scoped pilot", "A focused pilot on real work, with success measures agreed up front."],
  ["Rollout", "Founder-led onboarding for staff and teachers, built around how you already work."],
  ["Ongoing support", "Direct access to the team that builds the product, after go-live too."],
] as const;

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
      <section className="relative isolate overflow-hidden bg-[#070d1f] pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_75%_40%,rgba(42,91,215,0.35),transparent_70%)]"
        />
        <HeroNetwork />
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Reveal immediate>
              <p className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-3 py-1 text-[0.85rem] text-white/80">
                <span className="size-1.5 rounded-full bg-[#7fa6ff]" />
                Focus Realm · software for education and hospitality
              </p>
            </Reveal>
            <h1 className="mt-6 text-[clamp(2.2rem,3.7vw,3.3rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white">
              <MaskedLines
                lines={[
                  <>Education and hospitality software</>,
                  <span key="b" className="text-[#a9c1ff]">built to be used every day.</span>,
                ]}
                stagger={90}
                immediate
              />
            </h1>
            <Reveal delay={300} immediate>
              <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/75">
                Focus Realm builds two platforms: Focus Realm Education for schools, colleges and universities, and
                Mise for hotels. Simple enough for teachers and staff, solid enough for institutions.
              </p>
            </Reveal>
            <Reveal delay={400} immediate>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Talk to the founders
                  <ArrowRight />
                </ButtonLink>
                <Link
                  href="#products"
                  className="inline-flex h-13 items-center justify-center rounded-lg border border-white/25 px-7 text-[0.98rem] font-semibold text-white transition-colors hover:border-white/60"
                >
                  Explore the products
                </Link>
              </div>
            </Reveal>
            <Reveal delay={500} immediate>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-white/75">
                {["Founder-led onboarding", "Built in India", "Data handled under DPDP Act, 2023"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="size-4 text-[#7fa6ff]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3.5 8.5l3 3 6-6.5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={200} immediate variant="scale">
            <HeroProducts />
          </Reveal>
        </Container>
      </section>

      <TrustedBy />

      {/* One view */}
      <section className="relative isolate overflow-hidden bg-[#070d1f] pt-20 pb-24 text-white sm:pt-28 sm:pb-32">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(42,91,215,0.35),transparent_70%)]"
        />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker dark>For leadership</Kicker>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-white">
              One clear view of the work, as it happens.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75">
              Principals, deans and general managers see attendance, task completion and alerts without chasing
              anyone for a report.
            </p>
          </Reveal>
          <div className="mt-14 sm:mt-16">
            <ConsoleStage>
              <PlatformConsole />
            </ConsoleStage>
          </div>
        </Container>
      </section>

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

      {/* How we work with you */}
      <section className="border-b border-line bg-white py-20 sm:py-28">
        <Container>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {facts.map(([n, l]) => (
              <li key={l} className="bg-white p-6 sm:p-8">
                <p className="text-[clamp(2rem,4vw,2.8rem)] leading-none font-semibold tracking-[-0.03em] text-paper">{n}</p>
                <p className="mt-2 text-[0.92rem] text-muted">{l}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <Kicker>Working with us</Kicker>
              <h2 className="mt-3 text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-paper">
                From first call to go-live, you deal with the founders.
              </h2>
            </Reveal>
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map(([t, b], i) => (
                <Reveal as="li" key={t} delay={i * 80} className="panel p-6">
                  <span className="flex size-8 items-center justify-center rounded-md bg-brand text-[0.85rem] font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-[1.05rem] font-semibold text-paper">{t}</p>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{b}</p>
                </Reveal>
              ))}
            </ol>
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
            <div className="space-y-12">
              {faqGroups.map((g) => (
                <div key={g.group}>
                  <h3 className="text-[0.85rem] font-semibold text-brand">{g.group}</h3>
                  <div className="mt-3 divide-y divide-line border-y border-line">
                    {g.items.map((f) => (
                      <details key={f.q} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold text-paper [&::-webkit-details-marker]:hidden">
                          <span>{f.q}</span>
                          <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line text-brand transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-muted">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <TeamStrip />
    </>
  );
}
