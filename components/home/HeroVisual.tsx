/**
 * Hero product composition: an Education class dashboard behind a Mise shift
 * list on a phone. Flat UI, brand colours only. Motion is limited to bars
 * growing on load and tasks completing in sequence. Illustrative, decorative
 * and frozen under prefers-reduced-motion.
 */
const bars = [52, 68, 61, 79, 72, 88, 84];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const tasks = [
  { title: "Lobby opening check", meta: "Front office · 07:00" },
  { title: "Room 214 turndown", meta: "Housekeeping · photo" },
  { title: "Breakfast buffet reset", meta: "F&B · 09:30" },
  { title: "Pool chemical log", meta: "Engineering · 10:00" },
];

export default function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full sm:aspect-[10/9.4] max-w-[560px] select-none">
      {/* Education dashboard */}
      <div className="relative w-full sm:absolute sm:top-0 sm:right-0 sm:w-[84%] rounded-2xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(30,42,90,0.35)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#e1e4ef]" />
            <span className="size-2.5 rounded-full bg-[#e1e4ef]" />
            <span className="size-2.5 rounded-full bg-[#e1e4ef]" />
          </div>
          <span className="text-[11px] font-semibold text-faint">Focus Realm Education</span>
        </div>

        <div className="p-5">
          <p className="text-[11px] font-medium text-faint">Class 10-B · Physics</p>
          <p className="mt-0.5 text-[15px] font-semibold text-paper">This week</p>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              ["Attendance", "94%"],
              ["Submitted", "31/34"],
              ["Avg. score", "78"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-void px-3 py-2.5">
                <p className="text-[10.5px] text-faint">{label}</p>
                <p className="mt-0.5 text-[16px] font-semibold text-paper">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:ml-auto sm:w-[54%]">
            <p className="text-[10.5px] font-medium text-faint">Engagement</p>
            <div className="mt-2 flex h-24 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span
                    className="anim-grow w-full rounded-md bg-brand"
                    style={{ height: `${h}%`, opacity: i === bars.length - 2 ? 1 : 0.28 + i * 0.07, animationDelay: `${300 + i * 70}ms` }}
                  />
                  <span className="text-[9.5px] text-faint">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mise phone */}
      <div className="absolute bottom-0 left-0 hidden w-[44%] sm:block rounded-[1.6rem] border border-line bg-white p-2 shadow-[0_30px_60px_-24px_rgba(30,42,90,0.45)]">
        <div className="rounded-[1.2rem] bg-void p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-paper">Mise</p>
            <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-semibold text-brand">Morning shift</span>
          </div>
          <ul className="mt-3 space-y-2">
            {tasks.map((task, i) => (
              <li key={task.title} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2">
                <span
                  className="anim-tick relative flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#c9cfe0]"
                  style={{ animationDelay: `${i * 1.4}s` }}
                >
                  <svg viewBox="0 0 16 16" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M3.5 8.5l3 3 6-6.5" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-paper">{task.title}</span>
                  <span className="block truncate text-[9.5px] text-faint">{task.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
