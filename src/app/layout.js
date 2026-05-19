import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Muhammad Awais | Mobile App Engineer",
  description:
    "Portfolio of Muhammad Awais, a mobile app engineer building polished product flows, service integrations, and maintainable cross-platform interfaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
