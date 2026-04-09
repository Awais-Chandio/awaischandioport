"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { heroHighlights, personalInfo } from "@/data/portfolio";

const floatingCards = [
  {
    icon: DevicePhoneMobileIcon,
    label: "Mobile-first delivery",
  },
  {
    icon: BoltIcon,
    label: "Fast iteration",
  },
  {
    icon: RocketLaunchIcon,
    label: "Production focus",
  },
];

const HeroSection = () => {
  return (
    <section className="section-spacing grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center" id="home">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          Available for freelance and remote product work
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">
            Flutter Developer • Firebase • UI Engineering
          </p>
          <h1 className="section-title max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Building polished mobile experiences for brands that need speed and clarity.
          </h1>
          <div className="text-xl text-muted sm:text-2xl">
            <span className="mr-2 text-white">I am</span>
            <TypeAnimation
              sequence={[
                personalInfo.name,
                1200,
                "a Flutter specialist",
                1200,
                "focused on responsive UI",
                1200,
                "shipping Firebase-backed apps",
                1200,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              className="font-semibold text-brand"
            />
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {personalInfo.intro}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {heroHighlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-brand"
          >
            View Projects
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-brand/70 hover:bg-brand/10"
          >
            Start a Conversation
          </Link>
          <a
            href={personalInfo.resumeUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3.5 text-sm font-semibold text-accent transition hover:bg-accent/20"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative"
      >
        <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-brand/20 blur-3xl" />
        <div className="panel relative overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_38%)]" />
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-surfaceAlt">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/15 via-transparent to-accent/15" />
            <Image
              src={personalInfo.heroImage}
              alt={personalInfo.name}
              width={700}
              height={820}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
            {floatingCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                >
                  <Icon className="mb-3 h-5 w-5 text-brand" />
                  <p className="text-sm font-medium text-slate-100">{card.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
