import Badge from "./Badge";

/**
 * A "needs the author's review" flag for draft copy. It renders only outside
 * production, so `npm run dev` shows exactly which lines still need a decision
 * while a visitor never sees a review note. The note says what to confirm.
 */
const DraftMarker = ({ note, className = "" }) => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span className={`flex min-w-0 flex-wrap items-start gap-2 ${className}`}>
      <Badge variant="outline" size="sm" className="shrink-0 border-dashed">
        Draft
      </Badge>
      {note ? <span className="min-w-0 text-xs leading-6 text-fg-dim">{note}</span> : null}
    </span>
  );
};

export default DraftMarker;
