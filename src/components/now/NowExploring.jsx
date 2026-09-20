"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { nowExploring } from "@/data/now";

// Text before the first " — " reads as the topic; the rest is detail. The dash
// stays in the output, so the visible sentence is exactly what is in data/now.js.
const SEPARATOR = " — ";

const splitItem = (item) => {
  const at = item.indexOf(SEPARATOR);
  if (at === -1) return { lead: item, rest: "" };
  return { lead: item.slice(0, at), rest: item.slice(at) };
};

/**
 * A small, quiet strip under the hero: not a section, so no SectionIntro and no
 * card chrome, just a hairline-topped label and a short list.
 */
const NowExploring = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, "[data-now-reveal]");

  if (!nowExploring.length) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="now-heading"
      className="section-spacing min-w-0"
    >
      <h2
        id="now-heading"
        data-now-reveal
        className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fg-dim"
      >
        Currently exploring
      </h2>

      <ul className="mt-5 grid min-w-0 gap-x-10 gap-y-2 md:grid-cols-3">
        {nowExploring.map((item) => {
          const { lead, rest } = splitItem(item);
          return (
            <li
              key={item}
              data-now-reveal
              className="min-w-0 border-l border-line/10 py-1 pl-4 text-sm leading-7 text-fg-muted"
            >
              <span className="font-medium text-fg">{lead}</span>
              {rest}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NowExploring;
