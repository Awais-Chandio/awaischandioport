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
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-canvas/75 px-4 py-3 shadow-soft backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-sm font-bold text-slate-950">
            MA
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
              {personalInfo.shortName}
            </p>
            <p className="text-base font-semibold text-white">
              {personalInfo.role}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} href={link.path} title={link.title} />
          ))}
          <a
            href={personalInfo.resumeUrl}
            className="ml-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand"
          >
            Download CV
          </a>
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
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-[28px] border border-white/10 bg-canvas/95 p-4 shadow-soft backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
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
              className="mt-3 inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Download CV
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
