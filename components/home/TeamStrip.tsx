import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import Avatar from "@/components/ui/Avatar";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { team, teamHomeOrder } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Founder cards. Order comes from `teamHomeOrder`, which puts the CEO in the
 * centre of the three-up; /team and /about use the canonical order instead.
 *
 * Each name is a real heading with the full role spelled out beside it — this
 * section is what a founder-name search lands on when it lands on the home page.
 */
export default function TeamStrip({
  /** `home` centres the CEO; `canonical` leads with him. */
  order = "home",
}: {
  order?: "home" | "canonical";
}) {
  const people = order === "home" ? teamHomeOrder : team;

  return (
    <section id="team" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Founded by"
            title="Three founders. One discipline:"
            accent="remove it unless it helps the shift."
            body={`${site.name} was founded by Sehej Sharma (Co-Founder & CEO), Ali Electricwala (Co-Founder & COO) and Aditya Mishra (Co-Founder & CTO).`}
          />
          <Reveal delay={200}>
            <ButtonLink href="/team" variant="outline">
              Meet the founders
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {people.map((person, index) => (
            <Reveal key={person.slug} delay={index * 90}>
              <SpotlightCard as="article" className="panel group h-full overflow-hidden">
                <Link href={`/team/${person.slug}`} className="block h-full p-7">
                  <div className="flex items-center gap-4">
                    <Avatar person={person} className="size-14" sizes="112px" />
                    <span
                      aria-hidden
                      className="ml-auto text-brand-cyan opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      <ArrowRight className="size-4" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-[1.3rem] leading-tight font-semibold text-white">{person.name}</h3>
                  <p className="mt-2 font-mono text-[0.6rem] tracking-[0.14em] text-brand-ice uppercase">
                    {person.shortRole} · {site.shortName}
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
