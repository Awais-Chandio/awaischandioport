"use client";

import { useRef } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { aboutParagraphs } from "@/data/portfolio";

const AboutSection = () => {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, "[data-about-reveal]");

  return (
    <section
      ref={sectionRef}
      // Editorial split rather than a text column beside empty space: heading on
      // the left, the prose on the right, the same 0.9/1.1 rhythm the Contact
      // section uses. This is what replaced the removed 3D visual column.
      className="section-spacing grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20"
      id="about"
    >
      <div data-about-reveal className="min-w-0">
        <SectionIntro
          eyebrow="About"
          title="I build app experiences that are clear, connected, and easy to maintain."
        />
      </div>

      <div data-about-reveal className="min-w-0 space-y-6 lg:pt-2">
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
