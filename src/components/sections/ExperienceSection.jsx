import { BriefcaseIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { experience } from "@/data/portfolio";

const ExperienceSection = () => {
  return (
    <section className="section-spacing space-y-10" id="experience">
      <SectionIntro
        eyebrow="Experience"
        title="Professional experience positioned around current React Native work and broader mobile delivery."
        description="My current role at Verge Systems is complemented by broader cross-platform experience, giving me a practical understanding of building and refining mobile applications."
      />

      <div className="relative space-y-6">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 lg:block" />

        {experience.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <div className="grid gap-4 lg:grid-cols-[80px_1fr] lg:items-start">
              <div className="hidden lg:flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sky-200">
                  <BriefcaseIcon className="h-5 w-5" />
                </div>
              </div>

              <div className="panel p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                      {item.period}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-base font-medium text-sky-200">{item.company}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-400">{item.summary}</p>

                <div className="mt-6 grid gap-3">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
