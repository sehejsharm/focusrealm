import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { Container, SectionHeading } from "@/components/ui/Section";
import { buyers, clients } from "@/lib/content";

const stack = [
  { label: "Runs on", value: "Google Cloud · Firebase" },
  { label: "Devices", value: "Any modern browser, any phone" },
  { label: "Network", value: "Mobile data is enough" },
  { label: "PMS integration", value: "Not required, by design" },
];

export default function Buyers() {
  return (
    <section id="buyers" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Who this is for"
          title="Bought by the people who carry"
          accent="the consequence."
          body="Travel, hospitality and hotels is the priority market — faster cycles, higher tech adaptability, recurring revenue and a compliance calendar that never moves. Inside a property, three people feel the six pains first."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {buyers.map((buyer, index) => (
            <Reveal key={buyer.title} delay={index * 90}>
              <SpotlightCard className="panel flex h-full flex-col p-7">
                <h3 className="text-[1.15rem] font-semibold text-white">{buyer.title}</h3>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-[#ff9b9b]/80">
                      Their pain
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{buyer.pain}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.72rem] tracking-[0.16em] text-brand-cyan uppercase">
                      What changes
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-paper">{buyer.win}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Stack + references */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="panel h-full p-7">
              <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-ice uppercase">
                Technical footprint
              </p>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted">
                Deliberately light. The interface has to work on the phone a room attendant already owns, on the
                network the property already has.
              </p>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {stack.map((item) => (
                  <div key={item.label} className="bg-ink/70 px-5 py-4">
                    <dt className="font-mono text-[0.72rem] tracking-[0.14em] text-faint uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.88rem] text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel h-full p-7">
              <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-ice uppercase">
                Where we are working
              </p>
              <ul className="mt-5 space-y-3.5">
                {clients.map((client) => (
                  <li
                    key={client.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-3.5 last:border-b-0 last:pb-0"
                  >
                    <span className="flex flex-col">
                      <span className="text-[0.92rem] font-medium text-white">{client.name}</span>
                      {client.note ? (
                        <span className="mt-0.5 text-[0.76rem] text-faint">{client.note}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-right font-mono text-[0.72rem] tracking-[0.1em] text-brand-cyan uppercase">
                      {client.segment}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
