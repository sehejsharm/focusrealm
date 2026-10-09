/**
 * The FR monogram: a deep-blue F interlocked with a lighter-blue R, set in a
 * white square tile. Drawn as SVG so it stays crisp from favicon to hero and
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
        <linearGradient id="fr-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5aa8dc" />
          <stop offset="100%" stopColor="#8ccbe9" />
        </linearGradient>
      </defs>
      {tile ? (
        <rect x="1" y="1" width="46" height="46" rx="10" fill="#ffffff" stroke="#dfe3f0" strokeWidth="1.5" />
      ) : null}

      {/* R — lighter blue, sitting behind and to the right of the F */}
      <path
        fill="url(#fr-r)"
        d="M21 11h10.2c5.3 0 8.6 2.8 8.6 7.1 0 3.4-2 5.7-5.2 6.6l6.3 10.6c.4.7.9 1.1 1.6 1.2V38h-6.1l-7-12.4h-2.9v9.6c0 .9.5 1.4 1.4 1.5V38h-8.4v-1.3c.9-.1 1.5-.6 1.5-1.5V13.8c0-.9-.6-1.4-1.5-1.5V11zm5.5 2.4v9.8h3.6c3.1 0 4.6-1.7 4.6-4.9s-1.5-4.9-4.6-4.9h-3.6z"
      />
      {/* F — deep navy, in front */}
      <path
        fill="#0b3a91"
        d="M7.5 11h18.6v6.6h-1.6c-.4-2.6-1.6-4.1-4.6-4.1h-4.4v9.2h3.1c1.8 0 2.6-.9 2.8-2.6h1.5v7.8h-1.5c-.2-1.8-1-2.7-2.8-2.7h-3.1v9.9c0 .9.6 1.4 1.7 1.6V38H7.5v-1.3c.9-.2 1.5-.7 1.5-1.6V13.8c0-.9-.6-1.4-1.5-1.5V11z"
      />
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
