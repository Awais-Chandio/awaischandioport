"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import ProjectFilter from "@/components/ui/ProjectFilter";

gsap.registerPlugin(ScrollTrigger);

const ALL = "All";

const WritingIndex = ({ posts, categories }) => {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const sectionRef = useRef(null);
  // useGSAP runs in a layout effect, so it has already set the cards to opacity
  // 0 by the time the filter effect below runs on mount. Without this the mount
  // pass would immediately animate them back to visible and defeat the scroll
  // reveal entirely.
  const isFirstFilterPassRef = useRef(true);

  const visiblePosts = useMemo(
    () =>
      activeCategory === ALL
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory]
  );

  // Only offer a filter for categories that actually have a published post.
  const activeFilters = useMemo(() => {
    const used = new Set(posts.map((post) => post.category));
    return [ALL, ...categories.filter((category) => used.has(category))];
  }, [posts, categories]);

  // Same reveal contract as the rest of the site: one trigger, staggered
  // children, straight set() under prefers-reduced-motion.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray("[data-writing-reveal]", sectionRef.current);
      if (!targets.length) return undefined;

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(targets, { opacity: 0, y: 28 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Changing the filter remounts the grid, and the scroll trigger above is
  // `once: true`, so without this the new set simply appeared. The list is
  // already on screen by the time anyone touches a filter, so it animates
  // directly rather than waiting for a trigger. This stays on GSAP because the
  // same cards are GSAP-revealed on scroll — handing the filter to Framer would
  // put two systems on one element's transform. Mirrors ProjectsSection.
  useEffect(() => {
    if (isFirstFilterPassRef.current) {
      isFirstFilterPassRef.current = false;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = gsap.utils.toArray("[data-writing-reveal]", sectionRef.current);
    if (!targets.length || reduceMotion) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }
    );
  }, [visiblePosts]);

  if (!posts.length) {
    return (
      <section className="section-spacing min-w-0">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <p className="font-display text-xl font-medium text-fg sm:text-2xl">
            New posts coming soon.
          </p>
          <p className="mt-3 text-sm leading-7 text-fg-muted">
            The first pieces are being written: notes on React Native and mobile
            engineering, breakdowns of builds, and a freelance journal.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section-spacing min-w-0">
      {activeFilters.length > 2 ? (
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
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

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
        {visiblePosts.map((post) => (
          <Card
            key={post.slug}
            data-writing-reveal
            className="group relative flex min-w-0 flex-col p-6 transition-colors duration-300 hover:border-accent/30 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span className="text-accent">{post.category}</span>
              <span aria-hidden="true" className="text-fg-dim/80">
                &middot;
              </span>
              <time dateTime={post.date} className="text-fg-dim">
                {post.dateLabel}
              </time>
              {post.draft ? (
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-accent">
                  Draft
                </span>
              ) : null}
            </div>

            <h2 className="text-balance mt-4 font-display text-xl font-medium leading-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              {/* Stretched link: the card is one target, the anchor stays the label. */}
              <Link
                href={`/writing/${post.slug}`}
                className="before:absolute before:inset-0 before:rounded-[28px] before:content-['']"
              >
                {post.title}
              </Link>
            </h2>

            <p className="mt-4 text-sm leading-7 text-fg-muted">{post.excerpt}</p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <span className="text-xs font-medium text-fg-dim">
                {post.readingTime} min read
              </span>
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

      {!visiblePosts.length ? (
        <Card className="mx-auto mt-8 max-w-2xl p-8 text-center">
          <p className="text-sm leading-7 text-fg-muted">
            Nothing in this category yet.
          </p>
        </Card>
      ) : null}
    </section>
  );
};

export default WritingIndex;
