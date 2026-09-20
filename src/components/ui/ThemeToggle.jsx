"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { swap } from "@/lib/motion";

const ThemeToggle = ({ className = "" }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`h-11 w-11 rounded-full border border-line/10 ${className}`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/10 bg-fg/[0.04] text-fg transition hover:border-accent/40 hover:text-accent ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* The two icons are absolutely positioned and crossfade in place, so the
          swap never reflows the button or the nav row beside it. `initial={false}`
          keeps the current icon from animating in on first paint. It uses the
          shared `swap` transition — a fade with a small rise, no spin — so the
          toggle moves like everything else on the site. */}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? "dark" : "light"}
          variants={swap}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inline-flex"
        >
          {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
