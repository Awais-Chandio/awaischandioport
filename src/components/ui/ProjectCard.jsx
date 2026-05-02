"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const ProjectCard = ({ project }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setTilt({
      rotateX: ((y / rect.height) - 0.5) * -3.5,
      rotateY: ((x / rect.width) - 0.5) * 3.5,
    });
  };

  return (
    <motion.article
      style={tilt}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="panel group flex h-full min-w-0 flex-col overflow-hidden [transform-style:preserve-3d]"
    >
      <div className="relative h-52 overflow-hidden border-b border-white/10 sm:h-60">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.18),rgba(2,6,23,0.9))]" />
        <div className="absolute inset-0 translate-y-full bg-[linear-gradient(135deg,rgba(34,211,238,0.24),rgba(20,184,166,0.14),rgba(168,85,247,0.16))] opacity-0 backdrop-blur-[2px] transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
        <div className="absolute left-5 right-5 top-5 flex justify-end">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Project
          </span>
        </div>

        <div className="absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-soft backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <EyeIcon className="h-4 w-4 text-cyan-200" />
          Project preview
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-5 p-5 sm:p-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-slate-400">{project.description}</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Tech Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {project.features?.length ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Key Features
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {(project.gitUrl || project.liveUrl) ? (
          <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            {project.gitUrl ? (
              <a
                href={project.gitUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary magnetic w-full px-4 py-2.5 sm:w-auto"
              >
                <CodeBracketIcon className="h-4 w-4" />
                GitHub
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button-primary magnetic w-full px-4 py-2.5 sm:w-auto"
              >
                Live
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
