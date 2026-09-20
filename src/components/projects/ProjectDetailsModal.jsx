"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
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
    render: (project) => (
      <>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Problem Solved</p>
          <p className="mt-3 text-sm leading-7 text-fg-muted">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Mobile Responsiveness
          </p>
          <p className="mt-3 text-sm leading-7 text-fg-muted">{project.responsiveness}</p>
        </div>
      </>
    ),
  },
  {
    value: "Features",
    className: PANEL_CLASS,
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
    render: (project) => (
      <>
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
      </>
    ),
  },
  {
    value: "Architecture",
    className: PANEL_CLASS,
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

const PlaceholderPreview = ({ project }) => (
  <div className="relative flex aspect-[16/10] min-h-[18rem] items-center justify-center overflow-hidden rounded-[28px] border border-line/10 bg-canvas-soft">
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

const ProjectDetailsModal = ({ project, posts = [], onClose, onCloseAutoFocus }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(tabPanels[0].value);
  const gallery = useMemo(() => project?.screenshots ?? [], [project]);

  if (!project) {
    return null;
  }

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
              >
                <motion.div
                  variants={fadeRise}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative w-full max-w-6xl border border-line/10 bg-canvas-soft shadow-lift sm:max-h-[92vh] sm:overflow-y-auto sm:rounded-[30px]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />

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

                  <div className="grid min-w-0 gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="min-w-0 space-y-5 border-b border-line/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                      {gallery.length ? (
                        <div className="space-y-4">
                          <div className="relative overflow-hidden rounded-[28px] border border-line/10 bg-canvas">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.1]`} />
                            <div className="relative h-[68vh] min-h-[28rem] w-full max-h-[46rem]">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={gallery[activeImage]}
                                  variants={fade}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="absolute inset-0"
                                >
                                  <Image
                                    src={gallery[activeImage]}
                                    alt={`${project.title} screenshot ${activeImage + 1}`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 55vw"
                                    className="object-contain p-2 sm:p-4"
                                  />
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>

                          {gallery.length > 1 ? (
                            <div className="flex items-center justify-between gap-3">
                              <button
                                type="button"
                                onClick={previousImage}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1]"
                                aria-label="Previous screenshot"
                              >
                                <ArrowLeftIcon className="h-4 w-4" />
                              </button>
                              <p className="text-center text-sm font-medium text-fg-muted">
                                {project.screenLabels?.[activeImage] ?? `Screenshot ${activeImage + 1}`}
                              </p>
                              <button
                                type="button"
                                onClick={nextImage}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1]"
                                aria-label="Next screenshot"
                              >
                                <ArrowRightIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ) : null}

                          <div className="rounded-[24px] border border-line/10 bg-fg/[0.025] p-4">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                                All Screenshots
                              </p>
                              <p className="text-xs font-semibold text-fg-dim">
                                {gallery.length} images
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                              {gallery.map((src, index) => (
                                <button
                                  key={`${src}-${index}`}
                                  type="button"
                                  onClick={() => setActiveImage(index)}
                                  className={`relative aspect-[9/19.5] overflow-hidden rounded-2xl border transition ${
                                    index === activeImage
                                      ? "border-accent/70 opacity-100"
                                      : "border-line/10 opacity-[0.58] hover:opacity-100"
                                  }`}
                                  aria-label={`Show ${project.title} screenshot ${index + 1}`}
                                >
                                  <Image
                                    src={src}
                                    alt=""
                                    fill
                                    sizes="6rem"
                                    className="object-contain bg-canvas"
                                  />
                                  <span className="absolute bottom-1 left-1 right-1 truncate rounded-full bg-canvas/80 px-2 py-1 text-[10px] font-semibold text-fg">
                                    {project.screenLabels?.[index] ?? `Screen ${index + 1}`}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <PlaceholderPreview project={project} />
                      )}
                    </div>

                    <div className="min-w-0 space-y-6 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6">
                      <Dialog.Description className="text-sm leading-7 text-fg-muted">
                        {project.description}
                      </Dialog.Description>

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

                      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                        <Tabs.List className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                          {tabPanels.map((panel) => (
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
                          {tabPanels
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

                      <div className="grid gap-3 sm:grid-cols-2">
                        <Button
                          variant="secondary"
                          href={project.gitUrl || undefined}
                          as={!project.gitUrl ? "span" : undefined}
                          className={!project.gitUrl ? "pointer-events-none opacity-50" : ""}
                          aria-disabled={!project.gitUrl}
                        >
                          <CodeBracketIcon className="h-4 w-4" />
                          GitHub
                        </Button>
                        <Button
                          variant="primary"
                          href={project.liveUrl || undefined}
                          as={!project.liveUrl ? "span" : undefined}
                          className={!project.liveUrl ? "pointer-events-none opacity-50" : ""}
                          aria-disabled={!project.liveUrl}
                        >
                          Live Demo
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </Button>
                      </div>

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
