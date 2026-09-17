import { personalInfo, socials } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-line/10 bg-canvas-soft">
      <div className="container-page flex flex-col gap-8 py-10 text-sm text-fg-muted lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Muhammad Awais
          </p>
          <p className="mt-3 font-display text-2xl font-medium text-fg">
            Building practical app experiences from interface to integration.
          </p>
          <p className="mt-3 max-w-xl leading-7 text-fg-muted">
            Available for focused feature work, product collaboration, and teams that care
            about polished, maintainable delivery.
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
                className="rounded-full border border-line/10 bg-fg/[0.04] px-4 py-2 text-sm font-medium text-fg-muted transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-fg-dim">
            Copyright {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
