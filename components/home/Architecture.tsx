/**
 * How the company is built: two products, the capabilities built into both,
 * and the infrastructure underneath. Connectors are drawn per column so they
 * always land on the box they point to, with a pulse travelling down each.
 */
const products = [
  { name: "Focus Realm Education", for: "Schools, colleges, universities", href: "https://focus-realm.com" },
  { name: "Mise", for: "Hotels and hotel groups", href: "https://misehotel.com" },
];

const shared = [
  ["Identity & roles", "Role-based access for every user type"],
  ["Activity record", "A timestamped trail of the work done"],
  ["Analytics", "Institution- and property-level reporting"],
  ["Notifications", "The right person, at the right moment"],
];

const foundation = ["Google Cloud", "Firebase", "Web & mobile", "Classroom boards"];

function Link({ delay = 0 }: { delay?: number }) {
  return (
    <span aria-hidden className="relative mx-auto block h-10 w-px bg-[#7fa6ff]/30">
      <span
        className="anim-pulse-down absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#9ec5ff] shadow-[0_0_10px_2px_rgba(127,166,255,0.7)]"
        style={{ animationDelay: `${delay}ms` }}
      />
    </span>
  );
}

export default function Architecture() {
  return (
    <div>
      {/* Products */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {products.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="group rounded-xl border border-white/15 bg-white/[0.05] p-4 transition-colors hover:border-[#7fa6ff]/70 hover:bg-white/[0.08] sm:p-6"
          >
            <p className="text-[0.75rem] font-medium tracking-wide text-[#a9c1ff]">Product</p>
            <p className="mt-1.5 text-[1.05rem] leading-tight font-semibold text-white sm:text-[1.25rem]">{p.name}</p>
            <p className="mt-1.5 text-[0.85rem] text-white/70 sm:text-[0.92rem]">{p.for}</p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2">
        <Link />
        <Link delay={700} />
      </div>

      {/* Built into both */}
      <div className="rounded-xl border border-[#7fa6ff]/45 bg-[#2a5bd7]/15 p-4 sm:p-6">
        <p className="text-[0.75rem] font-medium tracking-wide text-[#a9c1ff]">Built into both products</p>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {shared.map(([t, b]) => (
            <li key={t} className="rounded-lg border border-white/12 bg-[#0b1430]/80 p-4">
              <p className="text-[0.95rem] font-semibold text-white">{t}</p>
              <p className="mt-1 text-[0.85rem] leading-snug text-white/70">{b}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-4">
        {foundation.map((f, i) => (
          <Link key={f} delay={300 + i * 350} />
        ))}
      </div>

      {/* Infrastructure */}
      <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4 sm:p-6">
        <p className="text-[0.75rem] font-medium tracking-wide text-[#a9c1ff]">Infrastructure and delivery</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {foundation.map((f) => (
            <li
              key={f}
              className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-center text-[0.85rem] text-white/85"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
