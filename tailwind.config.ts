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
          gold: "#f28c28",
          orange: "#f28c28",
          darkgold: "#e67a14",
          darkorange: "#e67a14",
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