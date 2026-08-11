import Reveal from "@/components/fx/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/lib/content";

/**
 * Native <details> so the answers exist in the HTML for crawlers whether or
 * not the reader opens them. Paired with FAQPage JSON-LD on the home page.
 */
export default function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions we get asked"
            title="The short answers,"
            accent="in plain language."
            body="If you are comparing us against a hotel LMS or an SOP document tool, these are the differences that matter."
          />

          <Reveal delay={120}>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand-cyan transition-all duration-500 group-open:rotate-45 group-open:border-brand-bright/60 group-open:bg-brand/20">
                      <svg viewBox="0 0 12 12" className="size-2.5" fill="none" aria-hidden>
                        <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <h3 className="text-[1rem] leading-snug font-medium text-white transition-colors group-hover:text-brand-ice">
                      {item.q}
                    </h3>
                  </summary>
                  <p className="pr-2 pb-6 pl-9 text-[0.92rem] leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
