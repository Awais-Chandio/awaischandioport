"use client";

import { useRef } from "react";
import Card from "@/components/ui/Card";
import DraftMarker from "@/components/ui/DraftMarker";
import SectionIntro from "@/components/ui/SectionIntro";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { processSteps } from "@/data/process";

const ProcessSection = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, "[data-process-reveal]");

  return (
    <section ref={sectionRef} className="min-w-0" aria-labelledby="process-heading">
      <div data-process-reveal>
        <SectionIntro
          eyebrow="Process"
          title="How I work"
          headingId="process-heading"
          description="The order a project usually moves in, from the first conversation to release."
        />
      </div>

      <Card data-process-reveal className="mt-block p-7 sm:p-10">
        <ol>
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid min-w-0 gap-3 border-b border-line/10 py-7 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-[15rem_1fr] lg:gap-10"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl leading-none text-fg-dim/80 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium leading-tight text-fg sm:text-xl">
                  {step.title}
                </h3>
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-7 text-fg-muted">{step.description}</p>
                <DraftMarker note={step.review} className="mt-3" />
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
};

export default ProcessSection;
