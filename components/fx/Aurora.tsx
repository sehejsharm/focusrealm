/**
 * Section backdrop. The brand is flat, so this is a single soft wash at the
 * top of the hero and nothing else. Decorative only.
 */
export default function Aurora({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "section" | "quiet";
  className?: string;
}) {
  if (variant !== "hero") return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-linear-to-b from-white to-transparent ${className}`}
    />
  );
}
