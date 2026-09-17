"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownTrayIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { personalInfo, socials } from "@/data/portfolio";

gsap.registerPlugin(SplitText);

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const HeroSection = () => {
  const sectionRef = useRef(null);
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -22]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setShowScene(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fadeTargets = gsap.utils.toArray("[data-hero-fade]", rootRef.current);

      if (reduceMotion) {
        gsap.set(fadeTargets, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(fadeTargets, { opacity: 0, y: 20 });

      let split;
      if (headingRef.current) {
        split = SplitText.create(headingRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });
      }

      gsap.to(fadeTargets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.45,
      });

      return () => split?.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-spacing relative flex min-w-0 flex-col justify-center overflow-hidden pb-6 pt-2 lg:min-h-[78vh] lg:pb-12"
    >
      <div
        ref={rootRef}
        className="grid w-full min-w-0 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12"
      >
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col items-center gap-7 text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
          <div
            data-hero-fade
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
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
            {personalInfo.role} — {personalInfo.specialization}
          </p>

          <p
            data-hero-fade
            className="max-w-xl text-sm leading-7 text-fg-muted sm:text-lg sm:leading-8"
          >
            {personalInfo.subheadline}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
            <Button href="#projects" variant="primary" size="lg" magnetic>
              View Projects
              <ArrowUpRightIcon className="h-4 w-4" />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Let&apos;s Talk
            </Button>
          </div>

          <div
            data-hero-fade
            className="text-xs font-medium uppercase tracking-[0.2em] text-fg-dim"
          >
            {personalInfo.location}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {personalInfo.currentCompany}
          </div>

          <div
            data-hero-fade
            className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-fg-muted lg:justify-start"
          >
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="border-b border-transparent pb-0.5 transition duration-300 hover:border-accent hover:text-fg"
              >
                {item.label}
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              className="inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 transition duration-300 hover:border-accent hover:text-fg"
            >
              Resume
              <ArrowDownTrayIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {showScene ? (
          <motion.div
            style={{ y: visualY }}
            className="relative mx-auto hidden aspect-square w-full max-w-md lg:mx-0 lg:block"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/[0.09] blur-3xl" />
            <ThreeScene />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
