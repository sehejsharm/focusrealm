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
    <div aria-hidden className="edge-fade-x relative overflow-hidden border-y border-line bg-white py-5">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[clamp(1.1rem,2.2vw,1.6rem)] font-bold tracking-[-0.03em] text-paper whitespace-nowrap">
            {item}
            <span className={`size-2.5 rotate-45 ${i % 3 === 2 ? "bg-gold" : "bg-brand"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
