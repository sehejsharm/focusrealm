import Reveal from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { fiveSeconds } from "@/lib/content";

/**
 * One question, two answers.
 *
 * The gap between the two columns is the entire product argument, and it lands
 * faster than any description of the mechanism does — a reader who cannot
 * answer the question about their own property has already understood the
 * problem before reading a feature.
 */
export default function FiveSeconds() {
  return (
    <section id="five-seconds" className="relative overflow-hidden py-20 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The five-second question</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.08] font-semibold text-white text-balance">
              {fiveSeconds.question}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Today */}
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-2xl border border-line p-7">
              <p className="font-mono text-[0.72rem] tracking-[0.16em] text-faint uppercase">
                {fiveSeconds.today.label}
              </p>
              <ol className="mt-5 space-y-3">
                {fiveSeconds.today.chain.map((step, index) => (
                  <li key={step} className="flex gap-3 text-[0.92rem] leading-relaxed text-muted">
                    <span className="font-mono text-[0.72rem] text-faint tabular-nums">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-4 text-[0.88rem] text-faint">
                {fiveSeconds.today.verdict}
              </p>
            </div>
          </Reveal>

          {/* With Focus Realm */}
          <Reveal delay={160} className="h-full">
            <div className="panel h-full p-7">
              <p className="font-mono text-[0.72rem] tracking-[0.16em] text-brand-cyan uppercase">
                {fiveSeconds.withUs.label}
              </p>
              <dl className="mt-5 space-y-2.5 font-mono text-[0.8rem]">
                {fiveSeconds.withUs.record.map((line) => (
                  <div key={line.k} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <dt className="w-[124px] shrink-0 text-faint">{line.k}</dt>
                    <dd className="min-w-0 flex-1 text-paper">{line.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-line pt-4 text-[0.88rem] text-brand-cyan">
                {fiveSeconds.withUs.verdict}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
