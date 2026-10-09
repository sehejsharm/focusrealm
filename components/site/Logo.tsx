/**
 * The FR monogram, redrawn from the supplied artwork: a thin serif F in deep
 * blue interlocked with a lighter-blue R, set in a white square tile. Drawn as SVG so it stays crisp from favicon to hero and
 * never depends on a webfont. See BRAND.md.
 */
export function LogoMark({
  className = "size-9",
  /** Set when a visible wordmark sits beside it — the mark must not add a
   *  second, differently-worded name to the link's accessible name. */
  decorative = false,
  tile = true,
}: {
  className?: string;
  decorative?: boolean;
  tile?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Focus Realm" })}
      fill="none"
    >
      {tile ? <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="9" fill="#ffffff" stroke="#e1e4ef" strokeWidth="1.5" /> : null}
      {/* Letterforms from the logo artwork: a high-contrast Didone F in deep
          blue, with a lighter-blue R overlapping its arm. */}
      <g style={{ fontFamily: "var(--font-logo), Didot, 'Bodoni 72', Georgia, serif" }} fontSize="33" fontWeight="500">
        <text x="7.2" y="35.5" fill="#123f8f">F</text>
        <text x="18.8" y="35.5" fill="#4d97d1">R</text>
      </g>
    </svg>
  );
}

/** Monogram plus the stacked "Focus / Realm" wordmark in bold black. */
export default function Logo({
  className = "",
  markClassName = "size-9",
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${markClassName} drop-shadow-[0_4px_10px_rgba(30,42,90,0.12)]`} decorative={showWordmark} />
      {showWordmark ? (
        <span className="flex flex-col text-[0.95rem] leading-[0.95] font-extrabold tracking-[-0.03em] text-paper">
          <span>Focus</span>
          <span>Realm</span>
        </span>
      ) : null}
    </span>
  );
}
