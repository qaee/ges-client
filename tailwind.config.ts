import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gws: {
          gold: "#C9A961",
          darkgold: "#B8924A",
          navy: "#1a2332",
          darknavy: "#0f1824",
          gray: "#6B7280",
        }
      },
    },
  },
  plugins: [],
};
export default config;