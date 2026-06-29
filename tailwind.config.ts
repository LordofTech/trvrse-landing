/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          light: "#0F1F35",
          lighter: "#132640",
        },
        electric: "#2D7DD2",
        emerald: "#06D6A0",
        subtext: "#8899AA",
      },
      fontFamily: {
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(45, 125, 210, 0.3)",
        "glow-sm": "0 0 20px rgba(45, 125, 210, 0.2)",
        "glow-red": "0 0 30px rgba(239, 68, 68, 0.15)",
        "glow-emerald": "0 0 30px rgba(6, 214, 160, 0.2)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
