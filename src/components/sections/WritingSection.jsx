"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import SectionIntro from "@/components/ui/SectionIntro";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PostMeta = ({ post }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
    <span className="text-accent">{post.category}</span>
    <span aria-hidden="true" className="hidden text-fg-dim/80 sm:inline">
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
);

const ArrowBadge = ({ size = "h-10 w-10" }) => (
  <span
    aria-hidden="true"
    className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-line/10 text-fg-muted transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-fg group-focus-within:border-accent/40 group-focus-within:bg-accent group-focus-within:text-accent-fg`}
  >
    <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </span>
);

// Stretched link: the whole card is one target, the anchor stays the label.
const stretchedLink = "before:absolute before:inset-0 before:rounded-[28px] before:content-['']";

/**
 * Home-page shelf for /writing: the newest post as a large feature card, the
 * next two as compact rows beside it, and a way through to the full index.
 * The listing itself stays on /writing; this only surfaces the latest.
 */
const WritingSection = ({ posts }) => {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, "[data-writing-reveal]");

  if (!posts.length) return null;

  const [featured, ...rest] = posts;
  const more = rest.slice(0, 2);

  return (
    <section ref={sectionRef} className="section-spacing min-w-0" id="writing">
      <div
        data-writing-reveal
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <SectionIntro
          eyebrow="Writing"
          title="Notes from building mobile apps."
          description="Notes on mobile engineering, breakdowns of things I have built, and what freelance work actually looks like week to week."
        />
        <Link
          href="/writing"
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-semibold text-accent transition-colors duration-300 hover:text-fg"
        >
          All posts
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className={`mt-8 grid min-w-0 gap-5 sm:mt-10 lg:gap-6 ${
          more.length ? "lg:grid-cols-[1.25fr_1fr]" : ""
        }`}
      >
        <Card
          data-writing-reveal
          className="group relative flex min-w-0 flex-col overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/30 focus-within:border-accent/30 sm:p-10"
        >
          {/* Soft accent wash so the feature reads as the lead story. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative flex items-center justify-between gap-4">
            <span className="rounded-full border border-line/10 bg-fg/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-muted">
              Latest
            </span>
            <ArrowBadge />
          </div>

          <div className="relative mt-8">
            <PostMeta post={featured} />
            <h3 className="text-balance mt-5 font-display text-2xl font-medium leading-tight text-fg transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent sm:text-3xl">
              <Link href={`/writing/${featured.slug}`} className={stretchedLink}>
                {featured.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 max-w-[60ch] text-sm leading-7 text-fg-muted sm:text-base">
              {featured.excerpt}
            </p>
          </div>

          <p className="relative mt-auto pt-10 text-xs font-medium text-fg-dim">
            {featured.readingTime} min read
          </p>
        </Card>

        {more.length ? (
          <div className="grid min-w-0 gap-5 lg:gap-6">
            {more.map((post) => (
              <Card
                key={post.slug}
                data-writing-reveal
                className="group relative flex min-w-0 flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30 focus-within:border-accent/30 sm:p-7"
              >
                <PostMeta post={post} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="text-balance min-w-0 font-display text-lg font-medium leading-snug text-fg transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent sm:text-xl">
                    <Link href={`/writing/${post.slug}`} className={stretchedLink}>
                      {post.title}
                    </Link>
                  </h3>
                  <ArrowBadge size="h-9 w-9" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-fg-muted">{post.excerpt}</p>
                <p className="mt-auto pt-5 text-xs font-medium text-fg-dim">
                  {post.readingTime} min read
                </p>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default WritingSection;
