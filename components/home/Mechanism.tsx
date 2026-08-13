import Aurora from "@/components/fx/Aurora";
import { KineticHeading, Parallax } from "@/components/fx/Kinetics";
import Reveal from "@/components/fx/Reveal";
import EvidenceChart from "@/components/viz/EvidenceChart";
import FloorGrid from "@/components/viz/FloorGrid";
import MechanismFlow from "@/components/viz/MechanismFlow";
import ReadinessBars from "@/components/viz/ReadinessBars";
import TargetVsActual from "@/components/viz/TargetVsActual";
import { Container, Eyebrow } from "@/components/ui/Section";

/**
 * The mechanism, drawn. A flow diagram carries the argument; the property
 * grid, the readiness bars and the evidence curve show what it produces.
 * Deliberately asymmetric — the graphics run the width, not a centred column.
 */
export default function Mechanism() {
  return (
    <section id="mechanism" className="relative overflow-hidden py-24 sm:py-28">
      <Aurora variant="section" />

      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <KineticHeading
            text="One loop, four moves."
            variant="settle"
            accentFrom={2}
            className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white"
          />
        </div>

        <Reveal delay={120} className="mt-12">
          <MechanismFlow />
        </Reveal>

        {/* Dashboard grid: the property and its trend on the wide column,
            the two ranked reads on the narrow one. */}
        <div className="mt-16 grid items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
          <div className="grid gap-5">
            <Reveal className="panel p-6 sm:p-7">
              <FloorGrid />
            </Reveal>
            <Reveal delay={80} className="panel p-6 sm:p-7">
              <EvidenceChart />
            </Reveal>
          </div>

          <Parallax distance={-28} className="grid gap-5">
            <Reveal delay={90} className="panel p-6 sm:p-7">
              <ReadinessBars />
            </Reveal>
            <Reveal delay={150} className="panel p-6 sm:p-7">
              <TargetVsActual />
            </Reveal>
            <Reveal delay={200} className="panel p-6 sm:p-7">
              <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
                Runs on
              </p>
              <dl className="mt-4 space-y-2.5">
                {[
                  ["Devices", "Any browser, any phone"],
                  ["Network", "Mobile data"],
                  ["PMS integration", "Not required"],
                  ["Hardware", "None"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 last:border-b-0 last:pb-0">
                    <dt className="text-[0.8rem] text-faint">{k}</dt>
                    <dd className="text-[0.82rem] text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
