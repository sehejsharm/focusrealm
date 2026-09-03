import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import { LogoMark } from "@/components/site/Logo";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { footerNav, legalNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-bright/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand/12 blur-[130px]"
      />

      <Container className="relative pt-20 pb-10">
        {/* Closing CTA */}
        <Reveal className="panel spotlight overflow-hidden p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Start with one property</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.05] font-semibold text-white">
                Start your hotel operations pilot
                <span className="text-gradient"> with one property.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
                Fifteen minutes on the three role interfaces, run against a live property environment — then a
                pilot scoped to your floors, your standards and your shift patterns.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/demo" size="lg">
                Book a 15-min demo
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Contact the team
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Link matrix */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center gap-3">
              <LogoMark className="size-10" decorative />
              <span className="flex flex-col leading-none">
                <span className="text-[0.95rem] font-semibold text-white">Focus Realm</span>
                <span className="mt-1 font-mono text-[0.76rem] tracking-[0.16em] text-faint uppercase">
                  Hospitality
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-faint">
              {site.categoryLine} Hotel SOP management, housekeeping task tracking and audit
              compliance — captured while the work happens, not reconstructed afterwards.
            </p>
            <p className="mt-5 font-mono text-[0.78rem] tracking-[0.1em] text-brand-ice/80">
              {site.tagline.toUpperCase()}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="font-mono text-[0.76rem] tracking-[0.18em] text-faint uppercase">
                {group.heading}
              </h3>
              <ul className="mt-2 space-y-0">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-my-1 inline-flex min-h-11 items-center py-1 text-[0.88rem] text-muted transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="-my-1 inline-flex min-h-11 items-center py-1 text-[0.88rem] text-muted transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Oversized wordmark */}
        <Reveal
          variant="scale"
          className="mt-16 select-none"
          aria-hidden
        >
          <span className="block bg-linear-to-b from-white/12 to-white/[0.02] bg-clip-text text-[clamp(3.4rem,13vw,11rem)] leading-[0.82] font-semibold tracking-[-0.05em] text-transparent">
            FOCUS REALM
          </span>
        </Reveal>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.78rem] text-faint">
            © {year} {site.legalName}. A service execution platform — not a learning management system.
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-[0.78rem] text-muted transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center text-[0.78rem] text-muted transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
