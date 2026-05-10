import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06111f",
        deep: "#091827",
        tide: "#0e314d",
        harbor: "#164c68",
        foam: "#f4f0e8",
        mist: "#b7c8d1",
        sand: "#d7c5a5",
        rust: "#b86f52",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        coast: "0 24px 80px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
};

export default config;
