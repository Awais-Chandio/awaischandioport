import { personalInfo, socials } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-slate-300 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold uppercase tracking-[0.24em] text-white">
            {personalInfo.name}
          </p>
          <p className="mt-2 max-w-lg text-muted">
            Flutter developer building mobile products with better structure, better UX, and cleaner delivery.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-4">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-muted">
            © {new Date().getFullYear()} {personalInfo.shortName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
