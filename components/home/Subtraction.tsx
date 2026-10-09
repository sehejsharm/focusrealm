"use client";

import { useInView } from "@/components/fx/useInView";

/**
 * Strategic minimalism, shown rather than told: a wall of features most
 * software ships with, and the few that survive. Runs once on scroll.
 */
const features = [
  ["Attendance", true],
  ["Custom themes", false],
  ["Chatbot widget", false],
  ["Assignments", true],
  ["Social feed", false],
  ["7 report builders", false],
  ["Badges for everything", false],
  ["Timed tasks", true],
  ["Plugin store", false],
  ["Photo evidence", true],
  ["Forum", false],
  ["Gantt charts", false],
  ["Confetti on every click", false],
  ["AI insights", true],
  ["Wiki", false],
  ["14 dashboards", false],
  ["Emoji reactions", false],
  ["Grading", true],
] as const;

export default function Subtraction() {
  const { ref, inView } = useInView<HTMLUListElement>({ rootMargin: "-20% 0px -20% 0px" });
  let cut = 0;

  return (
    <ul ref={ref} aria-label="Features we keep" className="flex flex-wrap gap-2.5 sm:gap-3">
      {features.map(([label, keep]) => {
        const delay = keep ? 1500 : 300 + cut++ * 90;
        return (
          <li
            key={label}
            {...(keep ? {} : { "aria-hidden": true })}
            className={`rounded-full border px-4 py-2 text-[0.9rem] font-medium transition-all duration-700 ease-out-expo sm:px-5 sm:py-2.5 sm:text-[1rem] ${
              inView
                ? keep
                  ? "border-brand bg-brand text-white shadow-[0_12px_30px_-12px_rgba(42,91,215,0.7)]"
                  : "scale-95 border-line text-faint line-through opacity-30"
                : "border-line-strong bg-white text-paper"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
}
