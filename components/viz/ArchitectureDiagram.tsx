"use client";

import { useState } from "react";

const layers = [
  { key: "staff", label: "Staff", device: "Mobile · 340px", writes: "Task state · photos", y: 44 },
  { key: "manager", label: "Manager", device: "Desktop", writes: "Assignment · sign-off", y: 116 },
  { key: "author", label: "Author", device: "Desktop", writes: "Standards · gates", y: 188 },
] as const;

/**
 * Three interfaces, one record. Hovering a layer lights its path into the
 * spine, so the shared-substrate point lands without a paragraph explaining it.
 */
export default function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure>
      {/* Capped at the viewBox width: the SVG's font sizes are in user units,
          so letting it stretch to a 1240px container doubles every label. */}
      <svg
        viewBox="0 0 640 244"
        className="w-full max-w-[640px]"
        role="img"
        aria-label="Three role interfaces — staff on mobile, manager and author on desktop — all writing into one shared service record."
      >
        <defs>
          <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec4a1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2a947a" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Wires */}
        {layers.map((layer) => {
          const lit = active === layer.key || active === null;
          return (
            <path
              key={`w-${layer.key}`}
              d={`M232 ${layer.y + 22} H 340 Q 372 ${layer.y + 22} 372 122 H 430`}
              fill="none"
              stroke={active === layer.key ? "#a8ecd4" : "rgba(148,212,193,0.28)"}
              strokeWidth={active === layer.key ? 2 : 1.2}
              strokeDasharray="4 5"
              style={{ opacity: lit ? 1 : 0.25, transition: "all 400ms ease" }}
            >
              {active === layer.key ? (
                <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.7s" repeatCount="indefinite" />
              ) : null}
            </path>
          );
        })}

        {/* Interfaces */}
        {layers.map((layer) => {
          const on = active === layer.key;
          return (
            <g
              key={layer.key}
              onPointerEnter={() => setActive(layer.key)}
              onPointerLeave={() => setActive(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x="16"
                y={layer.y}
                width="216"
                height="44"
                rx="10"
                fill={on ? "rgba(42,148,122,0.22)" : "rgba(255,255,255,0.03)"}
                stroke={on ? "rgba(78,196,161,0.7)" : "rgba(148,212,193,0.18)"}
                strokeWidth="1"
                style={{ transition: "all 350ms ease" }}
              />
              <text x="34" y={layer.y + 20} fontSize="13" fontWeight="600" fill={on ? "#ffffff" : "#a8c4c0"}>
                {layer.label}
              </text>
              <text x="34" y={layer.y + 34} fontSize="9.5" fill="#9ab5b1" fontFamily="ui-monospace, monospace">
                {layer.device}
              </text>
              <text
                x="216"
                y={layer.y + 27}
                fontSize="9.5"
                textAnchor="end"
                fill={on ? "#a8ecd4" : "#9ab5b1"}
                fontFamily="ui-monospace, monospace"
                style={{ transition: "fill 350ms ease" }}
              >
                {layer.writes}
              </text>
            </g>
          );
        })}

        {/* The spine */}
        <rect x="430" y="52" width="194" height="140" rx="12" fill="rgba(11,33,38,0.9)" stroke="url(#spine)" strokeWidth="1.4" />
        <text x="452" y="82" fontSize="9.5" fill="#94d4c1" fontFamily="ui-monospace, monospace" letterSpacing="1.6">
          ONE RECORD
        </text>
        <text x="452" y="108" fontSize="16" fontWeight="600" fill="#ffffff">
          Service record
        </text>
        {["Per step", "Per person", "Per property"].map((line, i) => (
          <g key={line}>
            <rect x="452" y={124 + i * 20} width="6" height="6" rx="1.5" fill="#4ec4a1" opacity={0.4 + i * 0.25} />
            <text x="468" y={130 + i * 20} fontSize="11" fill="#a8c4c0">
              {line}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
