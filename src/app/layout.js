import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppToaster from "@/components/AppToaster";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";
import { displayFont, sansFont } from "@/lib/fonts";

export const metadata = {
  title: "Muhammad Awais | Mobile App Engineer",
  description:
    "Portfolio of Muhammad Awais, a mobile app engineer building polished product flows, service integrations, and maintainable cross-platform interfaces.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} overflow-x-hidden dark`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden bg-canvas text-fg antialiased">
        <ThemeProvider>
          <SmoothScroll />
          {children}
          <AppToaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
