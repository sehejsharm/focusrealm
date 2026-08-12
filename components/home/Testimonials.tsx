import Reveal from "@/components/fx/Reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { outcomes, testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="proof" className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        {/* Facts, not forecasts */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <div key={outcome.label} className="bg-ink/75">
              <Reveal delay={index * 60} className="flex h-full flex-col px-6 py-7">
                <p className="text-[clamp(1.8rem,3vw,2.4rem)] leading-none font-semibold tabular-nums text-gradient">
                  {outcome.stat}
                </p>
                <p className="mt-3 text-[0.88rem] font-medium text-white">{outcome.label}</p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-faint">{outcome.body}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center lg:gap-14">
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
            <p className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08] font-semibold text-white">
              Two clients, unedited.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal key={item.author} delay={index * 90}>
                <figure className="flex h-full flex-col border-l border-brand/45 pl-5">
                  <blockquote className="text-[0.95rem] leading-relaxed text-paper">{item.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-brand-cyan" />
                    <cite className="text-[0.84rem] font-medium text-white not-italic">{item.author}</cite>
                    <span className="text-[0.76rem] text-faint">{item.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100} className="mt-14">
          <ButtonLink href="/demo" size="lg">
            Book a 15-min demo
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
