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
      <defs>
        <linearGradient id="fr-f" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="37">
          <stop offset="0%" stopColor="#0b3a91" />
          <stop offset="100%" stopColor="#2a6fd0" />
        </linearGradient>
        <linearGradient id="fr-r" gradientUnits="userSpaceOnUse" x1="20" y1="16" x2="37" y2="37">
          <stop offset="0%" stopColor="#3f8fd6" />
          <stop offset="100%" stopColor="#8ccbe9" />
        </linearGradient>
      </defs>
      {tile ? (
        <rect x="1" y="1" width="46" height="46" rx="10" fill="#ffffff" stroke="#dfe3f0" strokeWidth="1.5" />
      ) : null}

      {/* R: light blue, its stem shared with the F's right side */}
      <g stroke="url(#fr-r)" strokeLinecap="butt" fill="none">
        <path d="M22.5 17 V 36" strokeWidth="2.6" />
        <path d="M21 17 H 28.5 C 32.6 17 34.4 19.2 34.4 22.2 C 34.4 25.2 32.6 27.4 28.5 27.4 H 22.5" strokeWidth="2" />
        <path d="M28 27.4 L 35 36" strokeWidth="2.2" />
        <path d="M20.5 36 H 25" strokeWidth="1.4" />
        <path d="M33 36 H 37" strokeWidth="1.4" />
      </g>
      {/* F: deep navy, thin serif cut */}
      <g stroke="url(#fr-f)" strokeLinecap="butt" fill="none">
        <path d="M15 11 V 36" strokeWidth="2.8" />
        <path d="M12.5 11 H 27.5" strokeWidth="2" />
        <path d="M27.5 11 V 14" strokeWidth="1.4" />
        <path d="M15 22.5 H 21" strokeWidth="1.8" />
        <path d="M12.5 36 H 18" strokeWidth="1.4" />
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
