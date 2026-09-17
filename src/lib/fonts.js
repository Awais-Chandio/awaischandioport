import localFont from "next/font/local";

export const displayFont = localFont({
  src: [
    { path: "../../public/fonts/clash-display/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const sansFont = localFont({
  src: [
    { path: "../../public/fonts/general-sans/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/general-sans/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/general-sans/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/general-sans/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
