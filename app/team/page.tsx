import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import PageHero from "@/components/ui/PageHero";
import { Container, Rule, SectionHeading } from "@/components/ui/Section";
import { advisors, personas, team } from "@/lib/content";
import { allAdvisorsSchema, breadcrumbSchema, jsonLdGraph, personSchema, webPageSchema } from "@/lib/seo";
import { advisorPhoto } from "@/lib/team-photos";
import { site, siteUrl } from "@/lib/site";

// The layout template appends "· Focus Realm", so the title must not repeat it.
const title = "Founding team & leadership";
const description =
  "Focus Realm Hospitality was founded by Sehej Sharma (CEO), Ali Electricwala (COO) and Aditya Mishra (CTO). Meet the founders behind the platform.";
const ogDescription =
  "Focus Realm Hospitality was founded by Sehej Sharma (Co-Founder & CEO), Ali Electricwala (Co-Founder & COO) and Aditya Mishra (Co-Founder & CTO). Meet the founders building the service execution platform for hotel operations.";
const pageName = "The founders of Focus Realm Hospitality";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Focus Realm team",
    "Sehej Sharma",
    "Sehej Sharma Focus Realm",
    "Ali Electricwala",
    "Aditya Mishra",
    "Focus Realm Hospitality founders",
    "Focus Realm CEO",
    "Focus Realm advisors",
    "Focus Realm board of advisors",
    "Parul Sharma",
    "Parul Masand Sharma",
    "Renu Mehra",
  ],
  alternates: { canonical: "/team" },
  openGraph: { images: ["/opengraph-image"], title: `${pageName} · ${site.shortName}`, description: ogDescription, url: "/team", type: "website" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], description: ogDescription },
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/team", name: pageName, description }),
            breadcrumbSchema([{ name: "Team", path: "/team" }]),
            {
              "@type": "ItemList",
              name: `Founders of ${site.name}`,
              itemListElement: team.map((person, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${siteUrl}/team/${person.slug}`,
                name: `${person.name} — ${person.role}`,
              })),
            },
            ...team.map((person) => personSchema(person.slug)),
            {
              "@type": "ItemList",
              name: `Board of advisors of ${site.name}`,
              itemListElement: advisors.map((advisor, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${advisor.name} — ${advisor.role}`,
              })),
            },
            ...allAdvisorsSchema(),
          ),
        }}
      />

      <PageHero
        eyebrow="Founding team"
        breadcrumb={[{ label: "Team" }]}
        titleLines={[
          <>Three people.</>,
          <>
            One <span className="text-gradient">discipline.</span>
          </>,
        ]}
        lede="Focus Realm Hospitality is built by a founding team that has spent its time in the same argument: what can we remove and still have the standard execute? Everything on this platform survived that question."
      />

      {/* Profiles */}
      <section className="relative pb-8">
        <Container>
          <div className="space-y-5">
            {team.map((person, index) => (
              <Reveal key={person.slug} delay={index * 80}>
                <SpotlightCard as="article" className="panel group overflow-hidden">
                  <Link
                    href={`/team/${person.slug}`}
                    className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start"
                  >
                    <div>
                      <Avatar
                        person={person}
                        className="size-24"
                        rounded="rounded-3xl"
                        sizes="192px"
                        priority={index === 0}
                      />
                      <h2 className="mt-6 text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-semibold text-white">
                        {person.name}
                      </h2>
                      <p className="mt-2.5 font-mono text-[0.76rem] tracking-[0.14em] text-brand-ice uppercase">
                        {person.role}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] text-brand-cyan transition-all duration-500 group-hover:gap-3">
                        Read full profile
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>

                    <div>
                      <p className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug font-semibold text-white">
                        {person.headline}
                      </p>
                      <p className="mt-5 border-l-2 border-brand/40 pl-5 text-[0.98rem] leading-relaxed text-paper italic">
                        &ldquo;{person.quote}&rdquo;
                      </p>
                      <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">{person.bio[0]}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {person.focus.map((focus) => (
                          <li
                            key={focus}
                            className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[0.72rem] text-faint"
                          >
                            {focus}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule className="mt-16" />

      {/* Board of advisors — outside operators who carry their own practice */}
      <section id="advisors" className="relative overflow-hidden py-14 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Board of advisors"
            title="The people who tell us"
            accent="when we are wrong."
            body="Our advisors run their own practices in hospitality training and image consulting. They are not staff — which is exactly why their read on the product is worth having."
          />

          <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2">
            {advisors.map((advisor, index) => (
              <Reveal key={advisor.slug} delay={index * 90} className="h-full">
                <SpotlightCard as="article" className="panel h-full p-7 sm:p-8">
                  <div className="flex items-start gap-5">
                    <Avatar
                      person={advisor}
                      src={advisorPhoto(advisor.slug)}
                      alt={`${advisor.name} — ${advisor.role}`}
                      className="size-16"
                      rounded="rounded-2xl"
                      sizes="128px"
                    />
                    <div>
                      <h3 className="text-[1.2rem] leading-tight font-semibold text-white">
                        {advisor.name}
                      </h3>
                      {advisor.alternateName ? (
                        <p className="mt-1 text-[0.82rem] text-faint">{advisor.alternateName}</p>
                      ) : null}
                      <p className="mt-2 font-mono text-[0.74rem] tracking-[0.14em] text-brand-ice uppercase">
                        {advisor.role}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-line pt-6">
                    {advisor.credentials.map((credential) => (
                      <li key={credential} className="flex gap-3 text-[0.9rem] leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand-cyan" />
                        {credential}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-l-2 border-brand/40 pl-5 text-[0.88rem] leading-relaxed text-paper">
                    {advisor.problem}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* Demo personas — the other five names in every Focus Realm conversation */}
      <section className="relative overflow-hidden py-14 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The other five names"
            title="And the people we"
            accent="build for."
            body="Our demo environment carries five fixed personas. They are fictional, and they are the people whose shift the product is actually designed around."
          />

          {/* auto-rows-fr + h-full: the first row wraps to two lines and the
              second does not, so without this the rows size independently and
              the cards end up 104px against 86px. */}
          <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona, index) => (
              <Reveal key={persona.name} delay={index * 70} className="h-full">
                <div className="panel flex h-full items-center gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/18 font-mono text-[0.75rem] text-brand-ice">
                    {persona.initials}
                  </span>
                  <div>
                    <p className="text-[0.92rem] font-medium text-white">{persona.name}</p>
                    <p className="mt-0.5 text-[0.78rem] text-faint">
                      {persona.role} · {persona.role_interface} interface
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14">
            <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
              <div>
                <p className="text-[1.2rem] font-semibold text-white">Talk to the founding team directly.</p>
                <p className="mt-2 text-[0.92rem] text-muted">
                  Early conversations go straight to the people building it.
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
