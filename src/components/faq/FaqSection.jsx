"use client";

import { useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DraftMarker from "@/components/ui/DraftMarker";
import SectionIntro from "@/components/ui/SectionIntro";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faqItems } from "@/data/faq";

// Native <details>: keyboard and screen-reader behaviour come from the browser,
// and the answers stay in the DOM for search and print.
const FaqSection = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, "[data-faq-reveal]");

  return (
    <section
      ref={sectionRef}
      className="section-spacing grid min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20"
      aria-labelledby="faq-heading"
    >
      <div data-faq-reveal className="min-w-0">
        <SectionIntro
          eyebrow="FAQ"
          title="Before you write"
          headingId="faq-heading"
          description="The questions that come up most before a project starts."
        />
      </div>

      <div data-faq-reveal className="min-w-0 border-t border-line/10">
        {faqItems.map((item) => (
          <details key={item.question} className="group border-b border-line/10">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-6 font-medium text-fg transition-colors duration-300 hover:text-accent [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">{item.question}</span>
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-fg-dim transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <div className="pb-7">
              <p className="text-sm leading-7 text-fg-muted">{item.answer}</p>
              <DraftMarker
                note={item.review}
                className="mt-3"
              />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
