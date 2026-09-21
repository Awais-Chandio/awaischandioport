import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";

/**
 * Scan-level view of one project: preview, title, a short stack sample, and a
 * clamped line of the same description the case study opens with. Everything
 * else — problem, features, architecture, links — lives in the modal, so the
 * grid stays readable at a glance instead of scrolling for screens.
 */
const ProjectCard = ({ project, onOpen }) => (
  <Card
    data-project-card
    className="group relative flex min-w-0 flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-accent/30 focus-within:border-accent/30"
  >
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-soft">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 46vw, 24rem"
          className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent} opacity-[0.16] transition-transform duration-700 ease-premium group-hover:scale-[1.04] group-focus-within:scale-[1.04]`}
        >
          <span className="font-display text-2xl font-medium text-fg/70 sm:text-3xl">
            {project.placeholder}
          </span>
        </div>
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="line-clamp-2 min-h-[2.75em] min-w-0 font-display text-base font-medium leading-snug text-fg transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent sm:text-lg">
          {/* Stretched trigger: the button stays valid phrasing content while its
              ::before overlay makes the whole card clickable. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="rounded-sm text-left before:absolute before:inset-0 before:z-10 before:rounded-[28px] before:content-['']"
          >
            {project.title}
            <span className="sr-only"> — view case study</span>
          </button>
        </h3>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/10 text-fg-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-fg group-focus-within:border-accent/40 group-focus-within:bg-accent group-focus-within:text-accent-fg"
        >
          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5" />
        </span>
      </div>

      <p className="line-clamp-2 text-sm leading-6 text-fg-muted">{project.description}</p>

      {/* One row of tags, fixed height: a tag that would wrap drops out of view
          instead of making this card taller than its neighbours. */}
      <div className="mt-auto flex h-7 flex-wrap gap-2 overflow-hidden">
        {project.stack.slice(0, 3).map((item) => (
          <span
            key={item}
            className="rounded-full border border-line/10 bg-fg/[0.03] px-3 py-1 text-[11px] font-medium text-fg-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </Card>
);

export default ProjectCard;
