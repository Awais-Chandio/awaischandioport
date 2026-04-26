"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { heroHighlights, heroSpotlights, personalInfo } from "@/data/portfolio";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[18rem] items-center justify-center text-xs uppercase tracking-[0.28em] text-cyan-100 sm:h-[24rem] lg:h-[30rem]">
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
      className="section-spacing grid min-w-0 gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.92fr)] lg:items-center lg:gap-12"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full min-w-0 max-w-full space-y-7 overflow-hidden"
      >
        <div className="section-kicker">
          <SparklesIcon className="h-4 w-4" />
          Premium Interactive Portfolio
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Software Engineer
            </span>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100">
              React Native Specialist
            </span>
            <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-teal-100">
              Flutter Experience
            </span>
          </div>

          <h1 className="section-title w-full max-w-[21rem] overflow-hidden text-[clamp(1.75rem,7vw,4rem)] font-semibold leading-[1.08] text-white sm:max-w-4xl sm:text-[clamp(2.85rem,5.8vw,4rem)]">
            <span className="block sm:inline">Software</span>
            <span className="block sm:inline"> Engineer</span>
            <span className="block">building</span>
            <span className="text-gradient block min-h-[1.08em] break-words pt-1 text-[0.9em]">
              <TypeAnimation
                sequence={[
                  "mobile apps.",
                  2400,
                  "React Native.",
                  2400,
                  "polished UI.",
                  2400,
                ]}
                speed={22}
                repeat={Infinity}
              />
            </span>
          </h1>

          <p className="max-w-[21rem] text-lg leading-8 text-slate-300 sm:max-w-2xl sm:text-xl">
            {personalInfo.subheadline}
          </p>

          <p className="max-w-[21rem] text-base leading-8 text-slate-400 sm:max-w-2xl">
            {personalInfo.intro}
          </p>
        </div>

        <div className="grid max-w-[21rem] gap-3 sm:max-w-2xl">
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#projects" className="button-primary magnetic">
            View Projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link href="#contact" className="button-secondary magnetic">
            Book a Conversation
          </Link>
          <a href={personalInfo.resumeUrl} className="button-ghost magnetic">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download CV
          </a>
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
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-[22px] border border-white/10 bg-slate-950/78 px-4 py-3 shadow-soft backdrop-blur-2xl sm:left-6 sm:top-6"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Current Role</p>
            <p className="mt-2 text-lg font-semibold text-white">Verge Systems</p>
            <p className="mt-1 text-sm text-cyan-100">Software Engineer - React Native</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/10 bg-slate-950/82 p-4 shadow-soft backdrop-blur-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[17rem]"
          >
            <div className="flex items-center gap-2 text-white">
              <BriefcaseIcon className="h-5 w-5 text-teal-300" />
              <span className="text-sm font-medium">Cross-platform mobile delivery</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Clean UI systems, scalable feature work, and product-aware engineering across modern mobile apps.
            </p>
          </motion.div>

          <div className="absolute bottom-5 right-5 hidden overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 shadow-soft backdrop-blur-xl md:block">
            <Image
              src={personalInfo.heroImage}
              alt={personalInfo.name}
              width={120}
              height={120}
              className="h-24 w-24 rounded-[22px] object-cover"
              priority
            />
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
