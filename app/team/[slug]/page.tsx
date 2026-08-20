import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Aurora from "@/components/fx/Aurora";
import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import Avatar from "@/components/ui/Avatar";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { team } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, personSchema, webPageSchema } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return team.map((person) => ({ slug: person.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = team.find((entry) => entry.slug === slug);
  if (!person) return {};

  // The first sentence is written to be the search snippet.
  // Under 155 so it is not truncated, and it opens with the sentence a
  // "who is <name>" query should be answered with.
  const description = `${person.name} is the ${person.role} of ${site.name}, the service execution platform for hotel operations.`;
  const ogDescription = `${description} ${person.headline}`;
  const first = person.name.split(" ")[0];

  return {
    title: `${person.name} — ${person.shortRole}`,
    description,
    keywords: [
      person.name,
      `${person.name} ${site.shortName}`,
      `${person.name} ${person.shortRole}`,
      `who is ${person.name}`,
      `${person.name} founder`,
      `${first} ${site.shortName}`,
      `${site.name} ${person.shortRole}`,
      ...person.focus,
    ],
    alternates: { canonical: `/team/${person.slug}` },
    openGraph: {
      type: "profile",
      title: `${person.name} — ${person.shortRole}, ${site.name}`,
      description: ogDescription,
      url: `/team/${person.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.name} — ${person.shortRole}, ${site.name}`,
      description: ogDescription,
    },
  };
}

export default async function PersonPage({ params }: Props) {
  const { slug } = await params;
  const person = team.find((entry) => entry.slug === slug);
  if (!person) notFound();

  const others = team.filter((entry) => entry.slug !== person.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              ...webPageSchema({
                path: `/team/${person.slug}`,
                name: `${person.name} — ${person.shortRole}, ${site.name}`,
                description: `${person.name} is the ${person.role} of ${site.name}.`,
              }),
              "@type": "ProfilePage",
              mainEntity: { "@id": absoluteUrl(`/team/${person.slug}#person`) },
            },
            personSchema(person.slug),
            breadcrumbSchema([
              { name: "Team", path: "/team" },
              { name: person.name, path: `/team/${person.slug}` },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Aurora variant="hero" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.76rem] tracking-[0.14em] uppercase">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-brand/50">
                  /
                </span>
                <Link href="/team" className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice">
                  Team
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-brand/50">
                  /
                </span>
                <span className="inline-flex min-h-11 items-center text-paper">{person.name}</span>
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Avatar
                  person={person}
                  className="size-32 sm:size-40"
                  rounded="rounded-[1.75rem]"
                  sizes="(max-width: 640px) 128px, 160px"
                  priority
                />
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-7 text-[clamp(2.1rem,4.6vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white">
                  {person.name}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-[1rem] text-brand-ice">{person.role}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-1.5 text-[0.9rem] text-faint">{site.name}</p>
              </Reveal>

              <Reveal delay={260}>
                <dl className="mt-8 space-y-3 border-t border-line pt-7">
                  <dt className="font-mono text-[0.74rem] tracking-[0.16em] text-faint uppercase">Focus</dt>
                  <dd className="flex flex-wrap gap-2">
                    {person.focus.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[0.74rem] text-muted"
                      >
                        {focus}
                      </span>
                    ))}
                  </dd>
                </dl>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-8">
                  <ButtonLink href="/contact" variant="outline">
                    Get in touch
                    <ArrowRight />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <Eyebrow>Profile</Eyebrow>
              </Reveal>

              {/* Lead sentence doubles as the answer to "who is X" */}
              <Reveal delay={80}>
                <p className="mt-6 text-[clamp(1.2rem,2.4vw,1.6rem)] leading-[1.34] font-medium text-white">
                  {person.name} is the {person.role} of {site.name}, the service execution platform for hotel
                  operations.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-brand-ice">{person.headline}</p>
              </Reveal>

              <div className="mt-8 space-y-6">
                {person.bio.map((paragraph, index) => (
                  <Reveal key={index} delay={160 + index * 60}>
                    <p className="text-[1rem] leading-relaxed text-muted">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {/* How they operate */}
              <Reveal delay={300}>
                <h2 className="mt-12 font-mono text-[0.76rem] tracking-[0.16em] text-faint uppercase">
                  How {person.name.split(" ")[0]} operates
                </h2>
              </Reveal>
              <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2">
                {person.traits.map((trait, index) => (
                  <Reveal key={trait.title} delay={340 + index * 70} className="h-full">
                    <SpotlightCard className="panel h-full p-5">
                      <h3 className="text-[0.95rem] font-semibold text-white">{trait.title}</h3>
                      <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{trait.body}</p>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={340}>
                <blockquote className="mt-10 border-l-2 border-brand-bright/50 pl-6">
                  <p className="text-[clamp(1.1rem,2.2vw,1.45rem)] leading-snug font-medium text-white">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                  <footer className="mt-4 font-mono text-[0.76rem] tracking-[0.14em] text-faint uppercase">
                    {person.name} · {person.shortRole}
                  </footer>
                </blockquote>
              </Reveal>

              <Reveal delay={400}>
                <div className="panel mt-10 p-7">
                  <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-ice uppercase">
                    On the company
                  </p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                    {site.name} is a mobile-first service execution platform for hotel operations. The operating
                    standard lives inside a timed task on a staff member&rsquo;s phone; completing that task
                    captures photo and supervisor evidence; and that evidence compounds into an audit-ready
                    service record.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/platform"
                      className="text-[0.85rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
                    >
                      See the platform
                    </Link>
                    <Link
                      href="/about"
                      className="text-[0.85rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
                    >
                      About Focus Realm
                    </Link>
                    <Link
                      href="/problems"
                      className="text-[0.85rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
                    >
                      The six pains
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <Eyebrow>Also on the founding team</Eyebrow>
          <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2">
            {others.map((other, index) => (
              <Reveal key={other.slug} delay={index * 90} className="h-full">
                <SpotlightCard as="article" className="panel group h-full">
                  <Link href={`/team/${other.slug}`} className="block p-7">
                    <div className="flex items-center gap-4">
                      <Avatar person={other} className="size-12" rounded="rounded-xl" sizes="96px" />
                      <div>
                        <p className="text-[1.05rem] font-semibold text-white">{other.name}</p>
                        <p className="mt-1 font-mono text-[0.74rem] tracking-[0.14em] text-brand-ice uppercase">
                          {other.shortRole}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="ml-auto text-brand-cyan opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                    <p className="mt-5 text-[0.88rem] leading-relaxed text-muted">
                      &ldquo;{other.quote}&rdquo;
                    </p>
                  </Link>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
