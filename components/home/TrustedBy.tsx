import Image from "next/image";

import Reveal from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Section";
import { clients } from "@/lib/content";

/**
 * Social proof, immediately under the hero. Logos render when files exist in
 * assets/clients/; until then each client shows as a wordmark tile, which
 * still carries the name for crawlers either way.
 */
export default function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by-heading" className="relative border-y border-line py-14 sm:py-16">
      <Container>
        <Reveal>
          <p
            id="trusted-by-heading"
            className="text-center font-mono text-[0.76rem] tracking-[0.2em] text-faint uppercase"
          >
            Trusted across hospitality, training and fast-moving teams
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <li key={client.name} className="bg-ink/70">
              <Reveal delay={index * 60} className="flex h-full flex-col items-center justify-center gap-3 px-4 py-7">
                {client.logo ? (
                  <span className="flex h-10 w-full items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      sizes="140px"
                      className="max-h-10 w-auto opacity-80 transition-opacity duration-500 hover:opacity-100"
                    />
                  </span>
                ) : (
                  <span className="flex h-10 items-center text-center text-[0.92rem] leading-tight font-medium text-paper">
                    {client.name}
                  </span>
                )}
                <span className="text-center font-mono text-[0.72rem] tracking-[0.12em] text-faint uppercase">
                  {client.segment}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
