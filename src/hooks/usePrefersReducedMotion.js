"use client";

import { useSyncExternalStore } from "react";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

const subscribe = (onChange) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

// The server has no OS setting to read. Nothing that calls this renders on the
// server today, but "no preference" is the safe guess if that ever changes.
const getServerSnapshot = () => false;

/**
 * Live `prefers-reduced-motion: reduce`. Framer's own hook only feeds Framer;
 * this is for code that has to decide whether to run something at all — here,
 * whether to mount a WebGL scene — and it follows the setting if it changes
 * while the component is open.
 */
export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
