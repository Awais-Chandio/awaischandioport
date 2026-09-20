import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import {
  DISTANCE,
  DURATION,
  EASE_BEZIER,
  REDUCED_MOTION_QUERY,
  STAGGER,
  STAGGER_MAX_TOTAL,
} from "@/lib/motion";

gsap.registerPlugin(CustomEase);

// The site's one curve (lib/motion.js EASE), registered so GSAP tweens use the
// same easing as Framer and the CSS transitions instead of a stock `power3`.
CustomEase.create("house", EASE_BEZIER);
export const GSAP_EASE = "house";

export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * Gap between successive elements for a group of `count`. Normally `each`, but
 * shrunk so a long list finishes inside STAGGER_MAX_TOTAL rather than making a
 * visitor wait on the last card.
 */
export const staggerFor = (count, each = STAGGER.reveal) => {
  if (count < 2) return 0;
  return Math.min(each, STAGGER_MAX_TOTAL / (count - 1));
};

/** Puts `targets` in the pre-reveal state: transparent and one step below rest. */
export const hideForReveal = (targets) => gsap.set(targets, { opacity: 0, y: DISTANCE });

/**
 * The site's one reveal: fade in while rising `DISTANCE` to rest. Every scroll
 * reveal, filter change and hero entrance goes through here.
 *
 * `transform` is cleared once a target lands. GSAP otherwise leaves an inline
 * `translate(0, 0)` behind, and an inline transform beats the Tailwind hover
 * lift (`hover:-translate-y-1`) on the same element, so the lift never fired.
 */
export const revealTargets = (targets, { delay = 0, stagger } = {}) => {
  const list = gsap.utils.toArray(targets);

  return gsap.to(list, {
    opacity: 1,
    y: 0,
    duration: DURATION.reveal,
    ease: GSAP_EASE,
    delay,
    stagger: stagger ?? staggerFor(list.length),
    overwrite: "auto",
    clearProps: "transform",
  });
};

/** Hides `targets` and reveals them again straight away, for content swapped in view. */
export const replayReveal = (targets) => {
  hideForReveal(targets);
  return revealTargets(targets);
};
