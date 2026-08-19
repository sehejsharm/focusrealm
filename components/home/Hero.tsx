"use client";

import Aurora from "@/components/fx/Aurora";
import { Magnetic, Parallax, Tilt } from "@/components/fx/Kinetics";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import EventStream from "@/components/viz/EventStream";
import ShiftConsole from "@/components/viz/ShiftConsole";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <Aurora variant="hero" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div>
            <Reveal immediate>
              <Eyebrow>Service execution platform</Eyebrow>
            </Reveal>

            {/* The H1 says what this is; the tagline follows as a subhead.
                "The standard, inside the task" is the positioning line, but it
                is a tagline — someone arriving from a search for hotel SOP
                software does not yet know what "the standard" refers to. */}
            <h1 className="mt-6 text-[clamp(2.5rem,5.6vw,4.4rem)] leading-[1] font-semibold tracking-[-0.04em] text-white">
              <MaskedLines
                lines={[
                  <>Hotel SOPs that run</>,
                  <>
                    inside the <span className="text-gradient">shift.</span>
                  </>,
                ]}
                stagger={80}
                immediate
              />
            </h1>

            <Reveal delay={260} immediate>
              <p className="mt-5 text-[1.15rem] leading-snug font-medium text-brand-cyan">
                The standard, inside the task.
              </p>
            </Reveal>

            <Reveal delay={300} immediate>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-muted">
                Hotel SOP management that runs as timed tasks on staff phones.
                The work produces the evidence. The evidence is the audit.
              </p>
            </Reveal>

            <Reveal delay={400} immediate>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <ButtonLink href="/demo" size="lg">
                    Book a 15-min demo
                    <ArrowRight />
                  </ButtonLink>
                </Magnetic>
                <Magnetic strength={8}>
                  <ButtonLink href="/platform" variant="outline" size="lg">
                    See the platform
                  </ButtonLink>
                </Magnetic>
              </div>
            </Reveal>

            {/* The ledger, writing itself */}
            <Reveal delay={520} immediate className="mt-10 border-t border-line pt-5">
              <p className="mb-2 font-mono text-[0.72rem] tracking-[0.16em] text-faint uppercase">
                Service record · writing now
              </p>
              <EventStream />
            </Reveal>
          </div>

          <Parallax distance={-38}>
            <Reveal variant="scale" delay={180} immediate>
              <Tilt max={5}>
                <ShiftConsole />
              </Tilt>
            </Reveal>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
