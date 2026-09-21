"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  BeakerIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useBeyondTheCode } from "@/components/beyond/BeyondTheCodeProvider";
import { fade, fadeRise } from "@/lib/motion";
import { labLink, personalInfo, primaryNav } from "@/data/portfolio";

// Icons and extra search terms are keyed by the nav entry's title so the route
// list itself stays defined once, in data/portfolio.js. `keywords` widen what a
// visitor can type to find a row ("hire" finds Work With Me) without changing
// what it is called.
const navMeta = {
  Home: { icon: HomeIcon, keywords: ["top", "hero", "start", "landing"] },
  Work: { icon: RectangleStackIcon, keywords: ["projects", "portfolio", "case studies", "apps"] },
  Services: { icon: WrenchScrewdriverIcon, keywords: ["offer", "hire", "freelance", "pricing"] },
  Writing: { icon: PencilSquareIcon, keywords: ["blog", "posts", "articles", "essays"] },
  Experience: { icon: BriefcaseIcon, keywords: ["jobs", "roles", "career", "resume", "skills", "education"] },
  "Work With Me": { icon: ChatBubbleLeftRightIcon, keywords: ["hire", "contact", "inquiry", "project", "quote"] },
};

// cmdk's stock scorer matches loosely across the label and every keyword, which
// on a list this short lets "theme" rank Go to Home above Toggle theme, and puts
// Open GitHub in the results for "hire". This one keeps the fuzzy match — letters
// in order, so "wrtg" still finds Writing — but only against the visible label,
// and ranks a real substring or a keyword hit above it. Returning 0 hides a row.
const isSubsequence = (needle, haystack) => {
  let cursor = 0;
  for (const char of haystack) {
    if (char === needle[cursor]) cursor += 1;
    if (cursor === needle.length) return true;
  }
  return false;
};

const scoreCommand = (value, search, keywords = []) => {
  const query = search.trim().toLowerCase();
  if (!query) return 1;

  const label = value.toLowerCase();
  const at = label.indexOf(query);
  if (at !== -1) {
    const startsWord = at === 0 || label[at - 1] === " ";
    return startsWord ? 1 : 0.8;
  }
  if (keywords.some((keyword) => keyword.toLowerCase().includes(query))) return 0.5;
  return isSubsequence(query.replace(/\s+/g, ""), label) ? 0.2 : 0;
};

// The keyboard hints and the on-screen close button switch on input modality,
// not width: a large touch tablet has no Esc key either. Each is a single
// `display` rule under one media query, so none of them can fight a breakpoint
// class over which wins.
const KBD_CLASS =
  "inline-flex items-center rounded-full border border-line/15 bg-fg/[0.05] px-2 py-0.5 text-[11px] font-semibold text-fg-dim";

const GROUP_CLASS =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-fg-dim";

const ITEM_CLASS =
  "flex min-h-[44px] cursor-pointer select-none items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-fg-muted outline-none transition-colors duration-200 data-[selected=true]:bg-accent/[0.12] data-[selected=true]:text-fg";

const Item = ({ icon: Icon, label, hint, external, ...props }) => (
  <Command.Item value={label} className={ITEM_CLASS} {...props}>
    <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
    <span className="min-w-0 flex-1 truncate">{label}</span>
    {hint ? <span className="shrink-0 text-xs font-medium text-fg-dim">{hint}</span> : null}
    {external ? (
      <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-fg-dim" />
    ) : null}
  </Command.Item>
);

const CommandPalette = ({ open, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { openBeyondTheCode } = useBeyondTheCode();

  // Two things have to outlive the click that picks a row, so they live in refs:
  // a same-page scroll that must wait for the dialog to finish leaving, and a
  // flag that stops Radix handing focus back to the trigger once a row has
  // moved the visitor somewhere else.
  const pendingScrollRef = useRef(null);
  const pendingBeyondRef = useRef(false);
  const skipFocusRestoreRef = useRef(false);
  const returnFocusRef = useRef(null);

  // Radix only hands focus back to a `Dialog.Trigger`, and the palette has none
  // — it opens from a shortcut or from three unrelated buttons — so the element
  // that had focus is remembered here. A layout effect runs before Radix's
  // passive one moves focus into the input, which is what makes this the right
  // moment to read it.
  useLayoutEffect(() => {
    if (open) returnFocusRef.current = document.activeElement;
  }, [open]);

  const returnFocus = (event) => {
    event.preventDefault();
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (!skipFocusRestoreRef.current && target?.isConnected) target.focus();
  };

  const close = ({ restoreFocus }) => {
    skipFocusRestoreRef.current = !restoreFocus;
    onOpenChange(false);
  };

  const goTo = (link) => {
    close({ restoreFocus: false });

    // On the home page the section links are same-page scrolls, exactly as the
    // navbar treats them. Waiting for the exit animation keeps Radix's scroll
    // lock from swallowing the scroll.
    if (pathname === "/" && link.sectionId) {
      pendingScrollRef.current = link.sectionId;
      return;
    }
    router.push(link.href);
  };

  // "Beyond the Code" is another modal, so it waits for this one to finish
  // leaving rather than the two trapping focus at once.
  const openBeyond = () => {
    close({ restoreFocus: false });
    pendingBeyondRef.current = true;
  };

  const runPendingScroll = () => {
    if (pendingBeyondRef.current) {
      pendingBeyondRef.current = false;
      openBeyondTheCode();
      return;
    }

    const id = pendingScrollRef.current;
    pendingScrollRef.current = null;
    if (!id) return;

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => {
    close({ restoreFocus: true });
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Clipboard writes need a user gesture, so this runs synchronously inside the
  // select handler and not after the exit animation.
  const copyEmail = async () => {
    close({ restoreFocus: true });
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      toast.success("Email copied", { description: personalInfo.email });
    } catch {
      toast.error("Could not copy the email", {
        description: `You can reach me at ${personalInfo.email}.`,
      });
    }
  };

  const downloadResume = () => {
    close({ restoreFocus: true });
    const link = document.createElement("a");
    link.href = personalInfo.resumeUrl;
    link.download = personalInfo.resumeFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openExternal = (url) => {
    close({ restoreFocus: false });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isDark = resolvedTheme === "dark";

  return (
    <Dialog.Root
      open={open}
      // Radix only asks to close on Escape, an outside click, or the close
      // button — all of them dismissals, so focus goes back to where it was.
      onOpenChange={(next) => (next ? onOpenChange(true) : close({ restoreFocus: true }))}
    >
      <AnimatePresence onExitComplete={runPendingScroll}>
        {open ? (
          <Dialog.Portal forceMount>
            {/* Same backdrop as the project detail modal: canvas at 80% with a
                2xl blur, and a scrolling overlay so the panel can never be taller
                than the screen. z-[100] keeps it above that modal when the
                palette is opened from inside it. */}
            <Dialog.Overlay asChild forceMount>
              <motion.div
                variants={fade}
                initial="hidden"
                animate="visible"
                exit="exit"
                data-lenis-prevent
                className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-canvas/80 backdrop-blur-2xl"
              >
                <div className="flex min-h-full items-start justify-center px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-[14vh]">
                  <Dialog.Content
                    asChild
                    forceMount
                    onCloseAutoFocus={returnFocus}
                  >
                    <motion.div
                      variants={fadeRise}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-line/10 bg-canvas-soft shadow-lift"
                    >
                      <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                      <Dialog.Description className="sr-only">
                        Search for a page or action, use the arrow keys to move between results,
                        and press Enter to run one.
                      </Dialog.Description>

                      <Command loop filter={scoreCommand} label="Command palette">
                        <div className="flex items-center gap-3 border-b border-line/10 pl-5 pr-3">
                          <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-fg-dim"
                          />
                          {/* The global :focus-visible ring would box the whole
                              row awkwardly around a bare input; the caret and
                              the highlighted result are the focus indicator. */}
                          <Command.Input
                            placeholder="Search pages and actions…"
                            className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-dim focus-visible:outline-none"
                          />
                          <span className={`${KBD_CLASS} hidden [@media(hover:hover)]:inline-flex`}>
                            Esc
                          </span>
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1] [@media(hover:hover)]:hidden"
                              aria-label="Close command palette"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </Dialog.Close>
                        </div>

                        {/* data-lenis-prevent keeps the smooth-scroll layer from
                            hijacking the wheel while it is over this list. */}
                        <Command.List
                          data-lenis-prevent
                          className="max-h-[min(28rem,50dvh)] overflow-y-auto overscroll-contain p-2 pb-3"
                        >
                          <Command.Empty className="px-3 py-10 text-center text-sm text-fg-muted">
                            No results found.
                          </Command.Empty>

                          <Command.Group heading="Navigation" className={GROUP_CLASS}>
                            {primaryNav.map((link) => {
                              // A nav entry added or renamed in portfolio.js without a
                              // matching navMeta row still renders, with a neutral icon,
                              // instead of taking the whole palette down.
                              const meta = navMeta[link.title] || {
                                icon: ArrowTopRightOnSquareIcon,
                                keywords: [],
                              };
                              return (
                                <Item
                                  key={link.href}
                                  icon={meta.icon}
                                  label={`Go to ${link.title}`}
                                  keywords={meta.keywords}
                                  onSelect={() => goTo(link)}
                                />
                              );
                            })}
                            <Item
                              icon={BeakerIcon}
                              label={`Go to ${labLink.title}`}
                              keywords={["experiments", "practice", "learning", "playground"]}
                              onSelect={() => goTo(labLink)}
                            />
                            <Item
                              icon={SparklesIcon}
                              label="Open Beyond the Code"
                              keywords={["hobbies", "interests", "space", "off duty"]}
                              onSelect={openBeyond}
                            />
                          </Command.Group>

                          <Command.Group heading="Actions" className={GROUP_CLASS}>
                            <Item
                              icon={isDark ? SunIcon : MoonIcon}
                              label="Toggle theme"
                              hint={isDark ? "Switch to light" : "Switch to dark"}
                              keywords={["dark", "light", "mode", "appearance", "color"]}
                              onSelect={toggleTheme}
                            />
                            <Item
                              icon={ClipboardDocumentIcon}
                              label="Copy email to clipboard"
                              keywords={["contact", "address", "mail", "gmail"]}
                              onSelect={copyEmail}
                            />
                            <Item
                              icon={ArrowDownTrayIcon}
                              label="Download resume"
                              keywords={["cv", "pdf", "curriculum"]}
                              onSelect={downloadResume}
                            />
                          </Command.Group>

                          <Command.Group heading="Links" className={GROUP_CLASS}>
                            <Item
                              icon={CodeBracketIcon}
                              label="Open GitHub"
                              external
                              keywords={["code", "repositories", "repos", "source"]}
                              onSelect={() => openExternal(personalInfo.githubUrl)}
                            />
                            <Item
                              icon={UserGroupIcon}
                              label="Open LinkedIn"
                              external
                              keywords={["social", "network", "profile", "connect"]}
                              onSelect={() => openExternal(personalInfo.linkedinUrl)}
                            />
                          </Command.Group>
                        </Command.List>

                        <div
                          className="hidden items-center justify-between gap-3 border-t border-line/10 px-5 py-3 text-xs text-fg-dim [@media(hover:hover)]:flex"
                        >
                          <span className="flex items-center gap-2">
                            <span className={KBD_CLASS}>↑↓</span> to navigate
                          </span>
                          <span className="flex items-center gap-2">
                            <span className={KBD_CLASS}>↵</span> to select
                          </span>
                        </div>
                      </Command>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default CommandPalette;
