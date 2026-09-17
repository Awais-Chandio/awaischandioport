import Badge from "./Badge";

const SectionIntro = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`${alignment} max-w-3xl`}>
      <Badge variant="accent" size="sm" className={align === "center" ? "mx-auto" : ""}>
        {eyebrow}
      </Badge>
      <h2 className="text-balance mt-4 font-display text-2xl font-medium leading-tight text-fg sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-fg-muted sm:mt-5 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
};

export default SectionIntro;
