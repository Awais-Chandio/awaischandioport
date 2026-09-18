import Link from "next/link";
import { ArrowUpIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { contactLink, personalInfo, primaryNav, socials } from "@/data/portfolio";

// The footer is the one place the casual "Contact" entry stays reachable: it is
// kept out of the primary nav so it does not compete with Work With Me.
const footerNav = [...primaryNav, contactLink];

const Footer = () => {
  return (
    <footer className="border-t border-line/10 bg-canvas-soft">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        {/* Closing call to action: the email is the single loudest thing in the footer. */}
        <div className="flex flex-col gap-6 border-b border-line/10 pb-10 sm:gap-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              Let&apos;s work together
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group mt-4 inline-flex w-full max-w-full items-center gap-2 font-display text-xl font-medium leading-tight tracking-tight text-fg transition-colors duration-300 hover:text-accent sm:mt-5 sm:gap-3 sm:text-2xl md:text-3xl lg:text-4xl"
            >
              <span className="min-w-0 break-words">{personalInfo.email}</span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="hidden h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block sm:h-6 sm:w-6 lg:h-7 lg:w-7"
              />
            </a>
            <p className="mt-5 max-w-xl text-sm leading-7 text-fg-muted sm:text-base">
              Available for focused feature work, product collaboration, and teams that care
              about polished, maintainable delivery.
            </p>
          </div>

          <a
            href="#top"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-3 self-start rounded-full border border-line/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted transition duration-300 hover:border-accent/40 hover:text-fg lg:self-auto"
          >
            Back to top
            <ArrowUpIcon aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-col gap-8 pt-10 sm:gap-10 sm:pt-12 lg:flex-row lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fg-dim">
              Sitemap
            </p>
            <nav aria-label="Footer" className="mt-5">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-0 sm:grid-cols-4 sm:gap-x-10 lg:grid-cols-2">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fg-dim">
              Elsewhere
            </p>
            <div className="mt-5 flex flex-wrap gap-3 lg:justify-end">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-line/10 bg-fg/[0.04] px-4 py-2 text-sm font-medium text-fg-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-fg-dim">
              {personalInfo.role} &middot; {personalInfo.location}
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-line/10 pt-6 text-xs text-fg-dim sm:mt-12 sm:pt-8">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
