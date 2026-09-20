"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { STAGGER } from "@/lib/motion";
import { hideForReveal, prefersReducedMotion, revealTargets } from "@/lib/gsapMotion";
import { personalInfo, socials } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined;

      const copyTargets = gsap.utils.toArray("[data-hero-fade]", rootRef.current);

      // Portrait parallax. This used to be a Framer `useTransform` on the same
      // element GSAP fades in, so both libraries wrote the element's transform
      // and fought over `y`. It also ignored prefers-reduced-motion: Framer's
      // global `reducedMotion` config governs animations, not motion values
      // derived from scroll. Moving it here puts every scroll-linked effect on
      // one system and behind the check above.
      const parallax = gsap.to(visualRef.current, {
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      hideForReveal(copyTargets);

      // One sequence, one focal point at a time: the name lands first and the rest
      // of the copy follows it down the page. The name is split into lines only so
      // a wrapped name rises line by line; it moves exactly like everything else
      // (fade plus `DISTANCE`, house ease).
      //
      // The portrait is deliberately NOT part of it. It is already painted by the
      // server HTML, so hiding it here would make it disappear the moment the page
      // hydrates and fade back ~0.75s later — a photo that vanishes after loading,
      // and the page's largest image at that. It only gets the scroll parallax below.
      let split;
      if (headingRef.current) {
        split = SplitText.create(headingRef.current, {
          type: "lines",
          autoSplit: true,
          onSplit(self) {
            hideForReveal(self.lines);
            return revealTargets(self.lines, { stagger: STAGGER.hero });
          },
        });
      }

      revealTargets(copyTargets, { delay: 0.35, stagger: STAGGER.hero });

      return () => {
        parallax.scrollTrigger?.kill();
        parallax.kill();
        split?.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-spacing relative flex min-w-0 flex-col justify-center overflow-hidden pb-6 pt-2 lg:min-h-[78vh] lg:pb-8"
    >
      <div
        ref={rootRef}
        className="grid w-full min-w-0 gap-14 sm:gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16"
      >
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col items-center gap-6 text-center sm:gap-7 lg:mx-0 lg:max-w-none lg:items-start lg:gap-8 lg:text-left">
          <div
            data-hero-fade
            className="max-w-full text-center text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-fg-muted sm:text-xs sm:tracking-[0.2em] lg:text-left"
          >
            {/* The dot flows inline with the label so it stays attached to the first
                word when the line wraps on narrow phones. */}
            <span className="relative mr-2.5 inline-flex h-1.5 w-1.5 align-middle">
              <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for freelance &amp; contract work
          </div>

          <h1
            ref={headingRef}
            className="text-balance w-full font-display text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.96] tracking-tight text-fg"
          >
            {personalInfo.name}
          </h1>

          <p
            data-hero-fade
            className="font-display text-[clamp(1.15rem,2.6vw,1.75rem)] font-medium text-accent"
          >
            {personalInfo.title}
          </p>

          <p
            data-hero-fade
            className="max-w-xl text-sm leading-7 text-fg-muted sm:text-lg sm:leading-8"
          >
            {personalInfo.subheadline}
          </p>

          <div data-hero-fade className="flex w-full flex-wrap items-center justify-center gap-4 pt-3 sm:w-auto sm:gap-5 lg:justify-start">
            <Button href="#projects" variant="primary" size="lg" magnetic>
              View Projects
              <ArrowUpRightIcon className="h-4 w-4" />
            </Button>
            <Button href="/work-with-me" variant="secondary" size="lg">
              Work With Me
            </Button>
          </div>

          <div
            data-hero-fade
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim sm:text-xs sm:tracking-[0.2em]"
          >
            {personalInfo.location}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {personalInfo.currentCompany}
          </div>

          <div
            data-hero-fade
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium text-fg-muted lg:justify-start"
          >
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex min-h-[44px] items-center border-b border-transparent transition duration-300 hover:border-accent hover:text-fg"
              >
                {item.label}
              </a>
            ))}
            {/* Both actions point at the same file. `target` opens the PDF in
                the browser's own viewer; `download` saves it under the resume's
                real filename rather than whatever the path happens to be. */}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 border-b border-transparent transition duration-300 hover:border-accent hover:text-fg"
            >
              View Resume
              <DocumentTextIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download={personalInfo.resumeFileName}
              className="inline-flex min-h-[44px] items-center gap-1.5 border-b border-transparent transition duration-300 hover:border-accent hover:text-fg"
            >
              Download CV
              <ArrowDownTrayIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:mx-0 lg:max-w-sm"
        >
          <div ref={visualRef} className="relative">
            {/* Soft accent bloom behind the frame, the same idiom the section used
                before, so the portrait sits in the page rather than on top of it. */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-accent/[0.09] blur-3xl" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line/10 bg-canvas-soft">
              {/* `sizes` must describe the RENDERED width, not the box width. The
                  source portrait is square and the frame is 4:5, so object-cover
                  scales it until its height fills the box — the image paints at
                  1.25x the box width (272/320/384 -> 340/400/480). Declaring the
                  box width made the browser fetch a 384px file and stretch it to
                  480px, which is what made the portrait look soft on a 1x display.
                  Quality is lifted above the default 75 because the source is
                  already a fairly compressed JPEG and re-encoding it at 75 was
                  stacking a second round of loss on top. */}
              <Image
                src={personalInfo.heroImage}
                alt={`Portrait of ${personalInfo.name}`}
                fill
                priority
                quality={90}
                sizes="(max-width: 639px) 340px, (max-width: 1023px) 400px, 480px"
                className="object-cover object-top"
              />

              {/* Thin inner accent hairline, matching the accent ring used elsewhere. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-accent/15"
              />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
