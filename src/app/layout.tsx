import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { headers } from "next/headers";
import { Partytown } from "@qwik.dev/partytown/react";

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
  openGraph: {
    title: "remembook - AIで読書の理解を深める",
    description:
      "読書の理解度を高めるAI学習アプリ。要約作成、AI質問生成、スコアリング、最適なタイミングでの復習リマインドで、効率的な学習をサポートします。",
    images: [{ url: "https://remembook.com/ogp.jpg" }],
    type: "website",
    siteName: "remembook",
    locale: "ja",
    url: "https://remembook.com",
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
        <Partytown debug={true} forward={["dataLayer.push"]} />
        <script
          id="pt-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-N04844P4XD"
          type="text/partytown"
        />

        <script id="pt-gtag-init" type="text/partytown">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N04844P4XD', { send_page_view: false });
          `}
        </script>
      </body>
    </html>
  );
}
