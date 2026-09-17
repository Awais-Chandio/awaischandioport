"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import { aboutParagraphs, aboutPoints, personalInfo } from "@/data/portfolio";

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
      className="section-spacing grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16"
      id="about"
    >
      <div data-about-reveal className="order-2 min-w-0 lg:order-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line/10 bg-canvas-soft">
          <Image
            src={personalInfo.aboutImage}
            alt={`Portrait of ${personalInfo.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </div>
        <p className="mt-5 text-sm leading-7 text-fg-muted">
          {personalInfo.role} &middot; {personalInfo.location}
          <br />
          Currently at {personalInfo.currentCompany}
        </p>
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <div data-about-reveal>
          <SectionIntro
            eyebrow="About"
            title="I build app experiences that are clear, connected, and easy to maintain."
            description="My work sits between interface polish, product logic, and reliable integration with the services behind the app."
          />
        </div>

        <div data-about-reveal className="mt-8 space-y-5">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-fg-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div data-about-reveal className="mt-10 border-t border-line/10">
          {aboutPoints.map((item, index) => (
            <div key={item} className="flex items-start gap-5 border-b border-line/10 py-5">
              <span className="shrink-0 font-display text-sm text-fg-dim/50 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-7 text-fg-muted sm:text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
