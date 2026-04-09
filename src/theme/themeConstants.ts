/**
 * Single source for theme persistence key and the blocking init script.
 * Keep resolve rules aligned with `themeStore` (storage + prefers-color-scheme when unset).
 */
export const THEME_STORAGE_KEY = "theme";

/**
 * Blocking inline script for the root layout. Runs before paint so `dark` is on
 * `<html>` before CSS variables apply — pairs with `useSyncExternalStore` + post-hydration notify.
 */
export function getThemeInitInlineScript(): string {
	const k = JSON.stringify(THEME_STORAGE_KEY);
	// Mirrors theme resolution: explicit "dark", else system when no stored value
	return `(function(){try{var k=${k};var t=localStorage.getItem(k);if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;
}
