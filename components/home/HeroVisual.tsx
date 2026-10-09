import { LogoMark } from "@/components/site/Logo";

/**
 * Hero motion graphic: the FR monogram as a hub, two product lines orbiting
 * it, and floating "live product" cards drifting around the system. Pure CSS
 * animation, decorative only, and frozen under prefers-reduced-motion.
 */
export default function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[520px] select-none">
      {/* Glow */}
      <div className="anim-blob absolute inset-[14%] bg-linear-to-br from-brand/25 via-[#8fb0ff]/25 to-gold/20 blur-3xl" />

      {/* Rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="190" stroke="#2a5bd7" strokeOpacity="0.14" fill="none" />
        <circle cx="200" cy="200" r="140" stroke="#2a5bd7" strokeOpacity="0.35" fill="none" className="anim-dash" />
        <circle cx="200" cy="200" r="90" stroke="#2a5bd7" strokeOpacity="0.18" fill="none" />
      </svg>

      {/* Outer orbit: Education */}
      <div className="anim-spin-slow absolute inset-[2.5%]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="anim-spin-rev">
            <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[0.78rem] font-semibold text-paper shadow-lg shadow-brand/10">
              <span className="size-2 rounded-full bg-brand" />
              Education
            </span>
          </div>
        </div>
        <span className="absolute bottom-[6%] left-[16%] size-2.5 rounded-full bg-gold" />
      </div>

      {/* Middle orbit: Mise */}
      <div className="anim-spin-rev absolute inset-[15%]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="anim-spin-slow">
            <span className="flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-[0.78rem] font-semibold text-white shadow-lg">
              <span className="size-2 rounded-full bg-[#8fb0ff]" />
              Mise · Hospitality
            </span>
          </div>
        </div>
        <span className="absolute top-[10%] right-[12%] size-2 rounded-full bg-brand" />
      </div>

      {/* Hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute size-28 rounded-[1.6rem] bg-brand/20 anim-ping sm:size-32" />
        <span className="relative rounded-[1.6rem] bg-white p-3 shadow-[0_24px_60px_-20px_rgba(30,42,90,0.45)]">
          <LogoMark className="size-20 sm:size-24" decorative />
        </span>
      </div>

      {/* Floating card: analytics */}
      <div className="anim-bob absolute top-[8%] -left-[2%] w-40 rounded-2xl border border-line bg-white/95 p-3.5 shadow-xl shadow-brand/10 backdrop-blur sm:w-44">
        <p className="text-[0.66rem] font-semibold tracking-[0.12em] text-faint uppercase">AI analytics</p>
        <div className="mt-2.5 flex h-12 items-end gap-1.5">
          {[38, 62, 45, 80, 56, 92].map((h, i) => (
            <span
              key={i}
              className="w-full origin-bottom rounded-t bg-brand/80"
              style={{ height: `${h}%`, animation: `bob ${3 + i * 0.4}s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>

      {/* Floating card: task done */}
      <div
        className="anim-bob absolute right-[-2%] bottom-[14%] w-44 rounded-2xl border border-line bg-white/95 p-3.5 shadow-xl shadow-brand/10 backdrop-blur sm:w-48"
        style={{ animationDelay: "-3s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M3 8.5l3 3 7-7" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.74rem] font-semibold text-paper">Room 214 · turndown</p>
            <p className="text-[0.66rem] text-faint">Done in 6:42 · photo ✓</p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-3">
          <span className="anim-bar block h-full rounded-full bg-linear-to-r from-brand to-[#8fb0ff]" />
        </div>
      </div>

      {/* Floating card: streak */}
      <div
        className="anim-bob absolute top-[46%] -right-[4%] hidden rounded-full border border-line bg-white px-3 py-1.5 text-[0.7rem] font-semibold text-paper shadow-lg sm:block"
        style={{ animationDelay: "-1.5s" }}
      >
        <span className="text-gold-deep">★</span> 12-day streak
      </div>
    </div>
  );
}
