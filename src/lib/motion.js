/**
 * One source of truth for every transition on the site — Framer, GSAP and CSS.
 *
 * Division of labour, unchanged: Framer Motion owns component mount/unmount and
 * route transitions (variants below); GSAP owns scroll-linked reveals and
 * timelines (see lib/gsapMotion.js, which reads the numbers from here). A
 * component should not animate the same property with both.
 *
 * The whole site shares ONE curve and ONE movement: a fade with a small rise.
 * There is no slide-from-the-side, no zoom and no bounce anywhere; a surface
 * either fades in place or fades and rises by `DISTANCE`.
 *
 * Every variant here moves only `opacity` and `transform`, so transitions stay
 * off the layout and paint paths and can run on the compositor.
 *
 * Reduced motion is handled globally rather than per component: MotionProvider
 * sets `<MotionConfig reducedMotion="user">`, which makes Framer drop transform
 * values and animate opacity alone whenever the OS setting is on. The GSAP side
 * checks REDUCED_MOTION_QUERY and skips its reveals entirely.
 */

// Decelerating curve — fast to start, soft to settle. Shared by everything so
// no two surfaces ease differently. Mirrored in three other places that cannot
// import this array: the `--ease-house` CSS variable (globals.css), which
// Tailwind's default `transition` timing and `ease-premium` read from
// (tailwind.config.js), and the GSAP "house" ease registered in gsapMotion.js.
export const EASE = [0.22, 1, 0.36, 1];

// CSS/GSAP string form of EASE. Keep in step with the array above.
export const EASE_BEZIER = "0.22,1,0.36,1";

// Entering is the part a visitor watches; leaving should get out of the way.
// `micro` is for interactions the pointer is already driving — a toggle, an
// icon swap — where anything slower reads as lag rather than polish.
export const DURATION = {
  enter: 0.4,
  exit: 0.25,
  micro: 0.25,
  // Scroll reveals are watched rather than triggered, so they get to breathe.
  reveal: 0.9,
};

// The single travel distance, in pixels, for every fade-and-rise. `DISTANCE_SM`
// is for a row that settles inside a surface which has already moved.
export const DISTANCE = 16;
export const DISTANCE_SM = 8;

/**
 * Stagger, in seconds between one element starting and the next. The gap is
 * wider than the old 0.06–0.15 range on purpose: with a gap this size each
 * element is nearly settled before the next begins, so the eye follows one
 * thing at a time instead of a group moving together.
 */
export const STAGGER = {
  // Cards, rows and columns revealed by scrolling.
  reveal: 0.16,
  // The hero's stacked text lines, which are read top to bottom.
  hero: 0.14,
  // A menu opening: tiny, so the panel still reads as one surface unfolding.
  menu: 0.06,
};

// A grid larger than this would take too long to finish at STAGGER.reveal, so
// the total spread is capped and the gap shrinks to fit.
export const STAGGER_MAX_TOTAL = 0.8;

// Where a scroll reveal fires: once an element's top edge is this far inside the
// bottom of the viewport. It is a fixed pixel margin rather than a percentage on
// purpose. The earlier "top 80%" left the bottom fifth of the screen — 180px on a
// laptop, 220px on a 1080p monitor, 200px on a tablet — holding cards that were
// on screen but still transparent, so a project's image area looked empty until
// the next scroll. A small fixed margin keeps that blank strip the same thin size
// at every window height while still letting the reveal play before the element
// is fully in view.
export const REVEAL_START = "top bottom-=64px";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const enterTransition = { duration: DURATION.enter, ease: EASE };
export const exitTransition = { duration: DURATION.exit, ease: EASE };
export const microTransition = { duration: DURATION.micro, ease: EASE };

/**
 * The house transition: fade with a slight rise. Used for route changes, the
 * mobile nav panel, and both dialog panels (project details, command palette).
 */
export const fadeRise = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: enterTransition },
  exit: { opacity: 0, y: DISTANCE, transition: exitTransition },
};

/**
 * Opacity-only, for backdrops and other full-bleed surfaces where a translation
 * would reveal the canvas behind the element's edge, and for the gallery image
 * swap where a rise would read as the frame jumping.
 */
export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enterTransition },
  exit: { opacity: 0, transition: exitTransition },
};

/**
 * Mobile nav panel. Identical to `fadeRise` on the way in and out, with a
 * small stagger handed down to its rows: enough to read as one surface
 * unfolding, far short of a theatrical fullscreen menu.
 *
 * Framer skips `staggerChildren` delays for `exit` here because the panel's own
 * fade is shorter than the stagger would be — the rows leave with the panel.
 */
export const menuPanel = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...enterTransition, delayChildren: 0.06, staggerChildren: STAGGER.menu },
  },
  exit: { opacity: 0, y: DISTANCE, transition: exitTransition },
};

/**
 * One row inside the mobile nav panel. Travel is half the house distance: the
 * panel has already moved, so the rows only need to settle into it.
 */
export const menuItem = {
  hidden: { opacity: 0, y: DISTANCE_SM },
  visible: { opacity: 1, y: 0, transition: microTransition },
  exit: { opacity: 0, transition: { duration: 0.12, ease: EASE } },
};

/**
 * Swapping one block of content for another in place — a form for its success
 * state, an icon for its counterpart. Opacity-led with a small rise on the way
 * in and a plain fade on the way out, so two panels of different heights do not
 * appear to jump.
 */
export const swap = {
  hidden: { opacity: 0, y: DISTANCE_SM },
  visible: { opacity: 1, y: 0, transition: microTransition },
  exit: { opacity: 0, transition: microTransition },
};
