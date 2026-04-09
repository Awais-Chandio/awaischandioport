"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionIntro from "@/components/ui/SectionIntro";
import { aboutTabs, expertiseCards, personalInfo } from "@/data/portfolio";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const currentTab = aboutTabs.find((tab) => tab.id === activeTab);

  const handleTabChange = (nextTab) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
  };

  return (
    <section className="section-spacing grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start" id="about">
      <div className="space-y-5">
        <div className="panel overflow-hidden p-4 sm:p-6">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-surfaceAlt">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-brand/10" />
            <Image
              src={personalInfo.aboutImage}
              alt={personalInfo.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {expertiseCards.map((card) => (
            <div key={card.title} className="panel p-5">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <SectionIntro
          eyebrow="About Me"
          title="Better structure, cleaner UI, and practical product thinking."
          description="I focus on cross-platform app delivery that balances visual quality with dependable engineering. My work usually sits where Flutter implementation, Firebase connectivity, and user experience need to align."
        />

        <div className="panel p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            {aboutTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-white text-slate-950"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`panel p-6 ${isPending ? "opacity-60" : ""}`}
        >
          {currentTab.items ? (
            <div className="flex flex-wrap gap-3">
              {currentTab.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          {currentTab.entries ? (
            <div className="space-y-4">
              {currentTab.entries.map((entry) => (
                <div
                  key={`${entry.title}-${entry.subtitle}`}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                      <p className="text-sm text-accent">{entry.subtitle}</p>
                    </div>
                    <p className="text-sm text-slate-300">{entry.meta}</p>
                  </div>
                  {entry.description ? (
                    <p className="mt-3 text-sm leading-6 text-muted">{entry.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
