import { personalInfo, socials } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-200">
            Muhammad Awais
          </p>
          <p className="mt-3 text-2xl font-semibold text-white">
            Software Engineer focused on React Native and polished mobile experiences.
          </p>
          <p className="mt-3 max-w-xl leading-7 text-slate-400">
            Building cross-platform applications with thoughtful UI, reliable engineering, and a product mindset shaped by real mobile delivery work.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-300/40 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
