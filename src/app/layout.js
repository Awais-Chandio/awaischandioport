import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppToaster from "@/components/AppToaster";
import BeyondTheCodeProvider from "@/components/beyond/BeyondTheCodeProvider";
import CommandPaletteProvider from "@/components/command-palette/CommandPaletteProvider";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";
import { displayFont, sansFont } from "@/lib/fonts";

const title = "Muhammad Awais | React Native Developer";
const description =
  "Portfolio of Muhammad Awais, a React Native developer building cross-platform mobile apps in React Native and Flutter for Android and iOS.";

// Absolute URLs for icons and social cards. Vercel supplies VERCEL_URL per
// deployment; set NEXT_PUBLIC_SITE_URL to pin the canonical custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Muhammad Awais — Mobile App Engineer",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  // Child routes set only their own title; the suffix is appended here so it
  // can never drift page to page.
  title: { default: title, template: "%s | Muhammad Awais" },
  description,
  applicationName: "Muhammad Awais",
  authors: [{ name: "Muhammad Awais" }],
  creator: "Muhammad Awais",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: "Muhammad Awais",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} overflow-x-hidden`}
      suppressHydrationWarning
    >
      {/* `#top` anchors the footer's back-to-top link on every route. There is no
          `bg-canvas` here or on <main>: the page colour is painted by <html>, and an
          opaque body would sit above the fixed ambient layer and hide it. */}
      <body id="top" className="overflow-x-hidden text-fg antialiased">
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll />
            {/* Fixed chrome lives outside app/template.js on purpose. The route
                transition animates a transform, and a transformed ancestor
                becomes the containing block for its fixed descendants — leaving
                these inside would drag the header and the background down with
                every navigation. Keeping them here also means the nav no longer
                remounts per route, so its mobile panel can animate closed. */}
            <BeyondTheCodeProvider>
              <CommandPaletteProvider>
                <AnimatedBackground />
                <Navbar />
                {children}
              </CommandPaletteProvider>
            </BeyondTheCodeProvider>
            <AppToaster />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
