import "./globals.css";

export const metadata = {
  title: "Muhammad Awais | Flutter Developer Portfolio",
  description:
    "Responsive portfolio of Muhammad Awais, a Flutter developer focused on scalable mobile apps, Firebase integrations, and polished user experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
