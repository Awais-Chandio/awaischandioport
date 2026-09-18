"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isSmallScreen) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      // Route in-page anchor clicks through Lenis; otherwise the browser jumps
      // the real scroll position while Lenis is still animating its own.
      anchors: { offset: -96 },
    });

    // Keep GSAP's ScrollTrigger in sync with Lenis's smoothed scroll position,
    // and drive Lenis from GSAP's own ticker so both share one rAF loop.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Orientation changes and mobile URL-bar resizes alter every trigger's start/end.
  // This runs on all viewports, including the ones where Lenis stays disabled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const onOrientation = () => window.setTimeout(refresh, 250);

    window.addEventListener("orientationchange", onOrientation);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("orientationchange", onOrientation);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return null;
};

export default SmoothScroll;
