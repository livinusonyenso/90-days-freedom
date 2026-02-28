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
        brand: {
          bg: "#050f05",
          "bg-mid": "#071a07",
          "bg-card": "#0c230c",
          "bg-light": "#0f2d0f",
          green: "#00e676",
          "green-dim": "#00c853",
          "green-bright": "#69ff47",
          "green-teal": "#00bfa5",
          border: "#1a3d1a",
          "border-bright": "#2d6a2d",
          text: "#ffffff",
          "text-muted": "#a8c5a8",
          "text-dim": "#6b956b",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(ellipse at center, #0a2e0a 0%, #050f05 70%)",
        "radial-green-bright":
          "radial-gradient(ellipse at 50% 40%, #0d3d0d 0%, #050f05 65%)",
        "card-gradient":
          "linear-gradient(135deg, #0c230c 0%, #071a07 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #00e676 0%, #00bfa5 100%)",
        "pricing-featured":
          "linear-gradient(145deg, #0d3020 0%, #0a2218 50%, #071a07 100%)",
      },
      boxShadow: {
        "green-glow": "0 0 30px rgba(0, 230, 118, 0.15)",
        "green-glow-sm": "0 0 15px rgba(0, 230, 118, 0.1)",
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 230, 118, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 230, 118, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
