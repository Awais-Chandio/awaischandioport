"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

    if (!root || prefersReducedMotion || isSmallScreen) {
      return undefined;
    }

    const setX = gsap.quickTo(root, "--mx", { duration: 0.9, ease: "power3" });
    const setY = gsap.quickTo(root, "--my", { duration: 0.9, ease: "power3" });
    const onMove = (event) => {
      setX(`${(event.clientX / window.innerWidth) * 100}%`);
      setY(`${(event.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas [--mx:50%] [--my:20%]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgb(var(--accent)/0.08),transparent_38%)] transition-opacity duration-700" />
      <div className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(rgb(var(--fg)/0.05)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-gradient-to-b from-canvas-soft to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
