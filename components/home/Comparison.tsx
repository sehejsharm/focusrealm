import Reveal from "@/components/fx/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { comparison, objections } from "@/lib/content";

/**
 * The buying decision, laid out. Two of the three columns are what a property
 * is already doing, so the table reads as a diagnosis rather than a boast.
 */
export default function Comparison() {
  return (
    <section id="compare" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="The honest comparison"
          title="Three ways to run a standard."
          accent="Only one of them leaves a record."
          body="Most properties are running the first column and paying for the second. The difference is not features — it is whether the work produces proof while it happens."
        />

        {/* Desktop table */}
        <Reveal delay={120} className="mt-14 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparison of paper and chat-based processes, a generic learning management system, and Focus
                Realm across six operational criteria
              </caption>
              <thead>
                <tr className="bg-white/[0.03]">
                  <th scope="col" className="px-6 py-5 font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                    &nbsp;
                  </th>
                  {comparison.columns.map((column, index) => {
                    const ours = index === comparison.columns.length - 1;
                    return (
                      <th
                        key={column}
                        scope="col"
                        className={`px-6 py-5 text-[0.95rem] font-semibold ${
                          ours ? "bg-brand/12 text-white" : "text-muted"
                        }`}
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
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-[0.88rem] font-medium text-paper"
                    >
                      {row.criterion}
                    </th>
                    {row.values.map((value, index) => {
                      const ours = index === row.values.length - 1;
                      return (
                        <td
                          key={index}
                          className={`px-6 py-5 align-top text-[0.88rem] leading-relaxed ${
                            ours ? "bg-brand/8 font-medium text-white" : "text-faint"
                          }`}
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

        {/* Mobile: one card per criterion */}
        <div className="mt-12 space-y-4 lg:hidden">
          {comparison.rows.map((row, rowIndex) => (
            <Reveal key={row.criterion} delay={rowIndex * 60}>
              <div className="panel overflow-hidden">
                <p className="border-b border-line px-5 py-3.5 text-[0.9rem] font-medium text-white">
                  {row.criterion}
                </p>
                <dl className="divide-y divide-line">
                  {row.values.map((value, index) => {
                    const ours = index === row.values.length - 1;
                    return (
                      <div key={index} className={`px-5 py-3.5 ${ours ? "bg-brand/10" : ""}`}>
                        <dt className="font-mono text-[0.55rem] tracking-[0.12em] uppercase">
                          <span className={ours ? "text-brand-cyan" : "text-faint"}>
                            {comparison.columns[index]}
                          </span>
                        </dt>
                        <dd className={`mt-1.5 text-[0.86rem] leading-relaxed ${ours ? "text-white" : "text-faint"}`}>
                          {value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Objection handling */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {objections.map((objection, index) => (
            <Reveal key={objection.q} delay={index * 80}>
              <div className="panel h-full p-7">
                <p className="text-[1rem] leading-snug font-medium text-white">{objection.q}</p>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted">{objection.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
