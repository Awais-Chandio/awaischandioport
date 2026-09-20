import Badge from "./Badge";

const SectionIntro = ({ eyebrow, title, description, headingId, align = "left" }) => {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`${alignment} max-w-3xl`}>
      <Badge variant="accent" size="sm" className={align === "center" ? "mx-auto" : ""}>
        {eyebrow}
      </Badge>
      <h2 id={headingId} className="text-balance mt-5 font-display text-2xl font-medium leading-tight text-fg sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {/* Optional: some sections carry their prose in the body instead, and an
          empty paragraph here would leave a dead gap under the heading. */}
      {description ? (
        <p className="mt-5 text-sm leading-7 text-fg-muted sm:mt-6 sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionIntro;
