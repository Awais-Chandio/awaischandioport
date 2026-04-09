/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#07111f",
        surface: "#0f1b2d",
        surfaceAlt: "#15243a",
        outline: "#23314a",
        muted: "#95a3b8",
        brand: "#f59e0b",
        accent: "#22d3ee",
        success: "#34d399",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        soft: "0 25px 70px rgba(3, 10, 21, 0.35)",
      },
    },
  },
  plugins: [],
};
