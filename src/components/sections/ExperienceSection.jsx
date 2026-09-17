"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import { experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = gsap.utils.toArray("[data-experience-item]", sectionRef.current);

      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
        return undefined;
      }

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        });
      }

      if (items.length) {
        gsap.set(items, { opacity: 0, y: 32 });
        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.15,
            }),
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-spacing min-w-0 space-y-10 overflow-hidden"
      id="experience"
    >
      <SectionIntro
        eyebrow="Experience / Journey"
        title="Current work and the learning path behind it."
        description="A practical mix of product delivery, service integration, interface work, and continuous improvement through shipped features and personal builds."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-line/10 lg:block" />
        <div
          ref={lineRef}
          className="absolute left-4 top-0 hidden h-full w-px bg-accent/70 shadow-[0_0_20px_rgba(255,91,46,0.5)] lg:block"
        />

        {experience.map((item, index) => (
          <div
            key={item.title}
            data-experience-item
            className="grid gap-4 border-b border-line/10 py-8 first:pt-0 last:border-b-0 lg:grid-cols-[80px_1fr] lg:items-start"
          >
            <div className="hidden justify-center lg:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-canvas font-display text-sm text-accent shadow-[0_0_28px_rgba(255,91,46,0.18)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                {item.period}
              </p>
              <h3 className="mt-3 font-display text-xl font-medium leading-tight text-fg sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-base font-medium text-accent">{item.company}</p>

              <p className="mt-5 text-sm leading-7 text-fg-muted">{item.summary}</p>

              <div className="mt-6 grid gap-3">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 text-sm leading-7 text-fg-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
