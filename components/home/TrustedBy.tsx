import Image from "next/image";

import Reveal from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Section";
import { clients } from "@/lib/content";

/**
 * Customer row directly under the hero. Each client shows its logo above its
 * name and segment; a client without a logo falls back to the name alone.
 */
export default function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by-heading" className="border-b border-line bg-white py-10 sm:py-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p id="trusted-by-heading" className="shrink-0 text-[0.9rem] text-muted lg:max-w-[200px]">
            Trusted by organisations across hospitality, education and training
          </p>
          <ul className="grid flex-1 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client, index) => (
              <Reveal as="li" key={client.name} delay={index * 60}>
                {client.logo ? (
                  <div className="mb-3 flex h-16 items-center">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      sizes="160px"
                      className="h-auto max-h-16 w-auto max-w-full object-contain"
                    />
                  </div>
                ) : null}
                <span className="block text-[0.95rem] leading-tight font-semibold tracking-[-0.01em] text-paper/80">
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
