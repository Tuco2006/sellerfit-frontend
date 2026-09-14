import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#05070d",
          900: "#0b0f1a",
          800: "#111827",
          700: "#1a2236",
        },
        brand: {
          400: "#7c9dff",
          500: "#5b7fff",
          600: "#3f5fe0",
        },
        accent: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(91,127,255,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
