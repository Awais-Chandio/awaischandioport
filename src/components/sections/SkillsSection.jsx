"use client";

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
  return (
    <section className="section-spacing min-w-0 space-y-10 overflow-hidden" id="skills">
      <SectionIntro
        eyebrow="Skills"
        title="Core mobile engineering skills presented with clearer structure and stronger emphasis on React Native."
        description="From React Native fundamentals to integrations and collaboration tooling, these are the capabilities I use to build and improve cross-platform mobile products."
      />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-stretch">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          {skillGroups.map((group, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={group.title} delay={index * 0.06}>
                <div className="panel group h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                      Capability
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-white">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{group.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <SkillCloud groups={skillGroups} />
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;
