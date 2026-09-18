"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import { aboutParagraphs } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray("[data-about-reveal]", sectionRef.current);
      if (!targets.length) return undefined;

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(targets, { opacity: 0, y: 32 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }),
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      // Editorial split rather than a text column beside empty space: heading on
      // the left, the prose on the right, the same 0.9/1.1 rhythm the Contact
      // section uses. This is what replaced the removed 3D visual column.
      className="section-spacing grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16"
      id="about"
    >
      <div data-about-reveal className="min-w-0">
        <SectionIntro
          eyebrow="About"
          title="I build app experiences that are clear, connected, and easy to maintain."
        />
      </div>

      <div data-about-reveal className="min-w-0 space-y-5 lg:pt-2">
        {aboutParagraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-[60ch] text-base leading-8 text-fg-muted sm:text-lg sm:leading-9"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
