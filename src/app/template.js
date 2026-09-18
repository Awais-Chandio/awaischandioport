"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { fadeRise } from "@/lib/motion";

/**
 * Route transition for every page under app/.
 *
 * Next.js remounts a template on each navigation, so keying AnimatePresence by
 * pathname gives each route a fresh enter animation. Exit is deliberately not
 * animated: by the time the pathname changes, `children` is already the
 * incoming page, so an exit variant would animate the new content out rather
 * than the old — the well-known App Router trap. Getting a true out-then-in
 * would mean holding the previous tree through undocumented router internals,
 * which is not worth the fragility for a 300ms fade.
 *
 * The first paint is excluded on purpose. Framer serialises `initial` into the
 * SSR markup, so animating the first load would ship HTML at opacity 0 and
 * leave the page blank until hydration — a real flash, and a worse LCP. A
 * module-scope flag (reset by any full page load) marks the first mount so only
 * client-side navigations animate.
 */
let hasNavigated = false;

const Template = ({ children }) => {
  const pathname = usePathname();
  const isFirstPaint = useRef(!hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        variants={fadeRise}
        initial={isFirstPaint.current ? false : "hidden"}
        animate="visible"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
