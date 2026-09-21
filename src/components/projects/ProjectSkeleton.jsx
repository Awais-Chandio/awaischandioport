import Card from "@/components/ui/Card";

/**
 * Placeholder in the shape of a ProjectCard, so switching category does not
 * collapse the grid's height while the new set is filtered in.
 */
const ProjectSkeleton = () => (
  <Card className="overflow-hidden p-0">
    <div className="aspect-[16/10] w-full animate-pulse bg-fg/[0.06]" />
    <div className="space-y-3 p-5 sm:p-6">
      <div className="h-5 w-2/3 animate-pulse rounded-full bg-fg/10" />
      <div className="h-3 w-full animate-pulse rounded-full bg-fg/10" />
      <div className="h-3 w-4/5 animate-pulse rounded-full bg-fg/10" />
      <div className="flex flex-wrap gap-2 pt-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-fg/10" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-fg/10" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-fg/10" />
      </div>
    </div>
  </Card>
);

export default ProjectSkeleton;
