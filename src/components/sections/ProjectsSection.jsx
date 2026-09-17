"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectRow from "@/components/projects/ProjectRow";
import ProjectDetailsModal from "@/components/projects/ProjectDetailsModal";
import ProjectSkeleton from "@/components/projects/ProjectSkeleton";
import ProjectFilter from "@/components/ui/ProjectFilter";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { projectCategories, projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);
  const listRef = useRef(null);
  const hasRevealedRef = useRef(false);

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.categories.includes(deferredCategory)),
    [deferredCategory]
  );

  const handleCategoryChange = (nextCategory) => {
    startTransition(() => {
      setActiveCategory(nextCategory);
    });
  };

  // Scroll reveal: rows fade/slide in the first time the list enters the viewport.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = gsap.utils.toArray("[data-project-row]", listRef.current);
      if (!rows.length) return undefined;

      if (reduceMotion) {
        gsap.set(rows, { opacity: 1, y: 0 });
        hasRevealedRef.current = true;
        return undefined;
      }

      gsap.set(rows, { opacity: 0, y: 36 });

      const triggers = ScrollTrigger.batch(rows, {
        start: "top 88%",
        once: true,
        onEnter: (batchTargets) =>
          gsap.to(batchTargets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }),
      });
      hasRevealedRef.current = true;

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope: listRef, dependencies: [] }
  );

  // Filter changes: the section is already in view, so a direct stagger-in is enough (no scroll trigger needed).
  useEffect(() => {
    if (!hasRevealedRef.current || isPending) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = gsap.utils.toArray("[data-project-row]", listRef.current);
    if (!rows.length || reduceMotion) return;

    gsap.fromTo(
      rows,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }
    );
  }, [visibleProjects, isPending]);

  return (
    <section className="section-spacing relative min-w-0" id="projects">
      <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
        <Badge variant="accent" className="mx-auto lg:mx-0">
          Projects
        </Badge>
        <h2 className="text-balance mt-5 font-display text-3xl font-medium leading-tight text-fg sm:text-5xl">
          Selected work
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-fg-muted sm:text-lg sm:leading-8 lg:mx-0">
          {projects.length} builds spanning mobile products, backend integrations, and
          product-minded interfaces.
        </p>
      </div>

      <div className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:mt-12 sm:flex-wrap sm:justify-center sm:overflow-visible lg:justify-start">
        {projectCategories.map((category) => (
          <ProjectFilter
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={handleCategoryChange}
          />
        ))}
      </div>

      <div ref={listRef} className="mt-4 min-w-0 sm:mt-6">
        {isPending ? (
          Array.from({ length: 3 }).map((_, index) => <ProjectSkeleton key={index} />)
        ) : visibleProjects.length ? (
          visibleProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))
        ) : (
          <Card className="mx-auto max-w-2xl p-8 text-center">
            <p className="text-2xl font-bold text-fg">No projects in this filter yet.</p>
            <p className="mt-3 text-sm leading-7 text-fg-muted">
              Try another category to explore the full project library.
            </p>
          </Card>
        )}
      </div>

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
