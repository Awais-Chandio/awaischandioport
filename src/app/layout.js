import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Muhammad Awais | Software Engineer (React Native)",
  description:
    "Portfolio of Muhammad Awais, a Software Engineer focused on React Native mobile application development, Flutter experience, APIs, Firebase, auth, and practical app features.",
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
