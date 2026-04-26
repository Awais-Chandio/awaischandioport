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
      className="panel group min-w-0 overflow-hidden [transform-style:preserve-3d]"
    >
      <div className="relative h-60 overflow-hidden border-b border-white/10 sm:h-72">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.18),rgba(2,6,23,0.9))]" />
        <div className="absolute inset-0 translate-y-full bg-[linear-gradient(135deg,rgba(34,211,238,0.24),rgba(20,184,166,0.14),rgba(168,85,247,0.16))] opacity-0 backdrop-blur-[2px] transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
        <div className="absolute left-5 right-5 top-5 flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Mobile
          </span>
        </div>

        <div className="absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-soft backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <EyeIcon className="h-4 w-4 text-cyan-200" />
          Animated preview
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm leading-7 text-slate-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.gitUrl}
            target="_blank"
            rel="noreferrer"
            className="button-secondary magnetic px-4 py-2.5"
          >
            <CodeBracketIcon className="h-4 w-4" />
            Source
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary magnetic px-4 py-2.5"
          >
            Preview
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
