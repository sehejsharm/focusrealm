"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useInView } from "@/components/fx/useInView";

type RevealProps = {
  children: ReactNode;
  /** Motion direction. `up` is the default. */
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
  style?: CSSProperties;
  id?: string;
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
  threshold = 0.15,
  style,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={variant}
      data-show={inView ? "true" : "false"}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline that reveals line by line from behind a mask. Pass lines as
 * separate strings — each becomes its own clipped row.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  stagger = 90,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });

  return (
    <span ref={ref} data-show={inView ? "true" : "false"} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={`mask-line ${lineClassName ?? ""}`}
          style={{ "--reveal-delay": `${delay + index * stagger}ms` } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
