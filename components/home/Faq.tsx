import Reveal from "@/components/fx/Reveal";
import Accordion from "@/components/ui/Accordion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/lib/content";

/**
 * Answers stay in the HTML whether or not a panel is open, so crawlers see
 * them; the accordion itself is a set of real buttons with full ARIA state.
 * Paired with FAQPage JSON-LD on the home page.
 */
export default function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions we get asked"
            title="Hotel SOP platform FAQ,"
            accent="in plain language."
            body="If you are comparing us against a hotel LMS or an SOP document tool, these are the differences that matter."
          />

          <Reveal delay={80}>
            <Accordion items={faqs.map((item) => ({ question: item.q, answer: item.a }))} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
