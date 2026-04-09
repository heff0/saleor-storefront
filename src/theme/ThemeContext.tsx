"use client";

import {
	createContext,
	useContext,
	useLayoutEffect,
	useMemo,
	useSyncExternalStore,
	type ReactNode,
} from "react";
import {
	getThemeSnapshot,
	getServerThemeSnapshot,
	subscribeTheme,
	toggleThemeAction,
	notifyThemeSubscribers,
	type Theme,
} from "./themeStore";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

	useLayoutEffect(() => {
		notifyThemeSubscribers();
	}, []);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme: toggleThemeAction,
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
