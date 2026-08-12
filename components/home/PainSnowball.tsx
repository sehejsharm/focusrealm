import Reveal from "@/components/fx/Reveal";
import PainChain from "@/components/viz/PainChain";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

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
            <Reveal delay={60}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white">
                Six problems, one chain.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ButtonLink href="/problems" variant="outline">
              Read the detail
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <PainChain />
        </Reveal>
      </Container>
    </section>
  );
}
