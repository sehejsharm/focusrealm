import Reveal from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { comparison } from "@/lib/content";

/** Three ways to run a standard. The table is the argument; no prose around it. */
export default function Comparison() {
  return (
    <section id="compare" className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Where it sits</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white">
              Only one of the three leaves a record.
            </h2>
          </Reveal>
        </div>

        {/* Desktop */}
        <Reveal delay={100} className="mt-12 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Paper and chat, a generic learning management system, and Focus Realm compared across six
                operational criteria
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[220px] px-6 py-4" />
                  {comparison.columns.map((column, index) => {
                    const ours = index === comparison.columns.length - 1;
                    return (
                      <th
                        key={column}
                        scope="col"
                        className={`px-6 py-4 text-[0.9rem] font-semibold ${ours ? "bg-brand/12 text-white" : "text-faint"}`}
                      >
                        {ours ? (
                          <span className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-brand-cyan" />
                            {column}
                          </span>
                        ) : (
                          column
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.criterion} className="border-t border-line">
                    <th scope="row" className="px-6 py-4 text-[0.84rem] font-medium text-muted">
                      {row.criterion}
                    </th>
                    {row.values.map((value, index) => {
                      const ours = index === row.values.length - 1;
                      return (
                        <td
                          key={index}
                          className={`px-6 py-4 text-[0.88rem] ${ours ? "bg-brand/8 font-medium text-white" : "text-faint"}`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile */}
        <div className="mt-10 space-y-3 lg:hidden">
          {comparison.rows.map((row, rowIndex) => (
            <Reveal key={row.criterion} delay={rowIndex * 50}>
              <div className="overflow-hidden rounded-xl border border-line">
                <p className="border-b border-line px-4 py-3 text-[0.86rem] font-medium text-white">
                  {row.criterion}
                </p>
                <dl className="divide-y divide-line">
                  {row.values.map((value, index) => {
                    const ours = index === row.values.length - 1;
                    return (
                      <div key={index} className={`flex gap-3 px-4 py-2.5 ${ours ? "bg-brand/10" : ""}`}>
                        <dt className="w-[38%] shrink-0 font-mono text-[0.55rem] tracking-[0.1em] uppercase">
                          <span className={ours ? "text-brand-cyan" : "text-faint"}>
                            {comparison.columns[index]}
                          </span>
                        </dt>
                        <dd className={`text-[0.82rem] ${ours ? "text-white" : "text-faint"}`}>{value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
