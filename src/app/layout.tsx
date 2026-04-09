import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { type ReactNode } from "react";
import { ThemeProvider } from "@/theme/ThemeContext";
import { getThemeInitInlineScript } from "@/theme/themeConstants";
import { SpeedInsightsClient } from "@/app/speed-insights-client";

import { rootMetadata } from "@/lib/seo";
import { localeConfig } from "@/config/locale";

/**
 * Root metadata for the entire site.
 * Configuration is in src/lib/seo/config.ts
 */
export const metadata = rootMetadata;

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html
			lang={localeConfig.htmlLang}
			suppressHydrationWarning
			className={`${GeistSans.variable} ${GeistMono.variable} min-h-dvh`}
		>
			<head>
				{/* Blocking: must run before first paint; source: themeConstants.getThemeInitInlineScript */}
				<script dangerouslySetInnerHTML={{ __html: getThemeInitInlineScript() }} />
			</head>
			<body className="min-h-dvh font-sans">
				<ThemeProvider>{children}</ThemeProvider>
				<SpeedInsightsClient />
			</body>
		</html>
	);
}
