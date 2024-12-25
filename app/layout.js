import "./globals.css";
import Header from "@/components/layout/Header";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const kanit = localFont({
  src: "../public/fonts/Kanit-BoldItalic.ttf",
  variable: "--font-kanit",
});

export const metadata = {
  title: "DAMOA | 새상품·중고 가격 비교",
  description: "새 제품과 중고 제품을 한 눈에 비교하세요!",
  // metadataBase: new URL("https://damoa.vercel.app"),
  icons: {
    icon: "/icon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // openGraph: {
  //   title: "DAMOA - 새상품·중고 가격 비교",
  //   description:
  //     "새상품과 중고 가격을 한눈에 비교하고, 최적의 구매 시점을 찾아보세요.",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "DAMOA - 새상품·중고 가격 비교",
  //   description:
  //     "새상품과 중고 가격을 한눈에 비교하고, 최적의 구매 시점을 찾아보세요.",
  //   images: ["/og-image.png"],
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${kanit.variable}`}>
      <body className="font-pretendard">
        <Header showOnlyInSubPages />
        {children}
      </body>
    </html>
  );
}
