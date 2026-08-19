import Link from "next/link";
import { KineticHeading } from "@/components/fx/Kinetics";
import Reveal from "@/components/fx/Reveal";
import PainChain from "@/components/viz/PainChain";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { pains } from "@/lib/content";

/**
 * Six pains as a chain you can walk. Previously six cards of prose in a
 * pinned horizontal scroller; now a diagram with one link open at a time.
 */
export default function PainSnowball() {
  return (
    <section id="problems" className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>What it is for</Eyebrow>
            </Reveal>
            <KineticHeading
              text="Six hotel operations problems, one chain."
              variant="unmask"
              accentFrom={2}
              className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white"
            />
          </div>
          <Reveal delay={120}>
            <ButtonLink href="/problems" variant="outline">
              All six hotel operations problems
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <PainChain />
        </Reveal>

        {/* All six, in full, on the page.
            The chain above is the graphic; these are the words a hotel
            operations manager actually types into a search box, and they were
            previously only reachable behind a click to /problems. Kept to
            three so the section stays short. */}
        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {pains.map((pain, index) => (
            <Reveal key={pain.id} delay={(index % 3) * 70}>
              <article className="border-t border-line pt-5">
                <p className="font-mono text-[0.72rem] text-faint tabular-nums">{pain.index}</p>
                <h3 className="mt-2 text-[1.05rem] font-semibold text-white">{pain.name}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{pain.statusQuo}</p>
                <p className="mt-3 text-[0.88rem] leading-relaxed">
                  <span className="font-mono text-[0.72rem] tracking-[0.12em] text-[#e8a0a0] uppercase">
                    Costs you{" "}
                  </span>
                  <span className="text-paper">{pain.wound}</span>
                </p>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed">
                  <span className="font-mono text-[0.72rem] tracking-[0.12em] text-brand-cyan uppercase">
                    Closed by{" "}
                  </span>
                  <span className="text-muted">{pain.answer}</span>
                </p>
                <Link
                  href={`/problems#${pain.id}`}
                  className="mt-4 inline-block text-[0.84rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-bright"
                >
                  {pain.name}: how Focus Realm closes it
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
