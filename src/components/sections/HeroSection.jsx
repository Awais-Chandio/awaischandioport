"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { heroHighlights, heroSpotlights, personalInfo } from "@/data/portfolio";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  return (
    <section
      ref={sectionRef}
      className="section-spacing grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <div className="section-kicker">
          <SparklesIcon className="h-4 w-4" />
          Premium Mobile Engineer Portfolio
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Software Engineer
            </span>
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sky-200">
              React Native Specialist
            </span>
            <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-teal-200">
              Flutter Experience
            </span>
          </div>

          <h1 className="section-title max-w-4xl text-5xl font-semibold leading-[0.94] text-white sm:text-6xl lg:text-7xl">
            {personalInfo.headline}
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {personalInfo.subheadline}
          </p>

          <p className="max-w-2xl text-base leading-8 text-slate-400">
            {personalInfo.intro}
          </p>
        </div>

        <div className="grid gap-3">
          {heroHighlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 backdrop-blur-xl"
            >
              <CodeBracketSquareIcon className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#projects" className="button-primary">
            View Projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link href="#contact" className="button-secondary">
            Book a Conversation
          </Link>
          <a href={personalInfo.resumeUrl} className="button-ghost">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative"
      >
        <div className="absolute inset-x-[14%] top-10 h-[26rem] rounded-full bg-sky-400/[0.18] blur-3xl" />
        <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-amber-300/[0.14] blur-3xl" />

        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          className="panel-strong relative overflow-hidden p-5 sm:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.14),transparent_28%)]" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(56,189,248,0.18),transparent_45%,rgba(99,102,241,0.2))]" />
            <motion.div style={{ y: imageY }} className="relative">
              <Image
                src={personalInfo.heroImage}
                alt={personalInfo.name}
                width={720}
                height={840}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            whileHover={{ y: -6 }}
            className="absolute left-4 top-4 rounded-[24px] border border-white/10 bg-slate-950/75 px-4 py-4 shadow-soft backdrop-blur-2xl sm:left-6 sm:top-6"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Current Role</p>
            <p className="mt-2 text-lg font-semibold text-white">Verge Systems</p>
            <p className="mt-1 text-sm text-sky-200">Software Engineer · React Native</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="absolute bottom-5 left-5 rounded-[26px] border border-white/10 bg-slate-950/80 p-4 shadow-soft backdrop-blur-2xl sm:bottom-6 sm:left-6 sm:max-w-[17rem]"
          >
            <div className="flex items-center gap-2 text-white">
              <BriefcaseIcon className="h-5 w-5 text-teal-300" />
              <span className="text-sm font-medium">Cross-platform mobile delivery</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Clean UI systems, scalable feature work, and product-aware engineering across modern mobile apps.
            </p>
          </motion.div>
        </motion.div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
          {heroSpotlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
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
