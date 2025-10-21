/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
      },
      colors: {
        primary: {
          50: "#e8f4ff",
          100: "#cae6ff",
          200: "#a3d5ff",
          300: "#7ac3ff",
          400: "#51b1ff",
          500: "#03045e", // Main primary color
          600: "#020339",
          700: "#020228",
          800: "#01011c",
          900: "#000111",
        },
        secondary: {
          50: "#fef6ff",
          100: "#fceaff",
          200: "#f9d4ff",
          300: "#f5beff",
          400: "#f1a8ff",
          500: "#6f2dbd", // Purple accent
          600: "#5a249a",
          700: "#451c77",
          800: "#301354",
          900: "#1b0b31",
        },
        light: {
          50: "#ffffff",
          100: "#fefefe",
          200: "#fcfcfc",
          300: "#f8f8f8",
          400: "#f5f5f5",
          500: "#caf0f8", // Light cyan
          600: "#a2d6df",
          700: "#7abdc6",
          800: "#52a3ad",
          900: "#2a8994",
        },
        neuro: {
          light: "#caf0f8",
          dark: "#03045e",
          purple: "#6f2dbd",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        countUp: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        "neuro-sm": "4px 4px 8px #a8c5d1, -4px -4px 8px #ffffff",
        neuro: "8px 8px 16px #a8c5d1, -8px -8px 16px #ffffff",
        "neuro-lg": "12px 12px 24px #a8c5d1, -12px -12px 24px #ffffff",
        "neuro-inset": "inset 4px 4px 8px #a8c5d1, inset -4px -4px 8px #ffffff",
        "neuro-dark": "8px 8px 16px #020339, -8px -8px 16px #050875",
        "neuro-purple": "8px 8px 16px #5a249a, -8px -8px 16px #8436e0",
      },
    },
  },
  plugins: [],
};
