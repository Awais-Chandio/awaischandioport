"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global reduced-motion policy for every Framer Motion component on the site.
 *
 * `reducedMotion="user"` follows the OS setting: when it is on, Framer skips
 * transform and layout values and animates opacity alone, so a transition
 * becomes a plain cross-fade instead of movement. Setting it once here means no
 * individual component has to query the media list itself.
 */
const MotionProvider = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
