import Reveal from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Section";
import { clients } from "@/lib/content";

/** Customer row directly under the hero: names set as quiet wordmarks. */
export default function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by-heading" className="border-b border-line bg-white py-10 sm:py-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p id="trusted-by-heading" className="shrink-0 text-[0.9rem] text-muted lg:max-w-[200px]">
            Trusted by organisations across hospitality, education and training
          </p>
          <ul className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client, index) => (
              <Reveal as="li" key={client.name} delay={index * 60}>
                <span className="block text-[1.05rem] leading-tight font-semibold tracking-[-0.01em] text-paper/80">
                  {client.name}
                </span>
                <span className="mt-1 block text-[0.8rem] text-faint">{client.segment}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
