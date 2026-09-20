"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ProjectFilter from "@/components/ui/ProjectFilter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { prefersReducedMotion, replayReveal } from "@/lib/gsapMotion";

const ALL = "All";

// Same structure as WritingIndex: category filter, reveal-on-scroll grid of
// stretched-link cards. See that file for why the filter effect skips its first
// pass and animates directly instead of waiting for a scroll trigger.
const LabIndex = ({ entries, categories }) => {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const sectionRef = useRef(null);
  const isFirstFilterPassRef = useRef(true);

  const visibleEntries = useMemo(
    () =>
      activeCategory === ALL
        ? entries
        : entries.filter((entry) => entry.category === activeCategory),
    [entries, activeCategory]
  );

  const activeFilters = useMemo(() => {
    const used = new Set(entries.map((entry) => entry.category));
    return [ALL, ...categories.filter((category) => used.has(category))];
  }, [entries, categories]);

  useScrollReveal(sectionRef, "[data-lab-reveal]");

  useEffect(() => {
    if (isFirstFilterPassRef.current) {
      isFirstFilterPassRef.current = false;
      return;
    }

    const targets = gsap.utils.toArray("[data-lab-reveal]", sectionRef.current);
    if (!targets.length || prefersReducedMotion()) return;

    replayReveal(targets);
  }, [visibleEntries]);

  if (!entries.length) {
    return (
      <section className="section-spacing min-w-0">
        <Card className="mx-auto max-w-2xl p-10 text-center">
          <p className="font-display text-xl font-medium text-fg sm:text-2xl">
            Nothing here yet.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section-spacing min-w-0">
      {activeFilters.length > 2 ? (
        <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
          {activeFilters.map((category) => (
            <ProjectFilter
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={setActiveCategory}
            />
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-10">
        {visibleEntries.map((entry) => (
          <Card
            key={entry.slug}
            data-lab-reveal
            className="group relative flex min-w-0 flex-col p-7 transition-colors duration-300 hover:border-accent/30 sm:p-10"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span className="text-accent">{entry.category}</span>
              <span aria-hidden="true" className="text-fg-dim/80">
                &middot;
              </span>
              <time dateTime={entry.date} className="text-fg-dim">
                {entry.dateLabel}
              </time>
              {entry.draft ? (
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-accent">
                  Draft
                </span>
              ) : null}
            </div>

            <h2 className="text-balance mt-5 font-display text-xl font-medium leading-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              <Link
                href={`/lab/${entry.slug}`}
                className="before:absolute before:inset-0 before:rounded-[28px] before:content-['']"
              >
                {entry.title}
              </Link>
            </h2>

            <p className="mt-5 text-sm leading-7 text-fg-muted">{entry.excerpt}</p>

            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              {entry.stack.length ? (
                <ul aria-label="Stack" className="flex min-w-0 flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <li key={item}>
                      <Badge variant="default" size="sm" className="normal-case tracking-normal">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/10 text-fg-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-fg"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {!visibleEntries.length ? (
        <Card className="mx-auto mt-10 max-w-2xl p-10 text-center">
          <p className="text-sm leading-7 text-fg-muted">Nothing in this category yet.</p>
        </Card>
      ) : null}
    </section>
  );
};

export default LabIndex;
