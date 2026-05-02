import { AcademicCapIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { education, personalInfo } from "@/data/portfolio";

const EducationSection = () => {
  return (
    <section
      className="section-spacing grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
      id="education"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Education"
          title="Academic foundation in software engineering."
          description="My degree supports the way I approach application structure, problem solving, and maintainable mobile app development."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="panel-strong p-6 sm:p-8">
          <div className="grid gap-5">
            {education.map((item) => (
              <div
                key={item.degree}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-200">
                    <AcademicCapIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                      Degree
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{item.degree}</h3>
                    <p className="mt-2 text-base font-medium text-sky-200">{item.institution}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,0.12),rgba(45,212,191,0.08))] p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                Profile Alignment
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {personalInfo.degree} supporting a practical focus on mobile product engineering.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default EducationSection;
