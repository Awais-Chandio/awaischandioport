import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const ProjectCard = ({ project }) => {
  return (
    <article className="group panel overflow-hidden">
      <div className="relative h-64 overflow-hidden border-b border-outline/80">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
        <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-canvas/60 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm leading-6 text-muted">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.gitUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-outline bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-brand/70 hover:bg-brand/10"
          >
            <CodeBracketIcon className="h-4 w-4" />
            Source
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand"
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
