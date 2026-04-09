import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";
import definitions from "./src/lib/core/theme/themeUtils/definitions.json";

export default {
	safelist: [
		{
			// TODO: refine pattern to be specific to definitions to further optimize CSS size
			pattern: /bg-+/,
		},
	],
	// Selector strategy (Tailwind v3.4+): toggles dark mode via a class on the root (e.g. `.dark` on <html>)
	darkMode: "selector",
	content: ["./src/**/*.{html,js,ts,jsx,tsx,json}"],
	theme: {
		extend: {
			...definitions,
			fontFamily: {
				sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
				mono: ["var(--font-geist-mono)", "monospace"],
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
				"skeleton-fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"cart-badge-pop": {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.4)" },
					"100%": { transform: "scale(1)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"skeleton-delayed": "skeleton-fade-in 0.2s ease-in 0.25s forwards",
				"skeleton-delayed-long": "skeleton-fade-in 0.2s ease-in 0.4s forwards",
				"cart-badge-pop": "cart-badge-pop 0.3s ease-out",
			},
		},
	},
	plugins: [typography, forms, containerQueries, tailwindcssAnimate],
} satisfies Config;
