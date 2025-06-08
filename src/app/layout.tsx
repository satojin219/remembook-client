import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "remembook - AIで読書の理解を深める",
  description:
    "読書の理解度を高めるAI学習アプリ。要約をもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? "";

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <main className="flex-1">{children}</main>
        <Footer />
        <Script src="/main-app.js" strategy="afterInteractive" nonce={nonce} />
        <GoogleAnalytics gaId="G-N04844P4XD" />
      </body>
    </html>
  );
}
