import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dae3f0",
          200: "#b6c8e1",
          300: "#8aa6cd",
          400: "#5d83b8",
          500: "#3e66a0",
          600: "#2f5188",
          700: "#264170",
          800: "#1d325a",
          900: "#13223e",
          950: "#0a1428",
        },
        sky: {
          50: "#f0f7fb",
          100: "#dbecf6",
          200: "#bcdcef",
          300: "#8dc3e2",
          400: "#5aa3cf",
          500: "#3a86ba",
          600: "#2a6c9c",
          700: "#23577f",
          800: "#1f4a6a",
          900: "#1d3e58",
        },
        charcoal: {
          50: "#f6f7f8",
          100: "#eaecef",
          200: "#cfd4da",
          300: "#a8b1bb",
          400: "#7d8893",
          500: "#5e6973",
          600: "#4b545d",
          700: "#3d454c",
          800: "#33393f",
          900: "#1f2327",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 16px -4px rgb(13 34 62 / 0.08)",
        cardHover: "0 4px 8px 0 rgb(0 0 0 / 0.06), 0 12px 32px -8px rgb(13 34 62 / 0.18)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        blob: "blob 18s ease-in-out infinite",
        "blob-slow": "blob 26s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
