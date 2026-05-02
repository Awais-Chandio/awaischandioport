"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilter from "@/components/ui/ProjectFilter";
import SectionIntro from "@/components/ui/SectionIntro";
import { projectCategories, projects } from "@/data/portfolio";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);

  const visibleProjects = projects.filter((project) =>
    project.categories.includes(deferredCategory)
  );

  const handleCategoryChange = (nextCategory) => {
    startTransition(() => {
      setActiveCategory(nextCategory);
    });
  };

  return (
    <section className="section-spacing min-w-0 space-y-10 overflow-hidden" id="projects">
      <SectionIntro
        eyebrow="Projects"
        title="Selected mobile projects with clear purpose, stack, and features."
        description="A short list of mobile projects that show practical app screens, Flutter experience, Firebase usage, and connected feature work."
        align="center"
      />

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {projectCategories.map((category) => (
          <ProjectFilter
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={handleCategoryChange}
          />
        ))}
      </div>

      <div className={`grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3 ${isPending ? "opacity-80" : ""}`}>
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
