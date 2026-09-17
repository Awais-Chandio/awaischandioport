const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 border-b border-line/10 py-10 first:pt-0 last:border-b-0 sm:py-12 lg:flex-row lg:items-center lg:gap-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-7 w-9 animate-pulse rounded-full bg-fg/10" />
          <div className="h-6 w-2/3 animate-pulse rounded-full bg-fg/10" />
        </div>
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-fg/10" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-fg/10" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-fg/10" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-fg/10" />
        </div>
      </div>
      <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-fg/[0.06] lg:w-[46%]" />
    </div>
  );
};

export default ProjectSkeleton;
