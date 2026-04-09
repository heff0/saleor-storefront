import { THEME_STORAGE_KEY } from "./themeConstants";

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

/** Clears external-store subscribers (for unit tests; avoids cross-test leakage). */
export function resetThemeListenersForTests(): void {
	listeners.clear();
}

function emit() {
	for (const listener of listeners) {
		listener();
	}
}

export function getThemeSnapshot(): Theme {
	if (typeof document === "undefined") {
		return "light";
	}
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getServerThemeSnapshot(): Theme {
	return "light";
}

export function subscribeTheme(onStoreChange: () => void) {
	if (typeof window === "undefined") {
		return () => {};
	}
	listeners.add(onStoreChange);
	return () => listeners.delete(onStoreChange);
}

export function commitTheme(next: Theme) {
	const htmlEl = document.documentElement;
	if (next === "dark") {
		htmlEl.classList.add("dark");
		localStorage.setItem(THEME_STORAGE_KEY, "dark");
	} else {
		htmlEl.classList.remove("dark");
		localStorage.setItem(THEME_STORAGE_KEY, "light");
	}
	emit();
}

/** After hydration, re-run listeners so React matches the DOM set by the blocking script. */
export function notifyThemeSubscribers() {
	emit();
}

export function toggleThemeAction() {
	const next: Theme = getThemeSnapshot() === "dark" ? "light" : "dark";
	commitTheme(next);
}
