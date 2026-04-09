const ProjectFilter = ({ active, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition sm:px-5 ${
        active
          ? "border-brand bg-brand text-slate-950"
          : "border-outline bg-white/5 text-slate-300 hover:border-brand/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default ProjectFilter;
