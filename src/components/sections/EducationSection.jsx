"use client";

import { useRef } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import { education, personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray("[data-education-reveal]", sectionRef.current);
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
    <section
      ref={sectionRef}
      className="section-spacing grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16"
      id="education"
    >
      <div data-education-reveal>
        <SectionIntro
          eyebrow="Education"
          title="Academic foundation in software engineering."
          description="My degree supports the way I approach application structure, problem solving, and maintainable mobile app development."
        />
      </div>

      <div data-education-reveal className="min-w-0 border-t border-line/10">
        {education.map((item) => (
          <div
            key={item.degree}
            className="flex items-start gap-4 border-b border-line/10 py-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
              <AcademicCapIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                {item.period || "Degree"}
              </p>
              <h3 className="mt-3 font-display text-xl font-medium text-fg sm:text-2xl">
                {item.degree}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent sm:text-base">{item.institution}</p>
              {item.description ? (
                <p className="mt-4 text-sm leading-7 text-fg-muted">{item.description}</p>
              ) : null}
            </div>
          </div>
        ))}

        <div className="py-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            Profile Alignment
          </p>
          <p className="mt-3 text-base font-semibold text-fg sm:text-lg">
            {personalInfo.degree} supporting a practical focus on mobile product engineering.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
