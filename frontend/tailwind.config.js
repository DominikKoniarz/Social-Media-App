/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#00D2A8",
        color2: "#00BD97",
      },
      fontFamily: {
        family1: ["SF Compact Display"],
        family2: ["Satoshi"],
      },
    },
  },
  plugins: [require("flowbite-react")],
};
