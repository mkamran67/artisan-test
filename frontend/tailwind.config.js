/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			animation: {
				"bounce-one": "bounce 1000ms infinite",
				"bounce-two": "bounce 2000ms infinite",
				"bounce-three": "bounce 3000ms infinite",
			},
			fontFamily: {
				sans: ["InterVariable", "sans-serif"],
			},
		},
	},
	plugins: [],
};
