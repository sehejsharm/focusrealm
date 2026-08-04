import { FLAG } from "@/lib/ui";
import type { TaskFlag } from "@/lib/types";

export default function FlagChips({
  flags,
  size = "sm",
}: {
  flags: TaskFlag[];
  size?: "sm" | "md";
}) {
  if (flags.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {flags.map((flag) => (
        <li
          key={flag}
          className={`rounded-lg font-bold ${FLAG[flag].className} ${
            size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
          }`}
        >
          {FLAG[flag].label}
        </li>
      ))}
    </ul>
  );
}
