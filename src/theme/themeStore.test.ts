/** @vitest-environment happy-dom */
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
	getThemeSnapshot,
	getServerThemeSnapshot,
	subscribeTheme,
	commitTheme,
	toggleThemeAction,
	notifyThemeSubscribers,
	resetThemeListenersForTests,
} from "./themeStore";
import { THEME_STORAGE_KEY } from "./themeConstants";

function createLocalStorageMock(): Storage {
	const data: Record<string, string> = {};
	return {
		get length() {
			return Object.keys(data).length;
		},
		clear() {
			for (const k of Object.keys(data)) delete data[k];
		},
		getItem(key: string) {
			return Object.prototype.hasOwnProperty.call(data, key) ? data[key]! : null;
		},
		key(index: number) {
			return Object.keys(data)[index] ?? null;
		},
		removeItem(key: string) {
			delete data[key];
		},
		setItem(key: string, value: string) {
			data[key] = value;
		},
	};
}

describe("themeStore", () => {
	beforeEach(() => {
		vi.stubGlobal("localStorage", createLocalStorageMock());
		resetThemeListenersForTests();
		document.documentElement.classList.remove("dark");
		localStorage.removeItem(THEME_STORAGE_KEY);
	});

	it("getServerThemeSnapshot is always light for SSR", () => {
		expect(getServerThemeSnapshot()).toBe("light");
	});

	it("getThemeSnapshot follows the dark class on documentElement", () => {
		expect(getThemeSnapshot()).toBe("light");
		document.documentElement.classList.add("dark");
		expect(getThemeSnapshot()).toBe("dark");
		document.documentElement.classList.remove("dark");
		expect(getThemeSnapshot()).toBe("light");
	});

	it("commitTheme updates classList and localStorage", () => {
		commitTheme("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(localStorage.getItem("theme")).toBe("dark");

		commitTheme("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(localStorage.getItem("theme")).toBe("light");
	});

	it("toggleThemeAction flips between light and dark", () => {
		commitTheme("light");
		toggleThemeAction();
		expect(getThemeSnapshot()).toBe("dark");
		toggleThemeAction();
		expect(getThemeSnapshot()).toBe("light");
	});

	it("notifies subscribers when theme commits or notifyThemeSubscribers runs", () => {
		const calls: string[] = [];
		const unsub = subscribeTheme(() => {
			calls.push(getThemeSnapshot());
		});

		commitTheme("dark");
		expect(calls).toEqual(["dark"]);

		notifyThemeSubscribers();
		expect(calls).toEqual(["dark", "dark"]);

		unsub();
		commitTheme("light");
		expect(calls).toEqual(["dark", "dark"]);
	});
});
