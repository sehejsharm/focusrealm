import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That route does not exist on Focus Realm Hospitality. Head back to the platform, the six pains, or book a 15-minute demo.",
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
        <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] font-semibold tracking-tight text-white text-balance">
          This route isn&rsquo;t on the floor plan.
        </h1>
        <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
          The page you asked for either moved or never existed. Nothing is broken
          — you just took a corridor we haven&rsquo;t built yet.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/demo" size="lg">
            Book a 15-min demo
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <nav aria-label="Site sections" className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-[0.66rem] tracking-[0.16em] text-brand-cyan uppercase">
            Or pick up where you meant to go
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-3 py-1.5 transition-colors hover:text-white"
                >
                  <span className="font-mono text-[0.7rem] text-faint tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[0.95rem] text-paper group-hover:text-white">
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
