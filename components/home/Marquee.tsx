const items = [
  "AI analytics",
  "Timed tasks",
  "Smart attendance",
  "Photo evidence",
  "Gamified learning",
  "Audit-ready records",
  "Parent portal",
  "Shift handover",
  "Skill tracker",
  "Interactive boards",
];

/** An endless strip of capabilities across both product lines. Decorative. */
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="edge-fade-x relative overflow-hidden border-y border-line bg-white py-4">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[0.95rem] font-semibold tracking-[-0.01em] text-muted whitespace-nowrap">
            {item}
            <span className="size-1.5 rounded-full bg-brand/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
