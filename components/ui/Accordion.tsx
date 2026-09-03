"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

/**
 * Real buttons with aria-expanded / aria-controls, and panels that are always
 * present in the DOM so crawlers read the answers whether or not a human opens
 * them. Collapsed panels use `hidden`, which keeps them out of the a11y tree
 * and out of the tab order without removing them from the HTML.
 */
export default function Accordion({
  items,
  headingLevel = 3,
  className = "",
}: {
  items: AccordionItem[];
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, index) => {
        const expanded = open.has(index);
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start gap-4 py-5 text-left"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand-cyan transition-all duration-300 ${
                    expanded ? "rotate-45 border-brand-bright/70 bg-brand/22" : ""
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                    <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-[1rem] leading-snug font-medium text-white transition-colors group-hover:text-brand-ice">
                  {item.question}
                </span>
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pr-2 pb-6 pl-10 text-[0.92rem] leading-relaxed text-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
