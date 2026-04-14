"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "@/components/ui/NavLink";
import { navLinks, personalInfo } from "@/data/portfolio";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-6">
        <Link href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7dd3fc,#2563eb)] text-sm font-bold text-slate-950 shadow-[0_10px_30px_rgba(59,130,246,0.35)]">
            MA
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-400">
              Muhammad Awais
            </p>
            <p className="text-sm font-medium text-white">
              {personalInfo.role} · {personalInfo.specialization}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} href={link.path} title={link.title} />
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href={personalInfo.resumeUrl} className="button-secondary px-5 py-2.5">
            Download CV
          </a>
          <Link href="#contact" className="button-primary px-5 py-2.5">
            Let&apos;s Talk
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/90 p-4 shadow-soft backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                title={link.title}
                onClick={() => setIsOpen(false)}
              />
            ))}
            <a
              href={personalInfo.resumeUrl}
              className="button-secondary mt-3 justify-center px-5 py-3"
            >
              Download CV
            </a>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="button-primary justify-center px-5 py-3"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
