"use client";

import { useRef } from "react";
import {
  BoltIcon,
  CircleStackIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import { skillGroups } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const icons = [DevicePhoneMobileIcon, BoltIcon, CircleStackIcon, CommandLineIcon];

const SkillsSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray("[data-skill-card]", sectionRef.current);
      if (!cards.length) return undefined;

      if (reduceMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(cards, { opacity: 0, y: 28 });

      const triggers = ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-spacing min-w-0" id="skills">
      <SectionIntro
        eyebrow="Skills"
        title="Skills grouped by the job they do in a real product."
        description="From screen structure to service integration, these are the areas I use most when taking a feature from idea to working flow."
      />

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length];

          return (
            <Card
              key={group.title}
              data-skill-card
              className="p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-line/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fg-dim">
                  Capability
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-medium text-fg sm:text-2xl">
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-fg-muted">{group.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line/10 bg-fg/[0.04] px-3 py-1.5 text-xs font-medium text-fg-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
