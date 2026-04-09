"use client";

import { Button } from "@/ui/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/theme/ThemeContext";

export function ThemeToggle() {
	const { toggleTheme } = useTheme();

	return (
		<Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
			{/* DOM + `.dark` on html drive visibility — avoids SSR/client icon mismatch */}
			<SunIcon className="h-5 w-5 dark:hidden" aria-hidden />
			<MoonIcon className="hidden h-5 w-5 dark:block" aria-hidden />
		</Button>
	);
}
