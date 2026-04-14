const ProjectFilter = ({ active, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
        active
          ? "border-sky-300/40 bg-sky-300/[0.12] text-sky-100"
          : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-300/30 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default ProjectFilter;
