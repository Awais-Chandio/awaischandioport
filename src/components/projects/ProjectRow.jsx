import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const ProjectRow = ({ project, index, onOpen }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      data-project-row
      className="border-b border-line/10 py-10 first:pt-0 last:border-b-0 sm:py-12"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View ${project.title} case study`}
        className="group grid w-full grid-cols-1 items-center gap-6 rounded-2xl text-left lg:grid-cols-12 lg:gap-8"
      >
        <div className="min-w-0 lg:col-span-5">
          <div className="flex items-baseline gap-4">
            <span className="shrink-0 font-display text-2xl text-fg-dim/50 tabular-nums sm:text-3xl">
              {number}
            </span>
            <h3 className="font-display text-xl font-medium text-fg transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent sm:text-2xl lg:text-3xl">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 pl-[2.75rem] text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim sm:pl-[3.25rem]">
            {project.categoryLabel} &middot; {project.status}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 pl-[2.75rem] sm:pl-[3.25rem]">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-line/10 bg-fg/[0.03] px-3 py-1 text-[11px] font-medium text-fg-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line/10 bg-canvas-soft lg:col-span-6">
          <div className="relative aspect-[16/10] w-full">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent} opacity-[0.16] transition-transform duration-700 ease-premium group-hover:scale-[1.04] group-focus-visible:scale-[1.04]`}
              >
                <span className="font-display text-2xl font-medium text-fg/70 sm:text-3xl">
                  {project.placeholder}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:col-span-1 lg:justify-end">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-dim lg:hidden">
            View case study
          </span>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/10 text-fg-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-fg group-focus-visible:border-accent/40 group-focus-visible:bg-accent group-focus-visible:text-accent-fg lg:h-14 lg:w-14"
          >
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 lg:h-5 lg:w-5" />
          </span>
        </div>
      </button>
    </article>
  );
};

export default ProjectRow;
