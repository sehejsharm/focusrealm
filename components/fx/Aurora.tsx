/**
 * Ambient background: two drifting brand blooms, a technical grid and a
 * grain pass. Purely decorative — never in the accessibility tree.
 */
export default function Aurora({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "section" | "quiet";
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {variant === "hero" ? (
        <>
          <div className="absolute inset-x-0 top-0 h-[820px] grid-backdrop opacity-70" />
          <div className="animate-drift absolute -top-40 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-brand/22 blur-[130px]" />
          <div className="animate-drift-slow absolute top-24 -right-40 h-[520px] w-[620px] rounded-full bg-brand-cyan/12 blur-[140px]" />
          <div className="animate-drift-slow absolute -bottom-24 -left-32 h-[460px] w-[560px] rounded-full bg-brand-deep/22 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,color-mix(in_oklab,var(--color-brand)_16%,transparent),transparent)]" />
        </>
      ) : null}

      {variant === "section" ? (
        <>
          <div className="animate-drift absolute top-1/4 -left-40 h-[420px] w-[560px] rounded-full bg-brand/12 blur-[150px]" />
          <div className="animate-drift-slow absolute bottom-0 -right-32 h-[380px] w-[480px] rounded-full bg-brand-cyan/8 blur-[150px]" />
        </>
      ) : null}

      {variant === "quiet" ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_9%,transparent),transparent)]" />
      ) : null}

      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
    </div>
  );
}
