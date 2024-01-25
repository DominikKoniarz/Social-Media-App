/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			maxWidth: {
				92: "23rem",
			},
			width: {
				92: "23rem",
			},
			boxShadow: {
				"chat-item": "inset 25px 1px 0px -20px #38b2ac",
			},
			colors: {
				color1: "#00D2A8",
				color2: "#00BD97",
			},
			fontFamily: {
				family1: ["SF Compact Display"],
				family2: ["Satoshi"],
			},
			screens: {
				xs: "400px",
			},
		},
	},
	plugins: [require("flowbite-react")],
};
