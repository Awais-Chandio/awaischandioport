"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import InteractiveProjectCard from "@/components/projects/InteractiveProjectCard";
import ProjectDetailsModal from "@/components/projects/ProjectDetailsModal";
import ProjectSkeleton from "@/components/projects/ProjectSkeleton";
import { sectionReveal, staggerContainer } from "@/components/projects/animations";
import ProjectFilter from "@/components/ui/ProjectFilter";
import { projectCategories, projects } from "@/data/projects";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(20);
  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(103,232,249,0.18), transparent 34%)`;

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.categories.includes(deferredCategory)),
    [deferredCategory]
  );

  const featuredStats = [
    { label: "Featured Builds", value: `${projects.length}` },
    { label: "Mobile + Web", value: "2 Platforms" },
    { label: "Depth", value: "Case Studies" },
  ];

  const handleCategoryChange = (nextCategory) => {
    startTransition(() => {
      setActiveCategory(nextCategory);
    });
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(((event.clientX - rect.left) / rect.width) * 100);
    cursorY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      className="section-spacing relative min-w-0 overflow-hidden py-4"
      id="projects"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: cursorGlow }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 14 }).map((_, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -18, 0],
              opacity: [0.18, 0.5, 0.18],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 5 + (index % 4),
              repeat: Infinity,
              delay: index * 0.28,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-cyan-100/70 shadow-[0_0_18px_rgba(125,211,252,0.76)]"
            style={{
              left: `${(index * 19) % 96}%`,
              top: `${12 + ((index * 17) % 72)}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={sectionReveal}
        initial="visible"
        animate="visible"
        className="space-y-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker mx-auto">Projects</p>
          <h2 className="section-title mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Interactive builds designed to feel polished, useful, and production-minded.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8">
            A premium project showcase with real app flows, architecture notes, screenshots,
            performance thinking, and recruiter-friendly details.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {featuredStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5 text-center shadow-soft backdrop-blur-2xl"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {projectCategories.map((category) => (
            <ProjectFilter
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={handleCategoryChange}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={deferredCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 16, transition: { duration: 0.18 } }}
            className="min-w-0"
          >
            {isPending ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ProjectSkeleton key={index} />
                ))}
              </div>
            ) : visibleProjects.length ? (
              <div className="grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project) => (
                  <InteractiveProjectCard
                    key={project.id}
                    project={project}
                    onOpen={setSelectedProject}
                  />
                ))}
              </div>
            ) : (
              <div className="panel mx-auto max-w-2xl p-8 text-center">
                <p className="text-2xl font-bold text-white">No projects in this filter yet.</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Try another category to explore the full project library.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailsModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
