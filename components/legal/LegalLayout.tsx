import Link from "next/link";
import type { ReactNode } from "react";

import Reveal from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { Container, Rule } from "@/components/ui/Section";
import { legal, legalNav } from "@/lib/site";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

/**
 * Shared shell for the policy pages: a hero, a sticky contents rail, and
 * numbered sections. Deliberately plainer than the marketing pages — these
 * are meant to be read and quoted, not scrolled through.
 */
export default function LegalLayout({
  eyebrow,
  titleLines,
  lede,
  breadcrumbLabel,
  sections,
}: {
  eyebrow: string;
  titleLines: ReactNode[];
  lede: string;
  breadcrumbLabel: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        breadcrumb={[{ label: breadcrumbLabel }]}
        titleLines={titleLines}
        lede={lede}
      >
        <p className="mt-7 font-mono text-[0.62rem] tracking-[0.14em] text-faint uppercase">
          Effective {legal.effectiveDate} · {legal.entity}
        </p>
      </PageHero>

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
            {/* Contents */}
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">Contents</p>
              <ol className="mt-4 space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 text-[0.85rem] text-muted transition-colors duration-300 hover:text-white"
                    >
                      <span className="font-mono text-[0.68rem] text-brand-ice/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                  Other policies
                </p>
                <ul className="mt-4 space-y-2">
                  {legalNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.85rem] text-muted transition-colors duration-300 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Body */}
            <div className="max-w-3xl">
              {sections.map((section, index) => (
                <Reveal key={section.id} delay={index * 40}>
                  <section id={section.id} className="scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-brand-ice">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[1.3rem] leading-snug font-semibold text-white">{section.heading}</h2>
                    </div>
                    <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-muted [&_a]:text-brand-cyan [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-paper [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                      {section.body}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      <section className="py-16">
        <Container>
          <p className="text-[0.82rem] leading-relaxed text-faint">
            This page describes how {legal.entity} operates its website and platform. It is written to be read,
            not to be impressive. If anything here is unclear, or you believe we hold data about you that we
            should not, write to us and a person will answer.
          </p>
        </Container>
      </section>
    </>
  );
}
