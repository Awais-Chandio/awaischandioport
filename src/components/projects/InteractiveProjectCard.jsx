"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { cardReveal } from "./animations";

const springConfig = { stiffness: 180, damping: 18, mass: 0.4 };

const InteractiveProjectCard = ({ project, onOpen }) => {
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const previewScreens = project.screenshots?.slice(0, 3) ?? [];
  const hasMultiScreenPreview = previewScreens.length >= 3;
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const light = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.28), transparent 32%)`;

  const handlePointerMove = (event) => {
    if (!cardRef.current || event.pointerType === "touch") {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    mouseX.set(xPercent);
    mouseY.set(yPercent);
    rotateX.set(((y / rect.height) - 0.5) * -7);
    rotateY.set(((x / rect.width) - 0.5) * 7);
  };

  const resetTilt = () => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardReveal}
      style={{ rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={resetTilt}
      whileHover={{ y: -8, scale: 1.012 }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.055] shadow-[0_30px_90px_rgba(2,6,23,0.35)] backdrop-blur-2xl [transform-style:preserve-3d]"
    >
      <div className={`absolute inset-[-1px] rounded-[28px] bg-gradient-to-br ${project.accent} opacity-0 blur-xl transition duration-500 group-hover:opacity-25`} />
      <motion.div
        aria-hidden="true"
        style={{ background: light, opacity: isHovering ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
      />

      <div className="relative z-10 h-64 overflow-hidden border-b border-white/10 bg-slate-950/70 sm:h-72">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_26%),linear-gradient(180deg,transparent,rgba(2,6,23,0.78))]" />

        {hasMultiScreenPreview ? (
          <div className="absolute inset-x-0 bottom-[-2rem] top-12 flex items-end justify-center px-6">
            {previewScreens.map((src, index) => {
              const positions = [
                "z-10 -mr-8 w-[30%] rotate-[-8deg] opacity-85 group-hover:-translate-y-2",
                "z-20 w-[36%] rotate-[1.5deg] group-hover:-translate-y-5",
                "z-10 -ml-8 w-[30%] rotate-[8deg] opacity-85 group-hover:-translate-y-2",
              ];

              return (
                <div
                  key={src}
                  className={`overflow-hidden rounded-[1.35rem] border border-white/[0.18] bg-slate-950 shadow-[0_24px_70px_rgba(2,6,23,0.5)] transition duration-700 ${positions[index]}`}
                >
                  <div className="relative aspect-[9/19.5] w-full">
                    <Image
                      src={src}
                      alt={`${project.title} preview screen ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 28vw, (max-width: 1280px) 15vw, 11vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top opacity-95 transition duration-700 group-hover:scale-[1.07]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl border border-white/[0.14] bg-slate-950/62 shadow-[0_26px_70px_rgba(2,6,23,0.45)]">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`} />
              <div className="absolute inset-x-5 top-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <div className="absolute left-6 right-6 top-16 space-y-3">
                <div className="h-4 w-1/2 rounded-full bg-white/[0.24]" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-2xl bg-white/[0.12]" />
                  <div className="h-16 rounded-2xl bg-white/[0.18]" />
                  <div className="h-16 rounded-2xl bg-white/10" />
                </div>
                <div className="h-24 rounded-2xl bg-white/[0.12]" />
              </div>
              <div className="absolute bottom-5 left-6 text-2xl font-bold text-white">
                {project.placeholder}
              </div>
            </div>
          </div>
        )}

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-slate-950/[0.58] px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl">
            <SparklesIcon className="h-3.5 w-3.5" />
            {project.categoryLabel}
          </span>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.12] px-3 py-1.5 text-xs font-bold text-emerald-100 backdrop-blur-xl">
            {project.status}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="absolute bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-slate-950/70 text-white opacity-0 shadow-soft backdrop-blur-xl transition duration-300 hover:bg-white/[0.12] group-hover:opacity-100"
          aria-label={`Open ${project.title} details`}
        >
          <EyeIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold leading-tight text-white">{project.title}</h3>
          <p className="text-sm leading-7 text-slate-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <ul className="space-y-2 text-sm leading-6 text-slate-300">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${project.accent}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="button-primary magnetic px-4 py-2.5 sm:col-span-1"
          >
            Details
          </button>
          <a
            href={project.gitUrl || "#projects"}
            target={project.gitUrl ? "_blank" : undefined}
            rel={project.gitUrl ? "noreferrer" : undefined}
            aria-disabled={!project.gitUrl}
            className={`button-secondary magnetic px-4 py-2.5 ${!project.gitUrl ? "pointer-events-none opacity-55" : ""}`}
          >
            <CodeBracketIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={project.liveUrl || "#projects"}
            target={project.liveUrl ? "_blank" : undefined}
            rel={project.liveUrl ? "noreferrer" : undefined}
            aria-disabled={!project.liveUrl}
            className={`button-secondary magnetic px-4 py-2.5 ${!project.liveUrl ? "pointer-events-none opacity-55" : ""}`}
          >
            Live
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default InteractiveProjectCard;
