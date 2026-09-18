const ProjectFilter = ({ active, label, onClick }) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onClick(label)}
      className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
        active
          ? "border-accent/40 bg-accent/[0.12] text-accent"
          : "border-line/10 bg-fg/[0.03] text-fg-muted hover:border-accent/30 hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
};

export default ProjectFilter;
