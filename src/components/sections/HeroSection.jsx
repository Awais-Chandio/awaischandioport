"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  heroHighlights,
  heroSpotlights,
  personalInfo,
  socials,
} from "@/data/portfolio";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[16.5rem] items-center justify-center text-xs uppercase tracking-[0.28em] text-cyan-100 sm:h-[23rem] lg:h-[27rem]">
      Loading
    </div>
  ),
});

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 1.4]);

  return (
    <section
      ref={sectionRef}
      className="section-spacing grid min-w-0 gap-8 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.92fr)] lg:items-center lg:gap-12"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full min-w-0 max-w-full space-y-5 overflow-hidden text-center sm:space-y-7 lg:text-left"
      >
        <div className="section-kicker mx-auto lg:mx-0">
          <SparklesIcon className="h-4 w-4" />
          Portfolio
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-300 sm:gap-3 sm:text-sm lg:justify-start">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2">
              Software Engineer
            </span>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-cyan-100 sm:px-4 sm:py-2">
              React Native
            </span>
            <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-teal-100 sm:px-4 sm:py-2">
              Flutter
            </span>
          </div>

          <div className="mx-auto max-w-[22rem] space-y-3 sm:max-w-4xl sm:space-y-4 lg:mx-0">
            <h1 className="section-title text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {personalInfo.name}
            </h1>
            <p className="text-lg font-semibold leading-tight text-slate-100 sm:text-2xl lg:text-3xl">
              <span className="text-gradient block break-words">Software Engineer</span>
            </p>
          </div>

          <p className="mx-auto max-w-[22rem] text-sm leading-7 text-slate-300 sm:max-w-2xl sm:text-lg sm:leading-8 lg:mx-0">
            {personalInfo.subheadline}
          </p>

          <p className="mx-auto hidden max-w-2xl text-sm leading-7 text-slate-400 sm:block sm:text-base sm:leading-8 lg:mx-0">
            {personalInfo.intro}
          </p>
        </div>

        <div className="hidden max-w-[21rem] gap-3 sm:grid sm:max-w-2xl">
          {heroHighlights.map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 4, scale: 1.005 }}
              className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 backdrop-blur-xl"
            >
              <CodeBracketSquareIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto flex max-w-[22rem] flex-col gap-3 sm:max-w-2xl sm:flex-row sm:flex-wrap lg:mx-0">
          <Link href="#projects" className="button-primary magnetic w-full sm:w-auto">
            View Projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link href="#contact" className="button-secondary magnetic w-full sm:w-auto">
            Contact Me
          </Link>
          <a href={personalInfo.resumeUrl} className="button-ghost magnetic hidden w-full sm:inline-flex sm:w-auto">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download CV
          </a>
        </div>

        <div className="hidden flex-wrap items-center gap-3 text-sm text-slate-300 sm:flex">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative min-w-0 overflow-hidden lg:overflow-visible"
      >
        <div className="pointer-events-none absolute inset-x-[18%] top-10 h-64 rounded-full bg-cyan-400/[0.14] blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-8 h-32 w-32 rounded-full bg-teal-300/[0.12] blur-3xl" />

        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          className="panel-strong relative mx-auto max-w-[38rem] overflow-hidden p-3 sm:p-4 lg:max-w-none"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.12),transparent_30%),linear-gradient(135deg,rgba(168,85,247,0.08),transparent_42%)]" />
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/55">
            <ThreeScene />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-cyan-100/15 bg-slate-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-soft backdrop-blur-xl">
              Mobile Stack
            </div>
          </div>
        </motion.div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
          {heroSpotlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, delay: 0.3 + index * 0.1 }}
              className="panel p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
