"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { professionalHighlights } from "@/data/portfolio";

const metrics = [
  { value: "4+", label: "Mobile domains explored" },
  { value: "2", label: "Cross-platform stacks" },
  { value: "100%", label: "UI-focused delivery" },
  { value: "1", label: "Current React Native role" },
];

const StatsSection = () => {
  return (
    <section className="section-spacing space-y-5">
      <Reveal className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item, index) => (
          <motion.div
            key={item.label}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="panel group relative overflow-hidden p-6"
          >
            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="text-4xl font-semibold text-white"
            >
              {item.value}
            </motion.p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.label}</p>
          </motion.div>
        ))}
      </Reveal>

      <Reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" delay={0.08}>
        {professionalHighlights.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -6 }}
            className="panel group relative overflow-hidden p-6"
          >
            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-teal-300/10 blur-3xl transition duration-500 group-hover:bg-teal-300/20" />
            <div className="relative">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </Reveal>
    </section>
  );
};

export default StatsSection;
