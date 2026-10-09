import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import Avatar from "@/components/ui/Avatar";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { team, teamHomeOrder } from "@/lib/content";
import { teamPhoto } from "@/lib/team-photos";
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
    <section id="team" className="relative overflow-hidden py-14 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Founded by"
            title="A small founding team,"
            accent="building both products."
            body={
              <>
                {site.name} was founded by{" "}
                <Link href="/team/sehej-sharma" className="text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand">
                  Sehej Sharma
                </Link>{" "}
                (Founder &amp; CEO),{" "}
                <Link href="/team/ali-electricwala" className="text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand">
                  Ali Electricwala
                </Link>{" "}
                (Founder &amp; COO) and{" "}
                <Link href="/team/aditya-mishra" className="text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand">
                  Aditya Mishra
                </Link>{" "}
                (Founder &amp; CTO).
              </>
            }
          />
          <Reveal delay={200}>
            <ButtonLink href="/team" variant="outline">
              Meet the founders
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-5">
          {people.map((person, index) => (
            <Reveal key={person.slug} delay={index * 110}>
              <Link href={`/team/${person.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-ink-3">
                  {teamPhoto(person.slug) ? (
                    <Image
                      src={teamPhoto(person.slug)!}
                      fill
                      alt={`${person.name}, ${person.shortRole} of ${site.shortName}`}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover grayscale-[35%] transition-[transform,filter] duration-[1200ms] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  ) : (
                    <Avatar person={person} className="h-full w-full" rounded="rounded-none" sizes="400px" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0b1b3f]/75 to-transparent" />
                  <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between text-white">
                    <span>
                      <span className="block text-[1.35rem] leading-tight font-bold">{person.name}</span>
                      <span className="mt-1 block text-[0.88rem] text-white/85">{person.shortRole}</span>
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-white text-paper transition-transform duration-500 group-hover:-rotate-45">
                      <ArrowRight className="size-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
