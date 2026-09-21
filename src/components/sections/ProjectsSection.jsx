"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetailsModal from "@/components/projects/ProjectDetailsModal";
import ProjectSkeleton from "@/components/projects/ProjectSkeleton";
import ProjectFilter from "@/components/ui/ProjectFilter";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { prefersReducedMotion, replayReveal } from "@/lib/gsapMotion";
import { projectCategories, projects } from "@/data/projects";

const ProjectsSection = ({ postsByProject = {} }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);
  const listRef = useRef(null);
  // The scroll reveal below runs in a layout effect, so the cards are already hidden by
  // the time the filter effect runs on mount. Skipping that first pass keeps the
  // scroll reveal in charge of first paint instead of being cancelled by it.
  const isFirstFilterPassRef = useRef(true);
  // Radix restores focus to its trigger when `open` flips to false, but the
  // dialog is unmounted by AnimatePresence instead, so that never runs. Keep
  // the opening element and send focus back manually.
  const triggerRef = useRef(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.categories.includes(deferredCategory)),
    [deferredCategory]
  );

  // Deep link: /?project=<id> opens that case study directly, so Services and
  // Writing can point at a specific project instead of the whole section.
  // Read from location on mount rather than useSearchParams(), which would opt
  // this statically rendered page into dynamic rendering.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("project");
    if (!requested) return;

    const match = projects.find((project) => project.id === requested);
    if (match) setSelectedProject(match);
  }, []);

  const openProject = (project) => {
    triggerRef.current = document.activeElement;
    setSelectedProject(project);
  };

  // Radix's own restore targets <Dialog.Trigger>, which this dialog does not
  // use, so closing would otherwise drop focus to <body> — a keyboard visitor
  // would land back at the top of the document. Deep-linked opens have no
  // trigger, and a card can be filtered out while the dialog is up; in both
  // cases there is nothing to return to, so Radix's default is left alone.
  const restoreTriggerFocus = (event) => {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (!trigger?.isConnected) return;

    event.preventDefault();
    trigger.focus();
  };

  const closeProject = () => {
    setSelectedProject(null);

    // Drop the param so a refresh or a shared URL does not reopen the modal.
    if (new URLSearchParams(window.location.search).has("project")) {
      window.history.replaceState(null, "", `${window.location.pathname}#projects`);
    }
  };

  const handleCategoryChange = (nextCategory) => {
    startTransition(() => {
      setActiveCategory(nextCategory);
    });
  };

  // Scroll reveal: cards rise in the first time the list enters the viewport.
  useScrollReveal(listRef, "[data-project-card]", { batch: true });

  // Filter changes: the section is already in view, so the same reveal replays
  // directly (no scroll trigger needed).
  useEffect(() => {
    if (isPending) return;
    if (isFirstFilterPassRef.current) {
      isFirstFilterPassRef.current = false;
      return;
    }

    const rows = gsap.utils.toArray("[data-project-card]", listRef.current);
    if (!rows.length || prefersReducedMotion()) return;

    replayReveal(rows);
  }, [visibleProjects, isPending]);

  return (
    <section className="section-spacing relative min-w-0" id="projects">
      <SectionIntro
        eyebrow="Projects"
        title="Selected work"
        description={`${projects.length} builds spanning mobile products, backend integrations, and product-minded interfaces.`}
      />

      <div className="mt-block flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        {projectCategories.map((category) => (
          <ProjectFilter
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={handleCategoryChange}
          />
        ))}
      </div>

      {/* Three columns on desktop, two on tablet, one below: compact enough that
          the whole shelf can be scanned without scrolling past it. The case
          study itself opens in a dialog. */}
      <div
        ref={listRef}
        className="mt-8 grid min-w-0 gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {isPending ? (
          Array.from({ length: 6 }).map((_, index) => <ProjectSkeleton key={index} />)
        ) : visibleProjects.length ? (
          visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} />
          ))
        ) : (
          <Card className="p-10 text-center md:col-span-full">
            <p className="text-xl font-bold text-fg sm:text-2xl">No projects in this filter yet.</p>
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
            posts={postsByProject[selectedProject.id] || []}
            onClose={closeProject}
            onCloseAutoFocus={restoreTriggerFocus}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
