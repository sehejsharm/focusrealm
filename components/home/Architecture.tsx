/**
 * How the company is built: two products built to one set of foundations. The
 * connectors animate as data flowing between layers. Content is real text
 * (not aria-hidden) so the structure is readable without the visuals.
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

export default function Architecture() {
  return (
    <div className="relative">
      {/* Products */}
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="group rounded-xl border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-[#7fa6ff]/60 sm:p-6"
          >
            <p className="text-[0.78rem] font-medium text-white/60">Product</p>
            <p className="mt-1 text-[1.25rem] font-semibold text-white">{p.name}</p>
            <p className="mt-1 text-[0.9rem] text-white/70">{p.for}</p>
          </a>
        ))}
      </div>

      <Connectors />

      {/* Shared platform */}
      <div className="rounded-xl border border-[#7fa6ff]/40 bg-[#2a5bd7]/12 p-5 sm:p-6">
        <p className="text-[0.78rem] font-medium text-[#a9c1ff]">Built into both products</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shared.map(([t, b]) => (
            <li key={t} className="rounded-lg border border-white/10 bg-[#0b1430]/70 p-4">
              <p className="text-[0.95rem] font-semibold text-white">{t}</p>
              <p className="mt-1 text-[0.82rem] leading-snug text-white/65">{b}</p>
            </li>
          ))}
        </ul>
      </div>

      <Connectors />

      {/* Foundation */}
      <div className="rounded-xl border border-white/12 p-5 sm:p-6">
        <p className="text-[0.78rem] font-medium text-white/60">Infrastructure and delivery</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {foundation.map((f) => (
            <li key={f} className="rounded-md border border-white/12 px-3 py-1.5 text-[0.85rem] text-white/80">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Connectors() {
  return (
    <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="block h-10 w-full">
      {[50, 150, 250, 350].map((x) => (
        <line key={x} x1={x} x2={x} y1="0" y2="40" stroke="#7fa6ff" strokeOpacity="0.55" strokeWidth="1.5" className="anim-flow" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
