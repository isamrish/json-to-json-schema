import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        solardrift: {
          primary: "#0d9488",
          secondary: "#7dd3fc",
          accent: "#a5f3fc",
          neutral: "#d1d5db",
          "base-100": "#ffffff",
          info: "#7dd3fc",
          success: "#22c55e",
          warning: "#fcd34d",
          error: "#e11d48",
        },
      },
    ],
  },
} satisfies Config;
