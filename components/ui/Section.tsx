import type { ReactNode } from "react";

import { SignalDivider } from "@/components/fx/Kinetics";
import Reveal from "@/components/fx/Reveal";

/** Shared page rhythm: one max width, one gutter, everywhere. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "",
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${className}`}>
      {dot ? (
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-brand-cyan animate-pulse-ring" />
          <span className="relative size-1.5 rounded-full bg-brand-cyan" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] font-semibold text-white">
          {title}
          {accent ? <span className="text-gradient"> {accent}</span> : null}
        </h2>
      </Reveal>
      {body ? (
        <Reveal delay={160}>
          <p
            className={`mt-6 text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem] ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** A divider that fires a pulse across as the reader reaches it. */
export function Rule({ className = "" }: { className?: string }) {
  return <SignalDivider className={className} />;
}
