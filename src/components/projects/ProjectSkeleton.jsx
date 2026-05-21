const ProjectSkeleton = () => {
  return (
    <div className="panel min-h-[31rem] overflow-hidden">
      <div className="h-56 animate-pulse bg-white/[0.07]" />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
        <div className="h-7 w-3/4 animate-pulse rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
