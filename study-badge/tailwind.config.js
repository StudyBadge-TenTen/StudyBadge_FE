/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {
      boxShadow: {
        card: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
      },
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [],
};
