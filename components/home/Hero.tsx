"use client";

import Aurora from "@/components/fx/Aurora";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import ShiftConsole from "@/components/viz/ShiftConsole";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <Aurora variant="hero" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>Service execution platform</Eyebrow>
            </Reveal>

            <h1 className="mt-6 text-[clamp(2.5rem,5.6vw,4.4rem)] leading-[1] font-semibold tracking-[-0.04em] text-white">
              <MaskedLines
                lines={[
                  <>The standard,</>,
                  <>
                    inside the <span className="text-gradient">task.</span>
                  </>,
                ]}
                stagger={80}
                immediate
              />
            </h1>

            <Reveal delay={300}>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
                Hotel SOPs run as timed tasks on staff phones. The work produces the evidence.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/demo" size="lg">
                  Book a 15-min demo
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/platform" variant="outline" size="lg">
                  See the platform
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={180}>
            <ShiftConsole />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
