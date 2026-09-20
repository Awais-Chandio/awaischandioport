import DraftMarker from "@/components/ui/DraftMarker";

/**
 * QueueLess role-based access, as a plain HTML/CSS flow rather than an SVG: the
 * text stays real text (selectable, translatable, scales with the visitor's font
 * size) and the three role boxes reflow with the dialog instead of shrinking a
 * fixed viewBox on a phone.
 *
 * REVIEW: every label here comes from the resume's QueueLess entry and nothing
 * else. It says exactly this:
 *   - "three-role architecture (Client, Staff, Admin) with role-based navigation
 *      via a custom app_role JWT claim set through a Supabase Custom Access
 *      Token Hook"
 *   - "token-based OPD queue management with per-doctor queue selection,
 *      enforced by Supabase Row-Level Security (RLS) policies across all three
 *      roles"
 * What the diagram does NOT say, because the resume does not: what each role can
 * do, which role sees the queue, or which tables the policies sit on. Arrows mark
 * the documented chain (hook, claim, navigation); the plain line to the RLS box
 * only says the policies apply to all three roles, not that traffic flows there.
 */

const NODE = "rounded-2xl border border-line/10 bg-fg/[0.04] px-4 py-3 text-center";
const ACCENT_NODE = "rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-center";
const LINE = "bg-line/25";

// A short vertical connector, centred under the box above it, with an optional
// label to its right (it wraps rather than overflows on a narrow dialog). Only
// the line is decorative; the label is real content and stays visible to
// screen readers.
const Arrow = ({ label, head = true }) => (
  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-1">
    <span aria-hidden="true" />
    <span aria-hidden="true" className="relative block h-7 w-px">
      <span className={`absolute inset-0 ${LINE}`} />
      {head ? (
        <span className="absolute -bottom-px left-1/2 h-0 w-0 -translate-x-1/2 border-x-[4px] border-t-[6px] border-x-transparent border-t-line/40" />
      ) : null}
    </span>
    {label ? <span className="text-xs font-medium leading-4 text-fg-dim">{label}</span> : <span />}
  </div>
);

const roles = ["Client", "Staff", "Admin"];

const QueueLessRoleDiagram = () => (
  <figure className="mt-5 min-w-0" aria-labelledby="queueless-diagram-caption">
    <figcaption
      id="queueless-diagram-caption"
      className="text-xs font-bold uppercase tracking-[0.22em] text-accent"
    >
      Role-based access
    </figcaption>

    <div className="mt-4 flex flex-col items-stretch">
      <div className={NODE}>
        <p className="text-sm font-semibold text-fg">Supabase Auth</p>
      </div>

      <Arrow label="Custom Access Token Hook" />

      <div className={ACCENT_NODE}>
        <p className="text-sm font-semibold text-accent">JWT</p>
        <p className="mt-0.5 text-xs text-fg-muted">
          custom <span className="font-semibold text-fg">app_role</span> claim
        </p>
      </div>

      <Arrow label="Role-based navigation" />

      <ul className="grid list-none grid-cols-3 gap-2 sm:gap-3">
        {roles.map((role) => (
          <li key={role} className={`${NODE} px-2 sm:px-4`}>
            <p className="text-sm font-semibold text-fg">{role}</p>
          </li>
        ))}
      </ul>

      <Arrow label="Enforced by" head={false} />

      <div className={NODE}>
        <p className="text-sm font-semibold text-fg">Row-Level Security (RLS) policies</p>
        <p className="mt-0.5 text-xs text-fg-muted">Supabase, across all three roles</p>
        <p className="mt-3 rounded-xl border border-line/10 bg-fg/[0.04] px-3 py-2 text-xs text-fg-muted">
          Token-based OPD queue &middot; per-doctor queue selection
        </p>
      </div>
    </div>

    <DraftMarker
      className="mt-4"
      note="Built only from the resume's QueueLess entry. Confirm the flow and labels, and say if roles, tables or the queue belong somewhere else."
    />
  </figure>
);

export default QueueLessRoleDiagram;
