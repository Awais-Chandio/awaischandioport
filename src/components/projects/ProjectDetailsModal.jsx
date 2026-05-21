"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { modalBackdrop, modalPanel } from "./animations";

const tabs = ["Overview", "Features", "Tech Stack", "Challenges", "Architecture"];

const AnimatedCounter = ({ metric }) => {
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => `${Math.round(latest)}${metric.suffix ?? ""}`);

  useEffect(() => {
    const controls = animate(value, metric.value, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [metric.value, value]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <motion.p className="text-2xl font-bold text-white">{rounded}</motion.p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {metric.label}
      </p>
    </div>
  );
};

const PlaceholderPreview = ({ project }) => (
  <div className="relative flex aspect-[16/10] min-h-[18rem] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70">
    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_30%)]" />
    <div className="relative w-[82%] max-w-xl overflow-hidden rounded-3xl border border-white/[0.14] bg-slate-950/65 p-5 shadow-[0_26px_80px_rgba(2,6,23,0.45)]">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-300" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-300" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <div className="h-5 w-2/3 rounded-full bg-white/20" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/[0.14]" />
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="h-4 w-1/2 rounded-full bg-white/20" />
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-xl bg-white/[0.12]" />
            <div className="h-20 rounded-xl bg-white/[0.16]" />
            <div className="h-20 rounded-xl bg-white/[0.12]" />
          </div>
          <div className="mt-4 h-24 rounded-xl bg-white/[0.12]" />
        </div>
      </div>
      <p className="mt-6 text-2xl font-bold text-white">{project.placeholder}</p>
    </div>
  </div>
);

const ProjectDetailsModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeImage, setActiveImage] = useState(0);
  const gallery = useMemo(() => project?.screenshots ?? [], [project]);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (gallery.length ? (current + 1) % gallery.length : current));
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          gallery.length ? (current - 1 + gallery.length) % gallery.length : current
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery.length, onClose, project]);

  useEffect(() => {
    setActiveTab("Overview");
    setActiveImage(0);
  }, [project]);

  if (!project) {
    return null;
  }

  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);
  const previousImage = () =>
    setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);

  const tabContent = {
    Overview: (
      <div className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">Problem Solved</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            Mobile Responsiveness
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{project.responsiveness}</p>
        </div>
      </div>
    ),
    Features: (
      <ul className="space-y-3 text-sm leading-7 text-slate-300">
        {project.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${project.accent}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    ),
    "Tech Stack": (
      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-cyan-200/[0.15] bg-cyan-200/10 px-3 py-1.5 text-sm font-semibold text-cyan-50"
          >
            {item}
          </span>
        ))}
      </div>
    ),
    Challenges: (
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-100">Challenges</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {project.challenges.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
            Performance Optimizations
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {project.optimizations.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    Architecture: (
      <p className="text-sm leading-7 text-slate-300">{project.architecture}</p>
    ),
  };

  return (
    <motion.div
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[90] flex items-end justify-center overflow-y-auto bg-slate-950/72 p-3 backdrop-blur-2xl sm:items-center sm:p-5"
        onMouseDown={onClose}
    >
      <motion.div
          variants={modalPanel}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
          onMouseDown={(event) => event.stopPropagation()}
          className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[30px] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(20,38,66,0.98),rgba(13,25,44,0.98))] shadow-[0_40px_120px_rgba(2,6,23,0.68)]"
      >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />

          <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/72 px-5 py-4 backdrop-blur-2xl sm:px-6">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                {project.categoryLabel} / {project.status}
              </p>
              <h3 className="mt-1 truncate text-xl font-bold text-white sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12]"
              aria-label="Close project details"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5 border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
              {gallery.length ? (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/64">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.14]`} />
                    <div className="relative h-[68vh] min-h-[28rem] w-full max-h-[46rem]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={gallery[activeImage]}
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
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
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12]"
                        aria-label="Previous screenshot"
                      >
                        <ArrowLeftIcon className="h-4 w-4" />
                      </button>
                      <p className="text-center text-sm font-medium text-slate-300">
                        {project.screenLabels?.[activeImage] ?? `Screenshot ${activeImage + 1}`}
                      </p>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12]"
                        aria-label="Next screenshot"
                      >
                        <ArrowRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                        All Screenshots
                      </p>
                      <p className="text-xs font-semibold text-slate-400">
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
                            ? "border-cyan-200/70 opacity-100"
                            : "border-white/10 opacity-[0.58] hover:opacity-100"
                        }`}
                        aria-label={`Show ${project.title} screenshot ${index + 1}`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="6rem"
                          className="object-contain bg-slate-950"
                        />
                        <span className="absolute bottom-1 left-1 right-1 truncate rounded-full bg-slate-950/75 px-2 py-1 text-[10px] font-semibold text-white">
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

            <div className="space-y-6 p-5 sm:p-6">
              <p className="text-sm leading-7 text-slate-300">{project.description}</p>

              <div className="grid grid-cols-3 gap-3">
                {project.stats.map((metric) => (
                  <AnimatedCounter key={metric.label} metric={metric} />
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      activeTab === tab
                        ? "border-cyan-200/45 bg-cyan-200/[0.12] text-cyan-50"
                        : "border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5"
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={project.gitUrl || "#projects"}
                  target={project.gitUrl ? "_blank" : undefined}
                  rel={project.gitUrl ? "noreferrer" : undefined}
                  className={`button-secondary magnetic px-4 py-3 ${!project.gitUrl ? "pointer-events-none opacity-55" : ""}`}
                  aria-disabled={!project.gitUrl}
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl || "#projects"}
                  target={project.liveUrl ? "_blank" : undefined}
                  rel={project.liveUrl ? "noreferrer" : undefined}
                  className={`button-primary magnetic px-4 py-3 ${!project.liveUrl ? "pointer-events-none opacity-55" : ""}`}
                  aria-disabled={!project.liveUrl}
                >
                  Live Demo
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailsModal;
