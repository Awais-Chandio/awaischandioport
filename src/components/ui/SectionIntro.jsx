const SectionIntro = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const width = align === "center" ? "max-w-3xl" : "max-w-3xl";

  return (
    <div className={`${alignment} ${width}`}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-200">
        {eyebrow}
      </p>
      <h2 className="section-title text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
};

export default SectionIntro;
