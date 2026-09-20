"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "@/components/ui/NavLink";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { MobilePaletteButton, NavPaletteButton } from "@/components/command-palette/PaletteHint";
import { useActiveSection } from "@/hooks/useActiveSection";
import { fade, menuItem, menuPanel } from "@/lib/motion";
import { primaryNav, personalInfo } from "@/data/portfolio";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const sectionIds = useMemo(
    () => primaryNav.filter((link) => link.sectionId).map((link) => link.sectionId),
    []
  );
  const activeId = useActiveSection(sectionIds);

  // Nav items are routes now, so a click can leave the page with the panel still
  // mounted over the new one.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape closes the panel and hands focus back to the button that opened it,
  // so a keyboard visitor is not left on a row that has just unmounted. Closing
  // by tapping a link does not restore focus: navigation owns it from there.
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  // On the home page the section links stay bare hashes so Lenis handles the
  // scroll; everywhere else they need the full path to get back home first.
  const hrefFor = (link) => (isHome && link.sectionId ? `#${link.sectionId}` : link.href);

  const isActive = (link) =>
    isHome ? Boolean(link.sectionId) && activeId === link.sectionId : pathname === link.href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-line/10 bg-canvas/70 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-6">
        <Link
          href={isHome ? "#home" : "/"}
          className="flex min-h-[44px] min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-fg sm:h-11 sm:w-11">
            MA
          </span>
          <div className="block min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted sm:text-[11px] sm:tracking-[0.3em]">
              Muhammad Awais
            </p>
            <p className="truncate text-xs font-medium text-fg sm:text-sm lg:hidden xl:block">
              {personalInfo.role}
            </p>
          </div>
        </Link>

        <div className="hidden items-center lg:flex">
          {primaryNav.map((link) => (
            <NavLink
              key={link.href}
              href={hrefFor(link)}
              title={link.title}
              active={isActive(link)}
            />
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <NavPaletteButton />
          <ThemeToggle />
          <Button
            as="a"
            href={personalInfo.resumeUrl}
            download={personalInfo.resumeFileName}
            variant="secondary"
            size="sm"
            className="hidden whitespace-nowrap xl:inline-flex"
          >
            Download CV
          </Button>
          <Button
            href={isHome ? "#contact" : "/#contact"}
            variant="primary"
            size="sm"
            className="whitespace-nowrap"
          >
            Let&apos;s Talk
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <MobilePaletteButton />
          <ThemeToggle />
          <button
            ref={toggleRef}
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

      <AnimatePresence>
        {/* Scrim. It sits behind the nav pill and the panel — the header's own
            z-50 makes it a stacking context, so -z-10 is local to it — and gives
            the panel a tap-anywhere dismissal, which it had no equivalent of
            besides the X and Escape. Opacity only, and deliberately no
            backdrop-filter: a blur across the whole viewport is the one thing
            guaranteed to cost frames on a mid-range phone. Tapping it does not
            pull focus back to the trigger the way Escape does, so a thumb tap
            never leaves a focus ring behind. */}
        {isOpen ? (
          <motion.div
            key="scrim"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-canvas/40 lg:hidden"
          />
        ) : null}
        {isOpen ? (
          <motion.div
            key="panel"
            id="mobile-navigation"
            variants={menuPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent
            className="mx-auto mt-3 max-h-[calc(100vh-7.5rem)] w-full max-w-7xl overflow-y-auto overscroll-contain rounded-[28px] border border-line/10 bg-canvas/95 p-4 shadow-soft backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {primaryNav.map((link) => (
                <motion.div key={link.href} variants={menuItem} className="flex flex-col">
                  <NavLink
                    href={hrefFor(link)}
                    title={link.title}
                    active={isActive(link)}
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
              ))}
              <motion.div variants={menuItem} className="mt-3 flex flex-col">
                <Button
                  as="a"
                  href={personalInfo.resumeUrl}
                  download={personalInfo.resumeFileName}
                  variant="secondary"
                  className="justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Download CV
                </Button>
              </motion.div>
              <motion.div variants={menuItem} className="flex flex-col">
                <Button
                  href={isHome ? "#contact" : "/#contact"}
                  variant="primary"
                  className="justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Let&apos;s Talk
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
