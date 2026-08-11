import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { team } from "@/lib/content";

export default function TeamStrip() {
  return (
    <section id="team" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Founding team"
            title="Built by people who"
            accent="removed things on purpose."
            body="A three-person core with one shared discipline: if a screen does not help someone finish the task in front of them, it does not ship."
          />
          <Reveal delay={200}>
            <ButtonLink href="/team" variant="outline">
              Meet the team
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {team.map((person, index) => (
            <Reveal key={person.slug} delay={index * 90}>
              <SpotlightCard as="article" className="panel group h-full overflow-hidden">
                <Link href={`/team/${person.slug}`} className="block h-full p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-brand-bright/25 bg-linear-to-br from-brand/30 to-brand-deep/20 font-mono text-[0.95rem] text-white">
                      {person.initials}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-brand-cyan opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <ArrowRight className="size-4" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-[1.3rem] leading-tight font-semibold text-white">{person.name}</h3>
                  <p className="mt-2 font-mono text-[0.6rem] tracking-[0.14em] text-brand-ice uppercase">
                    {person.shortRole}
                  </p>
                  <p className="mt-5 text-[0.88rem] leading-relaxed text-muted">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {person.focus.slice(0, 3).map((focus) => (
                      <li
                        key={focus}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.68rem] text-faint"
                      >
                        {focus}
                      </li>
                    ))}
                  </ul>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
