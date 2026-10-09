import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import Logo from "@/components/site/Logo";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { footerNav, legalNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  // Visible build stamp, so anyone can confirm which version is live. The
  // footer is prerendered, so this is the build time, and the commit comes
  // from Vercel's build environment.
  const built = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-white">

      <Container className="relative pt-20 pb-10">
        {/* Closing CTA */}
        <Reveal className="panel overflow-hidden p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Work with Focus Realm</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.05] font-bold text-paper">
                Two verticals.
                <span className="text-gradient"> One team.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
                Whether you run a school, a training team or a hotel, tell us what you are trying to fix and
                we will point you to the right product.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/contact" size="lg">
                Talk to us
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/team" variant="outline" size="lg">
                Meet the founders
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Link matrix */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Link href="/" aria-label="Focus Realm home" className="inline-flex min-h-11 items-center">
              <Logo markClassName="size-10" />
            </Link>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-faint">
              A software company building learning and operations platforms for education and
              hospitality.
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
                        className="-my-1 inline-flex min-h-11 items-center py-1 text-[0.88rem] text-muted transition-colors duration-300 hover:text-brand"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="-my-1 inline-flex min-h-11 items-center py-1 text-[0.88rem] text-muted transition-colors duration-300 hover:text-brand"
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

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.78rem] text-faint">
            © {year} Focus Realm. All rights reserved.
            <span className="mt-1 block font-mono text-[0.72rem] text-faint">
              Site updated {built}
              {commit ? ` · build ${commit}` : ""}
            </span>
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-[0.78rem] text-muted transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center text-[0.78rem] text-muted transition-colors hover:text-brand"
            >
              {site.email}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
