import Link from "next/link";
import { KineticHeading } from "@/components/fx/Kinetics";
import Reveal from "@/components/fx/Reveal";
import PainChain from "@/components/viz/PainChain";
import PainGlyph from "@/components/viz/PainGlyph";
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

        {/* Six marks, six one-liners, one answer.
            This was six paragraphs of prose. Each pain now leads with a glyph
            that draws its shape, states only what it costs, and carries its
            own number — the resolution is stated once underneath rather than
            six times, which is also closer to the truth: it is one mechanism,
            not six fixes. The full write-ups live on /problems. */}
        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain, index) => (
            <li key={pain.id}>
              <Reveal delay={(index % 3) * 70}>
                <Link
                  href={`/problems#${pain.id}`}
                  className="group block border-t border-line pt-5 transition-colors hover:border-brand-bright/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-brand-cyan transition-colors group-hover:text-brand-bright">
                      <PainGlyph id={pain.id} />
                    </span>
                    <span className="font-mono text-[0.72rem] text-faint tabular-nums">
                      {pain.index}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-white">{pain.name}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{pain.wound}</p>
                  <p className="mt-3 font-mono text-[0.72rem] tracking-[0.08em] text-faint">
                    {pain.metric}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Said once, not six times. */}
        <Reveal delay={120} className="mt-12">
          <div className="flex flex-col gap-4 border-l-2 border-brand/50 py-1 pl-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-muted">
              <span className="text-paper">All six close the same way.</span> The
              standard goes inside the timed task, so it is executed rather than
              remembered — and the evidence that proves it comes out of the work
              itself.
            </p>
            <Link
              href="/problems"
              className="shrink-0 text-[0.88rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-bright"
            >
              Read all six in full
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
