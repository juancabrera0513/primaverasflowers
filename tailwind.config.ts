// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "var(--brand)", accent: "var(--brand-accent)" },
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        card: "var(--card)",
        ring: "var(--ring)",

        softterracotta: "var(--color-soft-terracotta)",
        terracotta: "var(--color-terracotta)",
        olive: "var(--color-olive)",
        sand: "var(--color-sand)",
        smokey: "var(--color-smokey)",
        stone: "var(--color-stone)",
        offwhite: "var(--color-offwhite)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.08)" },
    },
  },
  plugins: [],
};

export default config;
