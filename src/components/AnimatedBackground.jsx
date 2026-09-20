"use client";

import { useEffect, useRef } from "react";

// Only where there is room for it and a pointer to follow, and never when the
// visitor has asked for less motion. The blob is also hidden in CSS at these
// same conditions, so it is never rendered — not merely paused — when skipped.
const AMBIENT_QUERY =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// How far the blob may travel from its resting place, in pixels, when the
// pointer is at the far edge of the window. Deliberately small.
const RANGE_X = 48;
const RANGE_Y = 36;

// Time constant of the follow, in seconds. The blob closes about 63% of the
// remaining distance to the pointer every TAU seconds, so it trails well behind
// and never reacts to a flick. This is smoothing, not an eased tween, so it has
// no curve to share with the reveals.
const TAU = 1.6;

const AnimatedBackground = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return undefined;

    const query = window.matchMedia(AMBIENT_QUERY);
    let stopFollowing = null;

    const startFollowing = () => {
      let targetX = 0;
      let targetY = 0;
      let x = 0;
      let y = 0;
      let frame = 0;
      let last = 0;

      const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        const k = 1 - Math.exp(-dt / TAU);
        x += (targetX - x) * k;
        y += (targetY - y) * k;
        blob.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

        // Sleep once it has arrived; the next pointer move wakes it. A loop that
        // ran forever would cost a frame callback per tick for no visible change.
        const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
        frame = settled ? 0 : requestAnimationFrame(step);
      };

      const onMove = (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2 * RANGE_X;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2 * RANGE_Y;
        if (!frame) {
          last = performance.now();
          frame = requestAnimationFrame(step);
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(frame);
        blob.style.transform = "";
      };
    };

    const sync = () => {
      stopFollowing?.();
      stopFollowing = query.matches ? startFollowing() : null;
    };

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      stopFollowing?.();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(rgb(var(--fg)/0.05)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-gradient-to-b from-canvas-soft to-transparent" />

      {/* The one ambient shape: a soft accent glow, drifting on its own very slowly
          and leaning a little toward the pointer. The outer element takes the
          pointer's translation and the inner one the CSS drift, so the two
          transforms never fight over the same property. The gradient fades to
          nothing by itself (no blur filter), and only `transform` ever changes. */}
      <div
        ref={blobRef}
        className="absolute left-[8%] top-[22%] hidden h-[46rem] w-[46rem] will-change-transform md:motion-safe:block"
      >
        <div className="ambient-drift h-full w-full rounded-full [background:radial-gradient(closest-side,rgb(var(--accent)/0.05),transparent)]" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
