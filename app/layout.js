import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechFlip",
  description: "새 제품과 중고 제품을 한 눈에 비교하세요!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header showOnlyInSubPages />
        {children}
      </body>
    </html>
  );
}
