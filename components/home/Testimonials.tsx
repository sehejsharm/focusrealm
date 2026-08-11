import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { outcomes, testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="proof" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_50%_30%,color-mix(in_oklab,var(--color-brand)_11%,transparent),transparent)]"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Proof, not promises</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.03] font-semibold text-white">
              Don&rsquo;t just take
              <span className="text-gradient"> our word for it.</span>
            </h2>
          </Reveal>
        </div>

        {/* Client words */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 110}>
              <SpotlightCard as="figure" className="panel flex h-full flex-col p-8 sm:p-9">
                <span aria-hidden className="text-[2.6rem] leading-none text-brand-bright/45">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[1.02rem] leading-relaxed text-paper sm:text-[1.08rem]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="flex flex-col leading-tight">
                    <cite className="text-[0.95rem] font-medium text-white not-italic">{item.author}</cite>
                    <span className="mt-1 text-[0.78rem] text-faint">{item.role}</span>
                  </span>
                  <span className="rounded-full border border-brand-bright/30 bg-brand/12 px-3 py-1.5 font-mono text-[0.56rem] tracking-[0.12em] text-brand-ice uppercase">
                    {item.tag}
                  </span>
                </figcaption>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* What a property gets */}
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <div key={outcome.label} className="bg-ink/75">
              <Reveal delay={index * 70} className="flex h-full flex-col px-6 py-7">
                <p className="text-[clamp(1.5rem,2.6vw,2rem)] leading-none font-semibold tracking-[-0.03em] text-gradient">
                  {outcome.stat}
                </p>
                <p className="mt-3 text-[0.9rem] font-medium text-white">{outcome.label}</p>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-faint">{outcome.body}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted">
            Every one of those starts the same way — one property, one set of standards, fifteen minutes on a
            call to see whether it fits your floor.
          </p>
          <ButtonLink href="/demo" size="lg">
            Book a 15-min demo
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
