import type { Metadata } from "next";

import Aurora from "@/components/fx/Aurora";
import { Tilt } from "@/components/fx/Kinetics";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import EducationShowcase from "@/components/home/EducationShowcase";
import HeroVisual from "@/components/home/HeroVisual";
import Marquee from "@/components/home/Marquee";
import MiseShowcase from "@/components/home/MiseShowcase";
import Subtraction from "@/components/home/Subtraction";
import TeamStrip from "@/components/home/TeamStrip";
import TrustedBy from "@/components/home/TrustedBy";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
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
 * The parent-company page: a short introduction, then each product line shown
 * as product rather than described. Mise uses real product screens; the
 * education board is an illustrative UI built in code.
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
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <Aurora variant="hero" />
        <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal immediate>
              <Eyebrow dot>Focus Realm · Software company</Eyebrow>
            </Reveal>
            <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.04em] text-paper">
              <MaskedLines
                lines={[
                  <>Software for the work</>,
                  <span key="b">
                    that has to go <span className="serif text-brand">right.</span>
                  </span>,
                ]}
                stagger={90}
                immediate
              />
            </h1>
            <Reveal delay={300} immediate>
              <p className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-muted">
                We build learning and operations platforms. Two today: one for classrooms, one for hotels.
              </p>
            </Reveal>
            <Reveal delay={400} immediate>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#products" size="lg">
                  See the products
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Talk to us
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} immediate variant="scale">
            <Tilt max={5} glare={false}>
              <HeroVisual />
            </Tilt>
          </Reveal>
        </Container>
      </section>

      <Marquee />

      {/* Products */}
      <section id="products" className="relative scroll-mt-24 pt-20 sm:pt-32">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.035em] text-paper">
              Two verticals. <span className="serif font-normal text-brand">One standard.</span>
            </h2>
          </Reveal>
        </Container>

        {/* Education */}
        <Container className="mt-14 sm:mt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <Reveal variant="scale">
              <EducationShowcase />
            </Reveal>
            <div>
              <Reveal>
                <p className="text-[0.95rem] font-semibold text-brand">01 — Education</p>
                <h3 className="mt-3 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-paper">
                  Focus Realm <span className="serif font-normal">Education</span>
                </h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                  An AI-driven, gamified learning platform for schools, colleges and universities, made for the
                  interactive board at the front of the room.
                </p>
              </Reveal>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {educationPoints.map(([t, b], i) => (
                  <Reveal as="li" key={t} delay={i * 90} className="flex gap-5 py-4">
                    <span className="w-6 pt-0.5 text-[0.85rem] font-semibold text-brand tabular-nums">0{i + 1}</span>
                    <span>
                      <span className="block text-[1rem] font-semibold text-paper">{t}</span>
                      <span className="mt-0.5 block text-[0.92rem] text-muted">{b}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200}>
                <a
                  href="https://focus-realm.com"
                  className="group mt-8 inline-flex items-center gap-2 text-[1rem] font-semibold text-brand"
                >
                  Explore Focus Realm Education
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>
          </div>
        </Container>

        {/* Mise */}
        <div className="mt-24 px-3 sm:mt-32 sm:px-5">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#0b1b3f] py-16 sm:rounded-[2.75rem] sm:py-24">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(77,151,209,0.28),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(42,91,215,0.25),transparent)]"
            />
            <Container>
              <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                  <Reveal>
                    <p className="text-[0.95rem] font-semibold text-[#8fb0ff]">02 — Hospitality</p>
                    <h3 className="mt-3 text-[clamp(2.4rem,4.4vw,3.4rem)] leading-[1] font-bold tracking-[-0.03em] text-white">
                      Mise<span className="serif font-normal text-[#8fb0ff]">.</span>
                    </h3>
                    <p className="mt-5 text-[1.05rem] leading-relaxed text-white/80">
                      The service execution platform for hotels. Standards become timed tasks on staff phones, and
                      the work proves itself.
                    </p>
                  </Reveal>
                  <ul className="mt-8 divide-y divide-white/12 border-y border-white/12">
                    {misePoints.map(([t, b], i) => (
                      <Reveal as="li" key={t} delay={i * 90} className="flex gap-5 py-4">
                        <span className="w-6 pt-0.5 text-[0.85rem] font-semibold text-[#8fb0ff] tabular-nums">0{i + 1}</span>
                        <span>
                          <span className="block text-[1rem] font-semibold text-white">{t}</span>
                          <span className="mt-0.5 block text-[0.92rem] text-white/75">{b}</span>
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={200}>
                    <a
                      href="https://misehotel.com"
                      className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.98rem] font-semibold text-paper transition-transform duration-500 hover:-translate-y-0.5"
                    >
                      Explore Mise
                      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </a>
                  </Reveal>
                </div>
                <Reveal variant="scale">
                  <MiseShowcase />
                </Reveal>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* How we build */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <h2 className="text-[clamp(2rem,4vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.035em] text-paper">
                Most software ships everything.{" "}
                <span className="serif font-normal text-brand">We ship what gets used.</span>
              </h2>
              <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted">
                We call it strategic minimalism. If a feature doesn&rsquo;t help the person doing the work, it
                comes out.
              </p>
            </Reveal>
            <Subtraction />
          </div>
        </Container>
      </section>

      <TrustedBy />
      <TeamStrip />
    </>
  );
}
