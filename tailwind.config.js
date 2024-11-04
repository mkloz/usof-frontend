/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		borderWidth: {
			DEFAULT: "1px",
			0: "0",
			1: "1px",
			2: "2px",
			3: "3px",
			4: "4px",
			5: "5px",
			6: "6px",
		},
		extend: {
			screens: {
				xs: "375px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
			},
			spacing: {
				xs: "375px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
			},
			height: {
				"screen-no-header": "calc(100vh - var(--header-height))",
			},
			maxHeight: {
				"screen-no-header": "calc(100vh - var(--header-height))",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.5rem",
				"6xl": "3rem",
				"1/2": "50%",
				"1/3": "33.333333%",
				"1/4": "25%",
				"1/5": "20%",
				"1/6": "16.666667%",
				"1/12": "8.333333%",
			},
			colors: {
				mix: {
					primary: {
						DEFAULT: `color-mix(
									in srgb,
									currentColor 20%,
									var(--bg-color-primary)
								);`,
						10: `color-mix(
									in srgb,
									currentColor 10%,
									var(--bg-color-primary)
								);`,
						20: `color-mix(
									in srgb,
									currentColor 20%,
									var(--bg-color-primary)
								);`,
						30: `color-mix(
									in srgb,
									currentColor 30%,
									var(--bg-color-primary)
								);`,
					},
				},
				bg: {
					primary: "var(--bg-color-primary)",
					secondary: "var(--bg-color-secondary)",
				},
				border: {
					primary: "var(--border-color-primary)",
					secondary: "var(--border-color-secondary)",
				},
				text: {
					primary: "var(--text-color-primary)",
					secondary: "var(--text-color-secondary)",
					disabled: "var(--text-color-disabled)",
					opposite: "var(--text-color-opposite)",
				},
				red: "var(--color-red)",
				yellow: "var(--color-yellow)",
				green: "var(--color-green)",
				gray: "var(--color-gray)",
				purple: "var(--color-purple)",
			},
			borderColor: { DEFAULT: "var(--border-color-primary)" },
			textColor: { DEFAULT: "var(--text-color-primary)" },
			backgroundColor: { DEFAULT: "var(--bg-color-primary)" },
			inset: {
				header: "var(--header-height)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				jump: {
					"0%, 30%, 75%": { transform: "translateY(0px)" },
					"50%": {
						transform: "translateY(-200%)",
						"animation-timing-function": "ease-in",
					},
				},
				morph: {
					"0%, 10%, 40%, 70%, 85%, 100%": { transform: "scaleY(1)" },
					"20%, 25%": {
						transform: "scaleY(0.6) scaleX(1.3)",
						"animation-timing-function": "ease-in-out",
					},
					"30%": {
						transform: "scaleY(1.15) scaleX(0.9)",
						"animation-timing-function": "ease-in-out",
					},
					"75%": { transform: "scaleY(0.8) scaleX(1.2)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				jump: "jump 1.75s ease-in-out infinite",
				morph: "morph 1.75s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
