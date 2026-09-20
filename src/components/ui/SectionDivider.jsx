/**
 * A hairline that fades out at both ends, sitting midway between two sections.
 *
 * It is a real element rather than a border or pseudo-element so that sections
 * with `overflow-hidden` cannot clip it. The parent flex column gives it
 * `--space-section / 2` of gap on each side (`gap-section-half`), which is what
 * makes the sections keep their full `--space-section` separation with the
 * line exactly halfway. Purely decorative, so it is hidden from assistive tech.
 */
const SectionDivider = () => <div aria-hidden="true" className="section-divider" />;

export default SectionDivider;
