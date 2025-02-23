/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#ffffff",
        darkBg: "#1a1a2e",
        lightText: "#000000",
        darkText: "#e0e0e0",
        darkNav: "#16213e",
        lightNav: "#f3f3f3",
      },
    },
  },
  plugins: [],
};
