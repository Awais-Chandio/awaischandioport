import Reveal from "@/components/ui/Reveal";
import { professionalHighlights } from "@/data/portfolio";

const StatsSection = () => {
  return (
    <section className="section-spacing">
      <Reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {professionalHighlights.map((item) => (
          <div key={item.title} className="panel group relative overflow-hidden p-6">
            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-sky-400/10 blur-3xl transition duration-500 group-hover:bg-sky-400/20" />
            <div className="relative">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default StatsSection;
