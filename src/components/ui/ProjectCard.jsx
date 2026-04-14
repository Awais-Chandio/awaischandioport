import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const ProjectCard = ({ project }) => {
  return (
    <article className="panel group overflow-hidden transition duration-500 hover:-translate-y-2">
      <div className="relative h-72 overflow-hidden border-b border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.22),rgba(2,6,23,0.88))]" />
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
          <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            Mobile
          </span>
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
            className="button-secondary px-4 py-2.5"
          >
            <CodeBracketIcon className="h-4 w-4" />
            Source
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary px-4 py-2.5"
          >
            Preview
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
