/**
 * One source of truth for every React-level transition on the site.
 *
 * Division of labour, unchanged: Framer Motion owns component mount/unmount and
 * route transitions (this file); GSAP owns scroll-linked reveals and timelines.
 * A component should not animate the same property with both.
 *
 * Every variant here moves only `opacity` and `transform` (Framer compiles `y`
 * and `scale` into a single transform), so transitions stay off the layout and
 * paint paths and can run on the compositor.
 *
 * Reduced motion is handled globally rather than per component: MotionProvider
 * sets `<MotionConfig reducedMotion="user">`, which makes Framer drop transform
 * values and animate opacity alone whenever the OS setting is on.
 */

// Decelerating curve — fast to start, soft to settle. Shared by everything so
// no two surfaces ease differently. Mirrored in Tailwind as `ease-premium`
// (tailwind.config.js) so CSS hover states and JS transitions share one curve.
export const EASE = [0.22, 1, 0.36, 1];

// Entering is the part a visitor watches; leaving should get out of the way.
// `micro` is for interactions the pointer is already driving — a toggle, an
// icon swap — where anything slower reads as lag rather than polish.
export const DURATION = {
  enter: 0.3,
  exit: 0.2,
  micro: 0.2,
};

// The single travel distance, in pixels, for every fade-and-rise.
export const DISTANCE = 10;

export const enterTransition = { duration: DURATION.enter, ease: EASE };
export const exitTransition = { duration: DURATION.exit, ease: EASE };
export const microTransition = { duration: DURATION.micro, ease: EASE };

/**
 * The house transition: fade with a slight rise. Used for route changes, the
 * mobile nav panel, the dialog panel, and dialog tab panels.
 */
export const fadeRise = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: enterTransition },
  exit: { opacity: 0, y: DISTANCE, transition: exitTransition },
};

/**
 * Opacity-only, for backdrops and other full-bleed surfaces where a translation
 * would reveal the canvas behind the element's edge.
 */
export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enterTransition },
  exit: { opacity: 0, transition: exitTransition },
};

/**
 * The dialog panel adds a barely-there scale to the house transition so it
 * reads as arriving rather than sliding. Same duration and curve as everything
 * else.
 */
export const dialogPanel = {
  hidden: { opacity: 0, y: DISTANCE, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: enterTransition },
  exit: { opacity: 0, y: DISTANCE, scale: 0.99, transition: exitTransition },
};

/**
 * Mobile nav panel. Identical to `fadeRise` on the way in and out, with a
 * deliberately tiny stagger handed down to its rows: enough to read as one
 * surface unfolding, far short of a theatrical fullscreen menu. The whole list
 * is settled inside ~0.4s even at six items.
 *
 * Framer skips `staggerChildren` delays for `exit` here because the panel's own
 * fade is shorter than the stagger would be — the rows leave with the panel.
 */
export const menuPanel = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...enterTransition, delayChildren: 0.04, staggerChildren: 0.035 },
  },
  exit: { opacity: 0, y: DISTANCE, transition: exitTransition },
};

/**
 * One row inside the mobile nav panel. Travel is half the house distance: the
 * panel has already moved, so the rows only need to settle into it.
 */
export const menuItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: microTransition },
  exit: { opacity: 0, transition: { duration: 0.12, ease: EASE } },
};

/**
 * Gallery image swap inside the case-study dialog. The incoming frame settles
 * out of a slight over-scale, which reads as a camera focusing rather than a
 * slide. Kept here rather than inline so the gallery cannot drift away from the
 * site's curve the way an ad-hoc `transition` prop does.
 */
export const galleryImage = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: enterTransition },
  exit: { opacity: 0, scale: 0.98, transition: exitTransition },
};

/**
 * Swapping one block of content for another in place — a form for its success
 * state, an icon for its counterpart. Opacity-led with a very small rise, so
 * two panels of different heights do not appear to jump.
 */
export const swap = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: microTransition },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14, ease: EASE } },
};
