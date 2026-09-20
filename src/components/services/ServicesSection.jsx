"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { resolveProof, services } from "@/data/services";

// `children` is rendered between the cards and the closing call to action, so a
// page can slot a related section (the process) ahead of "Think one of these fits?".
const ServicesSection = ({ children }) => {
  const sectionRef = useRef(null);

  // Same reveal the home sections use. Batched so the closing call to action and
  // note, which sit below the fold on a phone, reveal as they arrive rather than
  // all at once with the cards.
  useScrollReveal(sectionRef, "[data-service-reveal]", { batch: true });

  return (
    <section ref={sectionRef} className="section-spacing min-w-0" aria-label="Services">
      <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-10">
        {services.map((service) => {
          const proofs = service.proofs.map(resolveProof).filter(Boolean);

          return (
            <Card
              key={service.id}
              data-service-reveal
              className="flex min-w-0 flex-col p-7 sm:p-10"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl leading-none text-fg-dim/80 tabular-nums"
                >
                  {service.number}
                </span>
                <Badge size="sm">{service.stack}</Badge>
              </div>

              <h2 className="text-balance mt-6 font-display text-xl font-medium leading-tight text-fg sm:text-2xl">
                {service.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-fg-muted">{service.description}</p>

              <div className="mt-8 border-t border-line/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim">
                  Who it&apos;s for
                </p>
                <p className="mt-3 text-sm leading-7 text-fg-muted">{service.audience}</p>
              </div>

              {/* Pushed to the card foot so proof lines sit on one baseline across the grid. */}
              <div className="mt-auto border-t border-line/10 pt-6 sm:pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  See it in action
                </p>

                <ul className="mt-5 flex flex-col gap-6">
                  {proofs.map((proof) => (
                    <li key={proof.key} className="min-w-0">
                      <p className="text-sm leading-7 text-fg-muted">{proof.note}</p>
                      <Button
                        href={proof.href}
                        variant="secondary"
                        size="sm"
                        className="mt-4 min-h-[44px] max-w-full whitespace-normal text-left"
                      >
                        <span className="min-w-0">
                          {proof.label}
                          <span className="text-fg-dim"> &middot; {proof.source}</span>
                        </span>
                        <ArrowUpRightIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {children ? (
        // Same arrangement the home page uses between sections: a hairline with
        // half a section of gap either side, so the full section spacing holds.
        <div className="mt-section-half flex flex-col gap-section-half">
          <SectionDivider />
          {children}
          <SectionDivider />
        </div>
      ) : null}

      <Card
        data-service-reveal
        className={`${children ? "mt-section-half" : "mt-block"} flex flex-col gap-6 border-accent/20 bg-accent/[0.06] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10`}
      >
        <div className="min-w-0">
          <h2 className="font-display text-xl font-medium text-fg sm:text-2xl">
            Think one of these fits?
          </h2>
          <p className="mt-3 text-sm leading-7 text-fg-muted">
            Send the project type, budget and timeline and I will tell you honestly
            whether I am the right person for it.
          </p>
        </div>
        <Button href="/work-with-me" variant="primary" className="shrink-0">
          Work With Me
          <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
        </Button>
      </Card>

      <p data-service-reveal className="mt-10 text-sm leading-7 text-fg-muted">
        Every example above is covered in more detail in the{" "}
        <a
          href="/#projects"
          className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent"
        >
          Work section
        </a>
        .
      </p>
    </section>
  );
};

export default ServicesSection;
