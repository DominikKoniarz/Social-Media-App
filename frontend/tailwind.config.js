/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#00D2A8",
        color2: "#00BD97",
      },
    },
    screens: {
      md: { min: "769px" },
    },
  },
  plugins: [],
};
