const SectionIntro = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const width = align === "center" ? "max-w-2xl" : "max-w-3xl";

  return (
    <div className={`${alignment} ${width}`}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
        {eyebrow}
      </p>
      <h2 className="section-title text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
};

export default SectionIntro;
