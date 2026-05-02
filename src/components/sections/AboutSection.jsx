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
      <Reveal className="order-2 space-y-5 lg:order-1">
        <div className="panel overflow-hidden p-3 sm:p-6">
          <div className="relative aspect-square overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/70 sm:rounded-[28px] md:aspect-[5/4] lg:aspect-[4/5]">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(45,212,191,0.12),transparent_50%,rgba(56,189,248,0.16))]" />
            <Image
              src={personalInfo.aboutImage}
              alt={`Portrait of ${personalInfo.name}`}
              width={900}
              height={900}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div className="panel p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Title
            </p>
            <p className="mt-3 text-lg font-semibold text-white">Software Engineer</p>
          </div>
          <div className="panel p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Focus
            </p>
            <p className="mt-3 text-lg font-semibold text-white">React Native</p>
          </div>
          <div className="panel p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Additional
            </p>
            <p className="mt-3 text-lg font-semibold text-white">Flutter</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="order-1 space-y-8 lg:order-2">
        <SectionIntro
          eyebrow="About"
          title="A Software Engineer focused on React Native mobile apps."
          description="I work on mobile screens, app features, API-connected flows, and maintainable React Native code, with additional Flutter experience."
        />

        <div className="panel p-5 sm:p-8">
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
                className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 sm:rounded-[24px]"
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
