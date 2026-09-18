"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { resolveProof, services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);

  // Same reveal contract the home sections use: one trigger, staggered children,
  // and a straight set() when the visitor asks for reduced motion.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray("[data-service-reveal]", sectionRef.current);
      if (!targets.length) return undefined;

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(targets, { opacity: 0, y: 28 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-spacing min-w-0" aria-label="Services">
      <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
        {services.map((service) => {
          const proofs = service.proofs.map(resolveProof).filter(Boolean);

          return (
            <Card
              key={service.id}
              data-service-reveal
              className="flex min-w-0 flex-col p-6 sm:p-8"
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

              <h2 className="text-balance mt-5 font-display text-xl font-medium leading-tight text-fg sm:text-2xl">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-fg-muted">{service.description}</p>

              <div className="mt-6 border-t border-line/10 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim">
                  Who it&apos;s for
                </p>
                <p className="mt-2 text-sm leading-7 text-fg-muted">{service.audience}</p>
              </div>

              {/* Pushed to the card foot so proof lines sit on one baseline across the grid. */}
              <div className="mt-auto border-t border-line/10 pt-5 sm:pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  See it in action
                </p>

                <ul className="mt-4 flex flex-col gap-5">
                  {proofs.map((proof) => (
                    <li key={proof.key} className="min-w-0">
                      <p className="text-sm leading-7 text-fg-muted">{proof.note}</p>
                      <Button
                        href={proof.href}
                        variant="secondary"
                        size="sm"
                        className="mt-3 min-h-[44px] max-w-full whitespace-normal text-left"
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

      <Card
        data-service-reveal
        className="mt-10 flex flex-col gap-5 border-accent/20 bg-accent/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="min-w-0">
          <h2 className="font-display text-xl font-medium text-fg sm:text-2xl">
            Think one of these fits?
          </h2>
          <p className="mt-2 text-sm leading-7 text-fg-muted">
            Send the project type, budget and timeline and I will tell you honestly
            whether I am the right person for it.
          </p>
        </div>
        <Button href="/work-with-me" variant="primary" className="shrink-0">
          Work With Me
          <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
        </Button>
      </Card>

      <p data-service-reveal className="mt-8 text-sm leading-7 text-fg-muted">
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
