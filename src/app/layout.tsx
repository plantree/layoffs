import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "裁员追踪器 | Layoffs Tracker",
  description: "专注中国就业市场",
  authors: [{ name: "plantree", url: "https://plantree.me/" }],
  keywords: ["裁员", "中国", "就业"],
  viewport: { width: "device-width", initialScale: 1 },
  alternates: { canonical: "https://layoffs-tracker.plantree.me/" },
  icons: [
    "https://layoffs-tracker.plantree.me/favicon.jpg",
  ],
  openGraph: {
    title: "裁员追踪器 | Layoffs Tracker",
    description: "专注中国就业市场",
    type: "website",
    url: "https://layoffs-tracker.plantree.me/",
    locale: "zh_CN",
    siteName: "裁员追踪器 | Layoffs Tracker",
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
      <head>
        <GoogleAnalytics gaId="G-K1JTYXHCKY" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
