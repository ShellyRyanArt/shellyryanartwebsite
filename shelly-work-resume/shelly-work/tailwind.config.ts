import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F4EFE4",
        ink: "#1A1714",
        amber: "#8B6914",
        sepia: "#6B5A3E",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sc: ["Cormorant SC", "Georgia", "serif"],
        sans: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
