import DraftMarker from "@/components/ui/DraftMarker";

/**
 * MediQ role-based access, as a plain HTML/CSS flow rather than an SVG: the
 * text stays real text (selectable, translatable, scales with the visitor's font
 * size) and the role boxes reflow with the dialog instead of shrinking a fixed
 * viewBox on a phone.
 *
 * Labels come from the app's Supabase migrations (QueueLess repo):
 *   - org_members.role is CHECK (role IN ('owner', 'receptionist', 'doctor'))
 *   - RLS policies call private.has_org_role(org_id, ARRAY[...]) per table
 *   - QR patients join from the public page (/c/<slug>) without signing in,
 *     through RPCs (issue_public_token, get_public_center), not table access
 * Arrows mark the chain from sign-in to the clinic role; the plain line to the
 * RLS box only says the policies apply to all three roles.
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

const roles = ["Owner", "Reception", "Doctor"];

const MediQRoleDiagram = () => (
  <figure className="mt-5 min-w-0" aria-labelledby="mediq-diagram-caption">
    <figcaption
      id="mediq-diagram-caption"
      className="text-xs font-bold uppercase tracking-[0.22em] text-accent"
    >
      Role-based access
    </figcaption>

    <div className="mt-4 flex flex-col items-stretch">
      <div className={NODE}>
        <p className="text-sm font-semibold text-fg">Supabase Auth</p>
      </div>

      <Arrow label="Member of a clinic" />

      <div className={ACCENT_NODE}>
        <p className="text-sm font-semibold text-accent">Organization</p>
        <p className="mt-0.5 text-xs text-fg-muted">
          <span className="font-semibold text-fg">org_members</span> role per clinic
        </p>
      </div>

      <Arrow label="Role-based screens, web and app" />

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
        <p className="mt-0.5 text-xs text-fg-muted">
          <span className="font-semibold text-fg">has_org_role()</span> checks on clinic tables
        </p>
        <p className="mt-3 rounded-xl border border-line/10 bg-fg/[0.04] px-3 py-2 text-xs text-fg-muted">
          QR patients: public page &middot; RPCs, no sign-in
        </p>
      </div>
    </div>

    <DraftMarker
      className="mt-4"
      note="Labels taken from the Supabase migrations. Check the flow reads right, then remove this marker."
    />
  </figure>
);

export default MediQRoleDiagram;
