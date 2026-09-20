"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/lib/motion";
import { hideForReveal, prefersReducedMotion, revealTargets } from "@/lib/gsapMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The site's one scroll reveal: every `selector` match inside `scopeRef` starts
 * hidden and rises in, staggered, once. With reduced motion nothing is hidden,
 * so the content is simply there.
 *
 * Two trigger modes share the same movement:
 *  - default: one trigger on the section, everything staggers in together —
 *    right for a heading beside its body.
 *  - `batch: true`: each target triggers as it scrolls into view — right for a
 *    grid or list taller than the viewport.
 */
export function useScrollReveal(scopeRef, selector, { batch = false, dependencies = [] } = {}) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined;

      const targets = gsap.utils.toArray(selector, scopeRef.current);
      if (!targets.length) return undefined;

      hideForReveal(targets);

      if (batch) {
        const triggers = ScrollTrigger.batch(targets, {
          start: REVEAL_START,
          once: true,
          onEnter: (entering) => revealTargets(entering),
        });
        return () => triggers.forEach((trigger) => trigger.kill());
      }

      const trigger = ScrollTrigger.create({
        trigger: scopeRef.current,
        start: REVEAL_START,
        once: true,
        onEnter: () => revealTargets(targets),
      });
      return () => trigger.kill();
    },
    { scope: scopeRef, dependencies }
  );
}
