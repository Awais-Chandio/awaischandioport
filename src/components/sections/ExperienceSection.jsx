"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { prefersReducedMotion } from "@/lib/gsapMotion";
import { experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useScrollReveal(sectionRef, "[data-experience-item]", { batch: true });

  // The accent line drawing down the timeline is scroll-scrubbed, so it tracks
  // the reader rather than playing on its own; with reduced motion it is left
  // fully drawn.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !lineRef.current) return undefined;

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
      const draw = gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });

      return () => {
        draw.scrollTrigger?.kill();
        draw.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-spacing min-w-0 space-y-block overflow-hidden"
      id="experience"
    >
      <SectionIntro
        eyebrow="Experience"
        title="Where I have worked."
        description="Roles, employers, and dates as they appear on my resume."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-line/10 lg:block" />
        <div
          ref={lineRef}
          className="absolute left-4 top-0 hidden h-full w-px bg-accent/70 shadow-glow lg:block"
        />

        {experience.map((item, index) => (
          <div
            key={item.title}
            data-experience-item
            className="grid gap-5 border-b border-line/10 py-10 first:pt-0 last:border-b-0 lg:grid-cols-[80px_1fr] lg:items-start"
          >
            <div className="hidden justify-center lg:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-canvas font-display text-sm text-accent shadow-glow-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                {item.period}
              </p>
              <h3 className="mt-4 font-display text-xl font-medium leading-tight text-fg sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-medium text-accent sm:text-base">
                {item.company}
                {item.location ? (
                  <span className="text-fg-dim"> &middot; {item.location}</span>
                ) : null}
              </p>

              {/* Summary and bullets are optional: an entry states only what the
                  resume states for that role, rather than padding it out. */}
              {item.summary ? (
                <p className="mt-6 text-sm leading-7 text-fg-muted">{item.summary}</p>
              ) : null}

              {item.bullets?.length ? (
                <div className="mt-7 grid gap-4">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 text-sm leading-7 text-fg-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
