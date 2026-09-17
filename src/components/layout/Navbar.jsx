"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "@/components/ui/NavLink";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks, personalInfo } from "@/data/portfolio";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.path.replace("#", "")), []);
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-line/10 bg-canvas/70 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-6">
        <Link href="#home" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-fg sm:h-11 sm:w-11">
            MA
          </span>
          <div className="block min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted sm:text-[11px] sm:tracking-[0.3em]">
              Muhammad Awais
            </p>
            <p className="truncate text-xs font-medium text-fg sm:text-sm">
              {personalInfo.role}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              href={link.path}
              title={link.title}
              active={activeId === link.path.replace("#", "")}
            />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href={personalInfo.resumeUrl} variant="secondary" size="sm">
            Download CV
          </Button>
          <Button href="#contact" variant="primary" size="sm">
            Let&apos;s Talk
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/10 bg-fg/[0.04] text-fg transition hover:bg-fg/[0.08]"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="mx-auto mt-3 w-full max-w-7xl rounded-[28px] border border-line/10 bg-canvas/95 p-4 shadow-soft backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                title={link.title}
                active={activeId === link.path.replace("#", "")}
                onClick={() => setIsOpen(false)}
              />
            ))}
            <Button href={personalInfo.resumeUrl} variant="secondary" className="mt-3 justify-center">
              Download CV
            </Button>
            <Button href="#contact" variant="primary" className="justify-center" onClick={() => setIsOpen(false)}>
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
