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

    if (!root || prefersReducedMotion) {
      return undefined;
    }

    const glows = root.querySelectorAll("[data-glow]");
    const stars = root.querySelectorAll("[data-star]");

    gsap.to(glows, {
      y: (index) => [-8, 10, -6][index % 3],
      x: (index) => [6, -8, 7][index % 3],
      scale: 1.03,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.35,
    });

    gsap.to(stars, {
      opacity: 0.72,
      y: -6,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.08,
    });

    const setX = gsap.quickTo(root, "--mx", { duration: 0.8, ease: "power3" });
    const setY = gsap.quickTo(root, "--my", { duration: 0.8, ease: "power3" });
    const onMove = (event) => {
      setX(`${(event.clientX / window.innerWidth) * 100}%`);
      setY(`${(event.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(glows);
      gsap.killTweensOf(stars);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [--mx:50%] [--my:30%]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_18%_8%,rgba(129,140,248,0.14),transparent_24%),radial-gradient(circle_at_50%_58%,rgba(56,189,248,0.10),transparent_34%),linear-gradient(180deg,#132744_0%,#1a3a61_48%,#14304f_100%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(191,219,254,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(191,219,254,0.09)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div data-glow className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-cyan-400/14 blur-3xl" />
      <div data-glow className="absolute right-[8%] top-[28%] h-80 w-80 rounded-full bg-violet-500/12 blur-3xl" />
      <div data-glow className="absolute bottom-[6%] left-[28%] h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          data-star
          className="absolute h-1 w-1 rounded-full bg-cyan-100/70 shadow-[0_0_18px_rgba(125,211,252,0.8)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${8 + ((index * 19) % 82)}%`,
            opacity: 0.22 + (index % 5) * 0.08,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
