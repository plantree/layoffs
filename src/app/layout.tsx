import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layoffs Tracker",
  description: "专注中国就业市场",
  authors: [{ name: "plantree", url: "https://plantree.me/" }],
  keywords: ["裁员", "中国", "就业"],
  viewport: { width: "device-width", initialScale: 1 },
  alternates: { canonical: "https://layoffs-tracker.plantree.me/" },
  icons: [
    "https://layoffs-tracker.plantree.me/favicon.jpg",
  ],
  openGraph: {
    title: "Layoffs Tracker",
    description: "专注中国就业市场",
    type: "website",
    url: "https://layoffs-tracker.plantree.me/",
    locale: "zh_CN",
    siteName: "Layoffs Tracker",
    images: [
      "https://layoffs-tracker.plantree.me/favicon.jpg",
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
