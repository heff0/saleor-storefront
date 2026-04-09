"use client";

import dynamic from "next/dynamic";

/** Client-only: `ssr: false` is required here (not in Server Components). Avoids React 19 hydration mismatch with @vercel/speed-insights (Suspense vs Activity). */
const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights), {
	ssr: false,
});

export function SpeedInsightsClient() {
	return <SpeedInsights />;
}
