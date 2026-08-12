import Link from "next/link";
import type { ReactNode } from "react";

import Aurora from "@/components/fx/Aurora";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";

/** Shared inner-page opener: breadcrumb, eyebrow, masked headline, lede. */
export default function PageHero({
  eyebrow,
  titleLines,
  lede,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  titleLines: ReactNode[];
  lede?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Aurora variant="hero" />
      <Container>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] uppercase">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden className="text-brand/50">
                    /
                  </span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-paper">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-7 max-w-4xl text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1] font-semibold tracking-[-0.04em] text-white">
          <MaskedLines lines={titleLines} stagger={80} immediate />
        </h1>

        {lede ? (
          <Reveal delay={380}>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">{lede}</p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={480}>{children}</Reveal> : null}
      </Container>
    </section>
  );
}
