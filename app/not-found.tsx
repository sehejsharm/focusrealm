import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist on Focus Realm. Head back to the homepage, or explore Mise and the education platform.",
  robots: { index: false, follow: true },
};

/**
 * A 404 that stays inside the product's world. The default Next.js page drops
 * a visitor onto a bare black screen with no way back, which on a marketing
 * site is a dead end at the exact moment someone is already slightly lost.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[76vh] flex-col justify-center py-24">
      <Reveal>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] font-semibold tracking-tight text-paper text-balance">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
          It may have moved — our hotel product now lives at misehotel.com and our education
          platform at focus-realm.com. Everything else is below.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" size="lg">
            Talk to us
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <nav aria-label="Site sections" className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-[0.78rem] tracking-[0.16em] text-brand-cyan uppercase">
            Or pick up where you meant to go
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-3 py-1.5 transition-colors hover:text-brand"
                >
                  <span className="font-mono text-[0.7rem] text-faint tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[0.95rem] text-paper group-hover:text-brand">
                      {item.label}
                    </span>
                    <span className="block text-[0.8rem] text-faint">{item.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </Container>
  );
}
