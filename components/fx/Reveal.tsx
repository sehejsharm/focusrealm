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
  /**
   * For content in the initial viewport. Renders opaque from the first paint
   * and animates transform only, instead of waiting for the observer — which
   * cannot fire until hydration and so delays Largest Contentful Paint.
   */
  immediate?: boolean;
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
  immediate = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={variant}
      data-immediate={immediate ? "true" : undefined}
      data-show={immediate || inView ? "true" : "false"}
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
  /**
   * Hero headlines are above the fold, so they animate from mount rather than
   * waiting on an observer — they can never be caught clipped mid-reveal.
   */
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0 });

  return (
    <span
      ref={ref}
      data-show={immediate || inView ? "true" : "false"}
      data-immediate={immediate ? "true" : undefined}
      className={className}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className={`mask-line ${lineClassName ?? ""}`}
          style={{ "--reveal-delay": `${delay + index * stagger}ms` } as CSSProperties}
        >
          {/* The trailing space collapses visually (the span is a block) but
              keeps the heading's text content readable: without it the lines
              concatenate, and an H1 that reads "runinside the shift" is what
              a crawler and a screen reader both receive. */}
          <span>
            {line}
            {index < lines.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
