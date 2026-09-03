"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/components/fx/useInView";

const nodes = [
  {
    key: "standard",
    label: "Standard",
    note: "Authored once. Target time, fixed steps.",
    icon: "doc",
  },
  {
    key: "task",
    label: "Timed task",
    note: "On the phone, on shift, counting down.",
    icon: "timer",
  },
  {
    key: "evidence",
    label: "Evidence",
    note: "Photo gate. The step will not close without it.",
    icon: "camera",
  },
  {
    key: "record",
    label: "Service record",
    note: "Timestamped. Exportable. Audit answers itself.",
    icon: "ledger",
  },
] as const;

function Icon({ kind }: { kind: string }) {
  const common = { stroke: "currentColor", strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      {kind === "doc" ? (
        <>
          <path d="M6 3.5h8L18.5 8v12.5H6z" {...common} />
          <path d="M13.5 3.5V8.5H18.5" {...common} />
          <path d="M9 12h6M9 15.5h4" {...common} />
        </>
      ) : null}
      {kind === "timer" ? (
        <>
          <circle cx="12" cy="13.5" r="7" {...common} />
          <path d="M12 9.5v4l2.5 1.8M9.5 3.5h5" {...common} />
        </>
      ) : null}
      {kind === "camera" ? (
        <>
          <rect x="3.5" y="7" width="17" height="13" rx="2.5" {...common} />
          <circle cx="12" cy="13.5" r="3.4" {...common} />
          <path d="M9 7l1.4-2.5h3.2L15 7" {...common} />
        </>
      ) : null}
      {kind === "ledger" ? (
        <>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" {...common} />
          <path d="M3.5 9h17M8 4.5v15M11.5 12.5h6M11.5 15.5h4" {...common} />
        </>
      ) : null}
    </svg>
  );
}

/**
 * The mechanism as a flow, not as prose. Four nodes, a packet that travels
 * the wire, and one line of copy per node. Auto-advances until the reader
 * takes over.
 */
export default function MechanismFlow() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: false });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % nodes.length), 2600);
    return () => clearInterval(id);
  }, [inView, held]);

  return (
    <div ref={ref} onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
      <ol className="relative grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0">
        {/* The wire */}
        <li aria-hidden className="pointer-events-none absolute inset-x-0 top-7 hidden lg:block">
          <div className="relative mx-[12.5%] h-px bg-line-strong">
            <div
              className="absolute -top-px h-[3px] rounded-full bg-linear-to-r from-transparent via-brand-cyan to-transparent transition-all duration-[900ms] ease-out-expo"
              style={{ left: `${(active / (nodes.length - 1)) * 100 - 14}%`, width: "28%" }}
            />
          </div>
        </li>

        {nodes.map((node, index) => {
          const isActive = index === active;
          const reached = index <= active;
          return (
            <li key={node.key} className="relative">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={isActive}
                className="group flex w-full flex-col items-start gap-3 text-left lg:items-center lg:text-center"
              >
                <span
                  className="relative z-10 flex size-11 items-center justify-center rounded-2xl border transition-all duration-500 ease-out-expo sm:size-14"
                  style={{
                    borderColor: reached ? "color-mix(in oklab, #4ec4a1 55%, transparent)" : "var(--color-line)",
                    background: isActive ? "color-mix(in oklab, #2a947a 26%, #0b2126)" : "#0b2126",
                    color: reached ? "#a8ecd4" : "var(--color-faint)",
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    boxShadow: isActive ? "0 0 34px -8px rgba(78,196,161,0.55)" : "none",
                  }}
                >
                  <Icon kind={node.icon} />
                </span>

                <span className="flex flex-col gap-1.5 lg:items-center">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.72rem] tracking-[0.16em] text-faint">
                      0{index + 1}
                    </span>
                    <span
                      className="text-[0.98rem] font-semibold transition-colors duration-500"
                      style={{ color: isActive ? "#ffffff" : "var(--color-muted)" }}
                    >
                      {node.label}
                    </span>
                  </span>
                  <span
                    className="max-w-[24ch] text-[0.82rem] leading-snug transition-colors duration-500"
                    style={{ color: isActive ? "var(--color-muted)" : "var(--color-faint)" }}
                  >
                    {node.note}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
