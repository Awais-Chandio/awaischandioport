"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CodeBracketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { fade, fadeRise } from "@/lib/motion";
import { architectureDiagrams } from "@/components/projects/diagrams";
import StatCounter from "@/components/ui/StatCounter";
import Button from "@/components/ui/Button";

const PANEL_CLASS = "mt-4 rounded-[24px] border border-line/10 bg-fg/[0.03] p-5";

// Panels are data rather than five sibling <Tabs.Content> elements: only the
// active one is mounted, so a single AnimatePresence can swap it. Content is
// unchanged from the inline version.
const tabPanels = [
  {
    value: "Overview",
    className: `${PANEL_CLASS} space-y-5`,
    has: (project) => Boolean(project.problem || project.responsiveness),
    render: (project) => (
      <>
        {project.problem ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Problem Solved</p>
            <p className="mt-3 text-sm leading-7 text-fg-muted">{project.problem}</p>
          </div>
        ) : null}
        {project.responsiveness ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Mobile Responsiveness
            </p>
            <p className="mt-3 text-sm leading-7 text-fg-muted">{project.responsiveness}</p>
          </div>
        ) : null}
      </>
    ),
  },
  {
    value: "Features",
    className: PANEL_CLASS,
    has: (project) => Boolean(project.features?.length),
    render: (project) => (
      <ul className="space-y-3 text-sm leading-7 text-fg-muted">
        {project.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${project.accent}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    value: "Tech Stack",
    className: PANEL_CLASS,
    has: (project) => Boolean(project.stack?.length),
    render: (project) => (
      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-accent/15 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    ),
  },
  {
    value: "Challenges",
    className: `${PANEL_CLASS} grid gap-5 lg:grid-cols-2`,
    has: (project) => Boolean(project.challenges?.length || project.optimizations?.length),
    render: (project) => (
      <>
        {project.challenges?.length ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-fg">Challenges</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-fg-muted">
            {project.challenges.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        ) : null}
        {project.optimizations?.length ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Performance Optimizations
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-fg-muted">
            {project.optimizations.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        ) : null}
      </>
    ),
  },
  {
    value: "Architecture",
    className: PANEL_CLASS,
    has: (project) => Boolean(project.architecture),
    render: (project) => {
      const Diagram = architectureDiagrams[project.architectureDiagram];
      return (
        <>
          <p className="text-sm leading-7 text-fg-muted">{project.architecture}</p>
          {Diagram ? <Diagram /> : null}
        </>
      );
    },
  },
];

// No screenshots yet: show the card cover if there is one, else a sketch.
const PlaceholderPreview = ({ project }) =>
  project.image ? (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-[28px] border border-line/10 bg-canvas">
      <Image
        src={project.image}
        alt={`${project.title} cover`}
        fill
        sizes="(max-width: 1024px) 100vw, 56rem"
        quality={90}
        className="object-cover"
      />
    </div>
  ) : (
  <div className="relative flex h-[20rem] items-center sm:h-[26rem] justify-center overflow-hidden rounded-[28px] border border-line/10 bg-canvas-soft">
    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.18]`} />
    <div className="relative w-[82%] max-w-xl overflow-hidden rounded-3xl border border-line/15 bg-canvas/65 p-5 shadow-lift">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-fg/25" />
        <span className="h-3 w-3 rounded-full bg-fg/25" />
        <span className="h-3 w-3 rounded-full bg-fg/25" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <div className="h-5 w-2/3 rounded-full bg-fg/20" />
          <div className="h-20 rounded-2xl bg-fg/10" />
          <div className="h-20 rounded-2xl bg-fg/[0.14]" />
        </div>
        <div className="rounded-2xl bg-fg/10 p-4">
          <div className="h-4 w-1/2 rounded-full bg-fg/20" />
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-xl bg-fg/[0.12]" />
            <div className="h-20 rounded-xl bg-fg/[0.16]" />
            <div className="h-20 rounded-xl bg-fg/[0.12]" />
          </div>
          <div className="mt-4 h-24 rounded-xl bg-fg/[0.12]" />
        </div>
      </div>
      <p className="mt-6 text-2xl font-bold text-fg">{project.placeholder}</p>
    </div>
  </div>
);

// A screenshot is either a plain path (labels from `screenLabels`) or
// `{ src, label, device, tall, group }`; everything below reads the object form.
// Plain paths are phone screens, which is what every project without
// `device` ships.
const toShot = (entry, index, labels) =>
  typeof entry === "string" ? { src: entry, label: labels?.[index] } : entry;

const isWide = (shot) => shot?.device === "desktop" || shot?.device === "tv";

// Desktop and TV screens sit in a light browser window at up to ~1000px wide,
// so their UI text reads at a glance instead of being squeezed into a side
// column. The width cap keeps a 16:10 shot within the viewport height.
const BrowserFrame = ({ shot, alt, title, compact = false }) => (
  <div className={`mx-auto w-full ${compact ? "max-w-[min(100%,88vh)]" : "max-w-[min(100%,98vh)]"} overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.45)] sm:rounded-2xl`}>
    <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#eef0f3] px-3 py-2 sm:px-4 sm:py-2.5">
      <div aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
      </div>
      <p className="mx-auto min-w-0 max-w-md flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[10px] font-medium text-neutral-500 sm:text-xs">
        {title}
      </p>
      <span aria-hidden="true" className="w-[42px] shrink-0 sm:w-[48px]" />
    </div>
    <div
      className={
        shot.tall
          ? `${compact ? "max-h-[min(52vh,34rem)]" : "max-h-[min(64vh,40rem)]"} overflow-y-auto overscroll-contain`
          : undefined
      }
      data-lenis-prevent
    >
      <Image
        src={shot.src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 1200px) 100vw, 1100px"
        quality={90}
        priority
        className="block h-auto w-full"
      />
    </div>
  </div>
);

// Phone screens get a slim device bezel at a fixed, phone-like width. The
// height cap fits a normal 19.5:9 screen exactly; longer pages scroll inside.
const PhoneFrame = ({ shot, alt, compact = false }) => (
  <div className="mx-auto w-fit rounded-[2.6rem] bg-neutral-900 p-2 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.55)] ring-1 ring-black/20">
    <div
      className={`overflow-y-auto overscroll-contain rounded-[2.1rem] bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        compact
          ? "max-h-[min(33.6rem,56vh)] w-[min(15rem,25vh)] sm:max-h-[min(39.2rem,56vh)] sm:w-[min(17.5rem,25vh)]"
          : "max-h-[33.6rem] w-[15rem] sm:max-h-[min(39.2rem,65vh)] sm:w-[min(17.5rem,29vh)]"
      }`}
      data-lenis-prevent
    >
      <Image
        src={shot.src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 640px) 240px, 280px"
        quality={90}
        priority
        className="block h-auto w-full"
      />
    </div>
  </div>
);

// Consecutive screenshots that share a `group` become one labelled section;
// screenshots without one fall into a single unnamed section.
const groupShots = (gallery) =>
  gallery.reduce((groups, item, index) => {
    const name = item.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.name === name) {
      last.items.push({ ...item, index });
    } else {
      groups.push({ name, items: [{ ...item, index }] });
    }
    return groups;
  }, []);

const ProjectDetailsModal = ({ project, posts = [], onClose, onCloseAutoFocus }) => {
  const [activeImage, setActiveImage] = useState(0);
  // Only tabs that have content for this project; a newer project with no
  // challenges or stats yet shows fewer tabs rather than empty panels.
  const panels = useMemo(
    () => (project ? tabPanels.filter((panel) => panel.has(project)) : []),
    [project]
  );
  const [activeTab, setActiveTab] = useState(panels[0]?.value);
  const [fullSize, setFullSize] = useState(false);
  const gallery = useMemo(
    () => (project?.screenshots ?? []).map((entry, index) => toShot(entry, index, project.screenLabels)),
    [project]
  );

  const groups = useMemo(() => groupShots(gallery), [gallery]);
  const stripRef = useRef(null);

  // Keep the active screen visible in the full-size viewer's thumbnail strip.
  useEffect(() => {
    if (!fullSize) return;
    stripRef.current
      ?.querySelector("[data-active]")
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeImage, fullSize]);

  if (!project) {
    return null;
  }

  const shot = gallery[activeImage];
  const shotLabel = (index) => gallery[index]?.label ?? `Screenshot ${index + 1}`;

  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);
  const previousImage = () =>
    setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setActiveImage((current) => (gallery.length ? (current + 1) % gallery.length : current));
    }
    if (event.key === "ArrowLeft") {
      setActiveImage((current) =>
        gallery.length ? (current - 1 + gallery.length) % gallery.length : current
      );
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay asChild forceMount>
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Lenis listens for wheel events on the whole window and scrolls the
            // page itself, so without this the mouse wheel moved the page behind
            // the dialog and left the dialog's own scroll area untouched. The
            // attribute makes Lenis ignore every wheel event that starts inside
            // this overlay, so the browser scrolls the dialog natively.
            data-lenis-prevent
            className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-canvas/80 backdrop-blur-2xl sm:p-5"
          >
            {/* Full-bleed sheet on phones (the overlay itself scrolls), centred
                panel from sm up (the panel scrolls inside a capped height). */}
            <div className="flex min-h-full items-stretch justify-center sm:items-center">
              <Dialog.Content
                asChild
                forceMount
                onKeyDown={handleKeyDown}
                onCloseAutoFocus={onCloseAutoFocus}
                // Escape backs out of the full-size view before it closes the case study.
                onEscapeKeyDown={(event) => {
                  if (fullSize) {
                    event.preventDefault();
                    setFullSize(false);
                  }
                }}
              >
                <motion.div
                  variants={fadeRise}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative w-full max-w-6xl border border-line/10 bg-canvas-soft shadow-lift sm:max-h-[92vh] sm:overflow-y-auto sm:rounded-[30px]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />

                  {fullSize && shot ? (
                    // A smaller modal over the case study, not a full-screen
                    // takeover: the page stays visible behind a light tint.
                    // Inside Dialog.Content on purpose, so focus stays trapped and
                    // clicks here don't count as "outside" the case study. `fixed`
                    // still covers the screen because the panel ends its entrance
                    // animation with no transform.
                    <div
                      role="group"
                      aria-label={`Screenshot: ${shotLabel(activeImage)}`}
                      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-3 backdrop-blur-[3px] sm:p-6"
                      onClick={(event) => event.target === event.currentTarget && setFullSize(false)}
                    >
                      <motion.div
                        variants={fadeRise}
                        initial="hidden"
                        animate="visible"
                        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-line/10 bg-canvas-soft shadow-lift"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-line/10 px-5 py-3 sm:px-6">
                          <div className="min-w-0">
                            {shot.group ? (
                              <p className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                                {shot.group}
                              </p>
                            ) : null}
                            <p className="truncate text-sm font-semibold text-fg sm:text-base">
                              {shotLabel(activeImage)}
                              <span className="ml-2 text-xs font-medium text-fg-dim sm:text-sm">
                                {activeImage + 1} / {gallery.length}
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            autoFocus
                            onClick={() => setFullSize(false)}
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1]"
                            aria-label="Close screenshot"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-canvas">
                          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.08]`} />
                          <div className="relative flex items-center justify-center px-12 py-5 sm:px-20 sm:py-6">
                            <motion.div
                              key={shot.src}
                              variants={fade}
                              initial="hidden"
                              animate="visible"
                              className="w-full"
                            >
                              {isWide(shot) ? (
                                <BrowserFrame
                                  compact
                                  shot={shot}
                                  alt={`${project.title}: ${shotLabel(activeImage)}`}
                                  title={shotLabel(activeImage)}
                                />
                              ) : (
                                <PhoneFrame
                                  compact
                                  shot={shot}
                                  alt={`${project.title}: ${shotLabel(activeImage)}`}
                                />
                              )}
                            </motion.div>
                          </div>

                          {gallery.length > 1 ? (
                            <>
                              <button
                                type="button"
                                onClick={previousImage}
                                className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line/15 bg-canvas/90 text-fg shadow-lift backdrop-blur-xl transition hover:border-accent/40 hover:text-accent sm:left-4 sm:h-11 sm:w-11"
                                aria-label="Previous screenshot"
                              >
                                <ArrowLeftIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line/15 bg-canvas/90 text-fg shadow-lift backdrop-blur-xl transition hover:border-accent/40 hover:text-accent sm:right-4 sm:h-11 sm:w-11"
                                aria-label="Next screenshot"
                              >
                                <ArrowRightIcon className="h-5 w-5" />
                              </button>
                            </>
                          ) : null}
                        </div>

                        {gallery.length > 1 ? (
                          // Every screen stays one click away without closing this.
                          <div
                            ref={stripRef}
                            className="flex shrink-0 gap-2 overflow-x-auto overscroll-contain border-t border-line/10 px-5 py-3 [scrollbar-width:thin] sm:px-6"
                          >
                            {gallery.map((item, index) => (
                              <button
                                key={`${item.src}-strip-${index}`}
                                type="button"
                                data-active={index === activeImage || undefined}
                                onClick={() => setActiveImage(index)}
                                className={`relative h-12 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition sm:h-14 ${
                                  isWide(item) ? "aspect-[16/10]" : "aspect-[9/19.5]"
                                } ${
                                  index === activeImage
                                    ? "border-accent opacity-100"
                                    : "border-line/10 opacity-70 hover:opacity-100"
                                }`}
                                aria-label={`Show ${shotLabel(index)}`}
                                aria-current={index === activeImage ? "true" : undefined}
                              >
                                <Image src={item.src} alt="" fill sizes="6rem" className="object-cover object-top" />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </motion.div>
                    </div>
                  ) : null}

                  <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line/10 bg-canvas-soft/95 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-2xl sm:px-6 sm:pt-4">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        {project.categoryLabel} / {project.status}
                      </p>
                      <Dialog.Title className="mt-1 truncate text-xl font-bold text-fg sm:text-2xl">
                        {project.title}
                      </Dialog.Title>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1]"
                        aria-label="Close project details"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <section
                    aria-label="Screenshots"
                    className="min-w-0 space-y-5 border-b border-line/10 p-4 sm:p-6"
                  >
                    {gallery.length ? (
                      <>
                        <div className="relative overflow-hidden rounded-[28px] border border-line/10 bg-canvas">
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.08]`} />
                          <div className="relative flex items-center justify-center px-3 pb-6 pt-14 sm:min-h-[min(44rem,78vh)] sm:px-16 sm:pb-10 sm:pt-16">
                            {/* Keyed per image: fades in and a tall page always opens at its top. */}
                            <motion.div
                              key={shot.src}
                              variants={fade}
                              initial="hidden"
                              animate="visible"
                              className="w-full"
                            >
                              {isWide(shot) ? (
                                <BrowserFrame
                                  shot={shot}
                                  alt={`${project.title}: ${shotLabel(activeImage)}`}
                                  title={shotLabel(activeImage)}
                                />
                              ) : (
                                <PhoneFrame
                                  shot={shot}
                                  alt={`${project.title}: ${shotLabel(activeImage)}`}
                                />
                              )}
                            </motion.div>

                            {shot.group ? (
                              <span className="absolute left-3 top-3 z-10 max-w-[60%] truncate rounded-full border border-line/15 bg-canvas/90 px-3 py-2 text-xs font-semibold text-fg-muted backdrop-blur-xl sm:left-4 sm:top-4">
                                {shot.group}
                              </span>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => setFullSize(true)}
                              className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-line/15 bg-canvas/90 px-3 py-2 text-xs font-semibold text-fg backdrop-blur-xl transition hover:border-accent/40 hover:text-accent sm:right-4 sm:top-4"
                            >
                              <ArrowsPointingOutIcon aria-hidden="true" className="h-4 w-4" />
                              Full size
                            </button>

                            {gallery.length > 1 ? (
                              <>
                                <button
                                  type="button"
                                  onClick={previousImage}
                                  className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/15 bg-canvas/90 text-fg shadow-lift backdrop-blur-xl transition hover:border-accent/40 hover:text-accent sm:inline-flex"
                                  aria-label="Previous screenshot"
                                >
                                  <ArrowLeftIcon className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={nextImage}
                                  className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/15 bg-canvas/90 text-fg shadow-lift backdrop-blur-xl transition hover:border-accent/40 hover:text-accent sm:inline-flex"
                                  aria-label="Next screenshot"
                                >
                                  <ArrowRightIcon className="h-5 w-5" />
                                </button>
                              </>
                            ) : null}

                            {shot.tall ? (
                              <span className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-canvas/90 px-3 py-1 text-[11px] font-semibold text-fg-muted backdrop-blur-xl sm:bottom-3">
                                Scroll inside the screen to see the full page
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          {gallery.length > 1 ? (
                            <button
                              type="button"
                              onClick={previousImage}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1] sm:hidden"
                              aria-label="Previous screenshot"
                            >
                              <ArrowLeftIcon className="h-4 w-4" />
                            </button>
                          ) : null}
                          <p className="min-w-0 flex-1 text-center text-sm font-semibold text-fg sm:text-base" aria-live="polite">
                            {shotLabel(activeImage)}
                            {gallery.length > 1 ? (
                              <span className="ml-2 text-xs font-medium text-fg-dim sm:text-sm">
                                {activeImage + 1} / {gallery.length}
                              </span>
                            ) : null}
                          </p>
                          {gallery.length > 1 ? (
                            <button
                              type="button"
                              onClick={nextImage}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1] sm:hidden"
                              aria-label="Next screenshot"
                            >
                              <ArrowRightIcon className="h-4 w-4" />
                            </button>
                          ) : null}
                        </div>

                        {gallery.length > 1 ? (
                          <div className="space-y-6 rounded-[24px] border border-line/10 bg-fg/[0.025] p-4 sm:p-5">
                            {groups.map((group) => {
                              const wideGroup = group.items.every(isWide);
                              return (
                                <div key={group.name ?? "all"}>
                                  <div className="mb-3 flex items-baseline justify-between gap-3">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                      {group.name ?? "All screenshots"}
                                    </p>
                                    <p className="shrink-0 text-xs font-semibold text-fg-dim">
                                      {group.items.length} {group.items.length === 1 ? "screen" : "screens"}
                                    </p>
                                  </div>
                                  <div
                                    className={`grid gap-x-3 gap-y-4 ${
                                      wideGroup
                                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                                        : "grid-cols-3 sm:grid-cols-5 lg:grid-cols-8"
                                    }`}
                                  >
                                    {group.items.map((item) => {
                                      const active = item.index === activeImage;
                                      const label = shotLabel(item.index);
                                      return (
                                        <button
                                          key={`${item.src}-${item.index}`}
                                          type="button"
                                          onClick={() => {
                                            // Open right here instead of making the
                                            // reader scroll back up to the viewer.
                                            setActiveImage(item.index);
                                            setFullSize(true);
                                          }}
                                          className="group/thumb min-w-0 self-start text-left"
                                          aria-label={`Show ${label}`}
                                          aria-current={active ? "true" : undefined}
                                        >
                                          <span
                                            className={`relative block overflow-hidden rounded-xl border bg-white transition duration-300 ${
                                              isWide(item) ? "aspect-[16/10]" : "aspect-[9/19.5]"
                                            } ${
                                              active
                                                ? "border-accent shadow-lift ring-2 ring-accent/35"
                                                : "border-line/15 group-hover/thumb:-translate-y-0.5 group-hover/thumb:border-accent/40 group-hover/thumb:shadow-lift"
                                            }`}
                                          >
                                            <Image
                                              src={item.src}
                                              alt=""
                                              fill
                                              sizes={isWide(item) ? "(max-width: 640px) 50vw, 12rem" : "(max-width: 640px) 33vw, 8rem"}
                                              className="object-cover object-top"
                                            />
                                          </span>
                                          <span
                                            className={`mt-2 line-clamp-2 block text-[11px] leading-snug sm:text-xs ${
                                              active ? "font-semibold text-accent" : "font-medium text-fg-muted group-hover/thumb:text-fg"
                                            }`}
                                          >
                                            {label}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <PlaceholderPreview project={project} />
                    )}
                  </section>

                  <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
                    <div className="min-w-0 space-y-6 border-b border-line/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                      <Dialog.Description className="text-sm leading-7 text-fg-muted">
                        {project.description}
                      </Dialog.Description>

                      {project.stats?.length ? (
                      <div className="grid grid-cols-3 gap-3">
                        {project.stats.map((metric) => (
                          <div key={metric.label} className="rounded-2xl border border-line/10 bg-fg/[0.04] p-4">
                            <p className="text-xl font-bold text-fg sm:text-2xl">
                              <StatCounter value={metric.value} suffix={metric.suffix} />
                            </p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-fg-dim">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      ) : null}

                      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                        <Tabs.List className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                          {panels.map((panel) => (
                            <Tabs.Trigger
                              key={panel.value}
                              value={panel.value}
                              className="shrink-0 rounded-full border border-line/10 bg-fg/[0.04] px-4 py-2 text-xs font-bold text-fg-muted transition hover:bg-fg/[0.08] hover:text-fg data-[state=active]:border-accent/45 data-[state=active]:bg-accent/[0.12] data-[state=active]:text-accent"
                            >
                              {panel.value}
                            </Tabs.Trigger>
                          ))}
                        </Tabs.List>

                        {/* `initial={false}` keeps the first panel from animating
                            as the dialog itself is still arriving; only a tab
                            change animates. `mode="wait"` avoids overlapping two
                            panels of different heights. */}
                        <AnimatePresence mode="wait" initial={false}>
                          {panels
                            .filter((panel) => panel.value === activeTab)
                            .map((panel) => (
                              <Tabs.Content key={panel.value} value={panel.value} asChild forceMount>
                                <motion.div
                                  variants={fadeRise}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className={panel.className}
                                >
                                  {panel.render(project)}
                                </motion.div>
                              </Tabs.Content>
                            ))}
                        </AnimatePresence>
                      </Tabs.Root>
                    </div>

                    <div className="min-w-0 space-y-6 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6">

                      {/* Deeper reading, only when a post covering this build is
                          actually published. Drafts never surface here. */}
                      {posts.length ? (
                        <div className="rounded-[24px] border border-line/10 bg-fg/[0.03] p-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim">
                            Read more about this build
                          </p>
                          <ul className="mt-3 flex flex-col gap-2">
                            {posts.map((post) => (
                              <li key={post.slug}>
                                <a
                                  href={`/writing/${post.slug}`}
                                  className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-fg transition-colors duration-300 hover:text-accent"
                                >
                                  <BookOpenIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                                  <span className="min-w-0">{post.title}</span>
                                  <span className="shrink-0 text-xs text-fg-dim">
                                    {post.readingTime} min
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {/* Only links that exist; a disabled, faded button reads as broken. */}
                      {project.gitUrl || project.liveUrl ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                          {project.gitUrl ? (
                            <Button variant="secondary" href={project.gitUrl}>
                              <CodeBracketIcon className="h-4 w-4" />
                              GitHub
                            </Button>
                          ) : null}
                          {project.liveUrl ? (
                            <Button variant="primary" href={project.liveUrl}>
                              {project.liveLabel || "Live Demo"}
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </Button>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="rounded-[24px] border border-accent/20 bg-accent/[0.06] p-5">
                        <p className="text-sm leading-7 text-fg-muted">
                          Want something like this built?
                        </p>
                        <Button href="/work-with-me" variant="primary" size="sm" className="mt-3">
                          Work With Me
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </motion.div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectDetailsModal;
