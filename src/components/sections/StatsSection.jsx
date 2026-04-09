"use client";

import dynamic from "next/dynamic";
import { stats } from "@/data/portfolio";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const StatsSection = () => {
  return (
    <section className="section-spacing">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="panel relative overflow-hidden p-6"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand/10 blur-2xl" />
            <div className="relative space-y-3">
              <div className="flex items-end gap-1 text-4xl font-semibold text-white">
                {item.prefix ? <span>{item.prefix}</span> : null}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={item.value}
                  locale="en-US"
                  className="text-4xl font-semibold"
                  configs={(_, index) => ({
                    mass: 1,
                    friction: 90,
                    tension: 160 * (index + 1),
                  })}
                />
                {item.suffix ? <span>{item.suffix}</span> : null}
              </div>
              <p className="text-lg font-medium text-white">{item.label}</p>
              <p className="text-sm leading-6 text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
