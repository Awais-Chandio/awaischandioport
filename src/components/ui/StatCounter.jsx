"use client";

import CountUp from "react-countup";
import { useReducedMotion } from "framer-motion";

const StatCounter = ({ value, suffix = "", prefix = "", duration = 2, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();
  const numericValue = typeof value === "number" ? value : parseFloat(value);
  const isNumeric = !Number.isNaN(numericValue);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {prefix}
        {numericValue.toLocaleString("en-US")}
        {suffix}
      </span>
    );
  }

  return (
    <CountUp
      end={numericValue}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
      separator=","
      enableScrollSpy
      scrollSpyOnce
      scrollSpyDelay={100}
      className={className}
    />
  );
};

export default StatCounter;
