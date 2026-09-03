import CountUp from "@/components/fx/CountUp";
import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { Container, Eyebrow } from "@/components/ui/Section";
import { personas, property } from "@/lib/content";

const figures = [
  { value: property.staff, label: "Staff on the platform" },
  { value: property.floors, label: "Guest floors" },
  { value: property.routes, label: "Live product routes" },
  { value: 5, label: "Fixed personas" },
];

/**
 * Every demo, deck and pitch runs against the same fictional property, so the
 * numbers a prospect sees on Tuesday are the numbers they see on Friday.
 */
export default function DemoProperty() {
  return (
    <section id="demo-environment" className="relative overflow-hidden py-14 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Demo environment</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.04] font-semibold text-white">
                One property.
                <span className="text-gradient"> Every demo, the same floor.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-muted">
                {property.name} is a full-service property in {property.location} with {property.staff} staff
                across {property.floors} guest floors. It is fictional and it is consistent — the same rooms,
                the same shift, the same five people, every single time we show the platform.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 max-w-xl text-[0.9rem] leading-relaxed text-faint">
                That consistency is deliberate. You are comparing the platform between meetings, not
                re-learning a new dataset.
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={140}>
            <SpotlightCard className="panel overflow-hidden">
              {/* Property header */}
              <div className="relative border-b border-line px-7 py-7">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_80%_0%,color-mix(in_oklab,var(--color-brand)_18%,transparent),transparent)]"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-ice uppercase">
                      {property.location}
                    </p>
                    <h3 className="mt-2.5 text-[1.6rem] leading-tight font-semibold text-white">
                      {property.name}
                    </h3>
                  </div>
                  <span className="flex items-center gap-2 rounded-full border border-brand-bright/35 bg-brand/15 px-3 py-1.5">
                    <span className="relative flex size-1.5">
                      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-cyan" />
                      <span className="relative size-1.5 rounded-full bg-brand-cyan" />
                    </span>
                    <span className="font-mono text-[0.72rem] tracking-[0.12em] text-white uppercase">Live</span>
                  </span>
                </div>
              </div>

              {/* Figures */}
              <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {figures.map((figure) => (
                  <div key={figure.label} className="bg-ink/70 px-5 py-6">
                    <p className="text-[1.6rem] leading-none font-semibold tracking-[-0.03em] text-white">
                      <CountUp value={figure.value} />
                    </p>
                    <p className="mt-2.5 text-[0.72rem] leading-snug text-faint">{figure.label}</p>
                  </div>
                ))}
              </div>

              {/* Personas */}
              <div className="px-7 py-7">
                <p className="font-mono text-[0.74rem] tracking-[0.16em] text-faint uppercase">
                  The five people in every demo
                </p>
                <ul className="mt-4 space-y-2.5">
                  {personas.map((persona) => (
                    <li
                      key={persona.name}
                      className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/18 font-mono text-[0.76rem] text-brand-ice">
                        {persona.initials}
                      </span>
                      <span className="text-[0.85rem] font-medium text-white">{persona.name}</span>
                      <span className="text-[0.78rem] text-faint">{persona.role}</span>
                      <span className="ml-auto rounded-full border border-line px-2 py-0.5 font-mono text-[0.72rem] tracking-[0.1em] text-muted uppercase">
                        {persona.role_interface}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
