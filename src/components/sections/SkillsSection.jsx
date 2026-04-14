import {
  BoltIcon,
  CircleStackIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { skillGroups } from "@/data/portfolio";

const icons = [
  DevicePhoneMobileIcon,
  BoltIcon,
  CircleStackIcon,
  CommandLineIcon,
];

const SkillsSection = () => {
  return (
    <section className="section-spacing space-y-10" id="skills">
      <SectionIntro
        eyebrow="Skills"
        title="Core mobile engineering skills presented with clearer structure and stronger emphasis on React Native."
        description="From React Native fundamentals to integrations and collaboration tooling, these are the capabilities I use to build and improve cross-platform mobile products."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length];

          return (
            <Reveal key={group.title} delay={index * 0.06}>
              <div className="panel group h-full p-6 sm:p-7 transition duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Capability
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{group.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
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
    </section>
  );
};

export default SkillsSection;
