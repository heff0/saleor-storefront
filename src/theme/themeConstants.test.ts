import { describe, it, expect } from "vitest";
import { getThemeInitInlineScript, THEME_STORAGE_KEY } from "./themeConstants";

describe("themeConstants", () => {
	it("exposes a stable storage key", () => {
		expect(THEME_STORAGE_KEY).toBe("theme");
	});

	it("getThemeInitInlineScript references the storage key and dark-mode resolution", () => {
		const script = getThemeInitInlineScript();
		expect(script).toContain('"theme"');
		expect(script).toContain("localStorage.getItem");
		expect(script).toContain("prefers-color-scheme: dark");
		expect(script).toContain("document.documentElement.classList.add");
		expect(script).toContain('"dark"');
		expect(script).toMatch(/^\(function\(\)\{/);
		expect(script).toMatch(/\}\)\(\);$/);
	});
});
