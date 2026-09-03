"use client";

import type { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";

/**
 * Card whose border and interior track the pointer. The gradients live in
 * globals.css (.spotlight) — this only publishes --mx / --my.
 */
export default function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  function onMouseMove(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag onMouseMove={onMouseMove} className={`spotlight ${className}`} style={style}>
      {children}
    </Tag>
  );
}
