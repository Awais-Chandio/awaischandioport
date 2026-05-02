"use client";

import { motion } from "framer-motion";
import { personalInfo, socials } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-cyan-100/10 bg-[linear-gradient(180deg,rgba(20,48,79,0.72),rgba(19,39,68,0.94))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-100">
            Muhammad Awais
          </p>
          <p className="mt-3 text-2xl font-semibold text-white">
            Software Engineer focused on React Native mobile applications.
          </p>
          <p className="mt-3 max-w-xl leading-7 text-slate-400">
            Building mobile app features with clean UI, API-connected flows, and additional Flutter experience from practical cross-platform projects.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-3">
            {socials.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -4 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
          <p className="text-slate-500">
            Copyright {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
