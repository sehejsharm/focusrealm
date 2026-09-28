import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { topics } from "@/lib/topics";

/**
 * Links from the homepage into every keyword guide, using each guide's title
 * as anchor text. Homepage links carry the most weight a site can pass, so
 * this is what tells a crawler the guides matter. Kept to a plain list, and
 * trimmed to eight on a phone.
 */
export default function GuidesStrip() {
  return (
    <section id="guides" className="relative overflow-hidden py-14 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Guides</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.08] font-semibold text-white">
                Hotel SOP and operations guides.
              </h2>
            </Reveal>
          </div>
          <Link
            href="/guides"
            className="text-[0.9rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 hover:decoration-brand-bright"
          >
            All {topics.length} guides
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <li key={topic.slug} className={index >= 8 ? "max-sm:hidden" : ""}>
              <Link
                href={`/${topic.slug}`}
                className="group flex items-baseline justify-between gap-3 border-t border-line py-3.5 text-[0.92rem] text-paper transition-colors hover:text-white"
              >
                <span>{topic.title}</span>
                <span aria-hidden className="text-brand-cyan opacity-60 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
