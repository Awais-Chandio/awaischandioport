"use client";

import { useEffect, useState } from "react";
import {
  BoltIcon,
  CircleStackIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { skillGroups } from "@/data/portfolio";

const icons = [
  DevicePhoneMobileIcon,
  BoltIcon,
  CircleStackIcon,
  CommandLineIcon,
];

const SkillCloud = dynamic(() => import("@/components/SkillCloud"), {
  ssr: false,
});

const SkillsSection = () => {
  const [showSkillCloud, setShowSkillCloud] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setShowSkillCloud(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="section-spacing min-w-0 space-y-10 overflow-hidden" id="skills">
      <SectionIntro
        eyebrow="Skills"
        title="Mobile engineering skills grouped by how I use them."
        description="A focused set of React Native, mobile UI, integration, tooling, and additional Flutter skills for building practical app features."
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
          {skillGroups.map((group, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={group.title} delay={index * 0.06}>
                <div className="panel group h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                      Capability
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{group.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {showSkillCloud ? (
          <Reveal delay={0.12} className="hidden lg:block">
            <SkillCloud groups={skillGroups} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
};

export default SkillsSection;
