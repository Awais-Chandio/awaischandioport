"use client";

import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/ui/Reveal";
import { aboutParagraphs, aboutPoints, personalInfo } from "@/data/portfolio";

const AboutSection = () => {
  return (
    <section
      className="section-spacing grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start"
      id="about"
    >
      <Reveal className="space-y-5">
        <div className="panel overflow-hidden p-4 sm:p-6">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(45,212,191,0.12),transparent_50%,rgba(56,189,248,0.16))]" />
            <Image
              src={personalInfo.aboutImage}
              alt={personalInfo.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div className="panel p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Title
            </p>
            <p className="mt-3 text-lg font-semibold text-white">Software Engineer</p>
          </div>
          <div className="panel p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Focus
            </p>
            <p className="mt-3 text-lg font-semibold text-white">React Native</p>
          </div>
          <div className="panel p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Additional
            </p>
            <p className="mt-3 text-lg font-semibold text-white">Flutter Experience</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="space-y-8">
        <SectionIntro
          eyebrow="About"
          title="A mobile engineer focused on clean execution, strong interfaces, and dependable delivery."
          description="I combine software engineering fundamentals with practical mobile product delivery, with a strong focus on React Native, interface quality, and maintainable implementation."
        />

        <div className="panel p-7 sm:p-8">
          <div className="space-y-5">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-300 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 grid gap-4">
            {aboutPoints.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4"
              >
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutSection;
