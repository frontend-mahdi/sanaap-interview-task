/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#008e9c",
          dark: "#00717c",
          light: "#e0f4f6",
        },
        secondary: {
          DEFAULT: "#d31853",
          light: "#fbe7ee",
        },
      },
      fontFamily: {
        sans: ["Vazirmatn", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};