import DraftMarker from "@/components/ui/DraftMarker";
import { interests } from "@/data/interests";

/**
 * The same four interests as plain cards. It is what a visitor sees when they
 * ask for reduced motion (or their browser cannot give us WebGL), so it carries
 * the full content of the orb scene and needs nothing to run.
 */
const InterestList = () => (
  <ul className="grid gap-3 sm:grid-cols-2">
    {interests.map((interest) => (
      <li
        key={interest.id}
        className="rounded-[24px] border border-line/10 bg-fg/[0.03] p-5"
      >
        <span aria-hidden="true" className="block h-2 w-2 rounded-full bg-accent" />
        <h3 className="mt-4 font-display text-lg font-medium text-fg">{interest.label}</h3>
        <p className="mt-2 text-sm leading-7 text-fg-muted">{interest.caption}</p>
        {interest.status === "placeholder" ? (
          <DraftMarker note={interest.review} className="mt-3" />
        ) : null}
      </li>
    ))}
  </ul>
);

export default InterestList;
