/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(2.5rem, 1.5rem + 4vw, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-xl": [
          "clamp(2.25rem, 1.4rem + 3.2vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
        "display-lg": [
          "clamp(1.875rem, 1.3rem + 2.2vw, 3.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-md": [
          "clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
          { lineHeight: "1.2", letterSpacing: "0em" },
        ],
        "body-lg": ["clamp(1rem, 0.94rem + 0.3vw, 1.125rem)", { lineHeight: "1.7" }],
      },
      colors: {
        canvas: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          soft: "rgb(var(--canvas-soft) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          dim: "rgb(var(--fg-dim) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "0 25px 70px -20px rgb(0 0 0 / 0.45)",
        lift: "0 30px 90px -30px rgb(0 0 0 / 0.55)",
        // Accent glows read from the theme token so they retune with light mode.
        glow: "0 0 20px rgb(var(--accent) / 0.5)",
        "glow-soft": "0 0 28px rgb(var(--accent) / 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
