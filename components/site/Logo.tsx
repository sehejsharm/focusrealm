/**
 * The FR mark, drawn as strokes so it stays crisp at 20px and 200px and
 * never depends on a webfont having loaded.
 */
export function LogoMark({
  className = "size-9",
  /** Set when a visible wordmark sits beside it — the mark must not add a
   *  second, differently-worded name to the link's accessible name. */
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Focus Realm" })}
      fill="none"
    >
      <defs>
        {/* Gold from the product's logo tile; plate from its sidebar teal. */}
        <linearGradient id="fr-mark-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7cd7c" />
          <stop offset="55%" stopColor="#dbbc5f" />
          <stop offset="100%" stopColor="#c9a94a" />
        </linearGradient>
        <linearGradient id="fr-mark-plate" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#1d4044" />
          <stop offset="100%" stopColor="#0b2126" />
        </linearGradient>
      </defs>

      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="11"
        fill="url(#fr-mark-plate)"
        stroke="url(#fr-mark-stroke)"
        strokeWidth="2.5"
      />

      {/* F */}
      <g stroke="#ffffff" strokeWidth="3.6" strokeLinecap="butt">
        <path d="M12 12.5 V 35.5" />
        <path d="M10.2 14.3 H 21.5" />
        <path d="M10.2 23.4 H 19.4" />
      </g>

      {/* R */}
      <g stroke="url(#fr-mark-stroke)" strokeWidth="3.6" strokeLinecap="butt">
        <path d="M27 12.5 V 35.5" />
        <path d="M25.2 14.3 H 31.4 A 4.6 4.6 0 0 1 31.4 23.5 H 25.2" />
        <path d="M31.2 23.8 L 36.6 35.6" />
      </g>
    </svg>
  );
}

export default function Logo({
  className = "",
  markClassName = "size-9",
  showWordmark = true,
  showTagline = false,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={markClassName} decorative={showWordmark} />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.98rem] font-semibold tracking-[-0.02em] text-white">
            Focus Realm <span className="text-brand-ice">Hospitality</span>
          </span>
          {showTagline ? (
            <span className="mt-1 font-mono text-[0.76rem] tracking-[0.16em] text-faint uppercase">
              Every shift, five-star
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
