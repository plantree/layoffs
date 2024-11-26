import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layoffs Tracker",
  description: "专注中国就业市场",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
