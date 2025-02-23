import "./globals.css";
import Header from "@/components/layout/Header";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const kanit = localFont({
  src: "../public/fonts/Kanit-BoldItalic.ttf",
  variable: "--font-kanit",
});

export const metadata = {
  title: "모아바 | 전자제품 가격비교",
  description: "모아바에서 새상품부터 중고까지 한눈에 비교하세요!",
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "모아바",
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-icon.png",
  },
  metadataBase: new URL("https://moaba.it"),
  openGraph: {
    title: "모아바 | 전자제품 가격비교",
    description:
      "새상품과 중고 가격을 한눈에 비교하고, 최적의 구매 시점을 찾아보세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://moaba.it",
    siteName: "모아바",
    images: [
      {
        url: "/icons/og-logo.png",
        width: 1200,
        height: 630,
        alt: "모아바 - 전자제품 가격비교",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "모아바 | 전자제품 가격비교",
    description:
      "새상품과 중고 가격을 한눈에 비교하고, 최적의 구매 시점을 찾아보세요.",
    images: ["/icons/og-logo.png"],
    creator: "@moaba",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${kanit.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F012CFLT0X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F012CFLT0X');
          `}
        </Script>
      </head>
      <body className="font-pretendard">
        <Header showOnlyInSubPages />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
