import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      boxShadow: {
        card: "0 0 10px rgba(0, 0, 0, 0.1)",
        bar: "0px 1px 3px rgba(0, 0, 0, 0.3)"
      },
      textShadow: {
        sm: "0 1px 1px rgba(0, 0, 0, 0.2)",
        default: "0 1px 2px rgba(0, 0, 0, 0.2)",
        md: "0 2px 4px rgba(0, 0, 0, 0.2)"
      },
      colors: {
        darkest: "#463f3a",
        dark: "#8a817c",
        light: "#bcb8b1",
        lightest: "#f4f3ee",
        highlight: "#e0afa0",
        "highlight-dark": "#c78c7e",
      }
    }
  },
  plugins: []
};
export default config;
