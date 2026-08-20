/**
 * One mark per pain.
 *
 * Each glyph draws the shape of the problem rather than decorating it: work
 * funnelling into a single person, a standard that never reaches the floor,
 * two performances where only one is measured. Stroke-only, currentColor, so
 * they inherit the surrounding text colour and stay legible at 28px.
 */
export default function PainGlyph({ id, className = "size-7" }: { id: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const glyphs: Record<string, React.ReactNode> = {
    // Many lines forced through one point.
    "supervisor-bottleneck": (
      <>
        <path d="M3 4h18M5 8h14M8 12h8" {...common} />
        <path d="M12 12v4" {...common} />
        <circle cx="12" cy="18.5" r="2.5" {...common} />
      </>
    ),
    // A document that never reaches the floor: dashed, floating above the line.
    "ghost-sop": (
      <>
        <path d="M7 3h7l4 4v8H7z" {...common} strokeDasharray="2.5 2.5" />
        <path d="M14 3v4h4" {...common} strokeDasharray="2.5 2.5" />
        <path d="M3 20h18" {...common} />
      </>
    ),
    // Two performances, one of them unmeasured.
    "invisible-performance-gap": (
      <>
        <path d="M4 20V10" {...common} />
        <path d="M10 20V6" {...common} />
        <path d="M16 20v-8" {...common} strokeDasharray="2.5 2.5" />
        <path d="M22 20V4" {...common} strokeDasharray="2.5 2.5" />
      </>
    ),
    // Level falling, and what leaks out of it.
    "attrition-bleed": (
      <>
        <path d="M5 4h14v6a7 7 0 0 1-7 7 7 7 0 0 1-7-7z" {...common} />
        <path d="M12 17v4" {...common} />
        <path d="M9 21h6" {...common} strokeDasharray="2 2" />
      </>
    ),
    // A rating pressed against a hard limit.
    "star-rating-ceiling": (
      <>
        <path d="M3 4h18" {...common} />
        <path d="M12 8l2.2 4.5 5 .7-3.6 3.5.9 4.9-4.5-2.4-4.5 2.4.9-4.9L4.8 13.2l5-.7z" {...common} />
      </>
    ),
    // Evidence demanded on a date you do not choose.
    "audit-ambush": (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" {...common} />
        <path d="M3.5 10h17M8 3v4M16 3v4" {...common} />
        <path d="M12 13v3" {...common} />
        <circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {glyphs[id] ?? null}
    </svg>
  );
}
