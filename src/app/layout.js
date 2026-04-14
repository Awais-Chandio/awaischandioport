import "./globals.css";

export const metadata = {
  title: "Muhammad Awais | Software Engineer (React Native)",
  description:
    "Premium developer portfolio of Muhammad Awais, a Software Engineer focused on React Native, cross-platform mobile applications, polished UI development, and scalable product delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
