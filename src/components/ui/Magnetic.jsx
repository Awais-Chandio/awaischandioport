"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Heavily damped so the button eases toward the pointer and settles without
// overshooting — the previous 300/20 spring visibly wobbled past its target.
const spring = { stiffness: 170, damping: 26, mass: 0.6 };

const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  // Reduced motion is handled by refusing to move the values, not by rendering a
  // different element. `useReducedMotion` only has an answer on the client, so
  // swapping motion.span for a plain span made the server send a `style`
  // attribute the client's first render did not, and React logged a hydration
  // mismatch on every visit with the OS setting on. The springs simply stay at
  // zero here, which is the same visual result without the mismatch.
  const handlePointerMove = (event) => {
    if (shouldReduceMotion || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
