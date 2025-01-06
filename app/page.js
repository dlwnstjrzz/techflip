"use client";

import SearchInput from "@/components/search/SearchInput";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch("/api/naver/trend", {
          method: "POST",
        });
        const data = await response.json();

        if (data.results) {
          console.log(data.results);
          // 결과를 ratio 기준으로 정렬하고 상위 6개만 선택
          const sortedKeywords = data.results.map((item) => item.title);

          setTrendingKeywords(sortedKeywords);
        }
      } catch (error) {
        console.error("Failed to fetch trends:", error);
        // 에러 시 기본 키워드 사용
        setTrendingKeywords([
          "아이폰 15",
          "갤럭시 S24",
          "맥북 프로",
          "아이패드",
          "에어팟",
          "갤럭시 워치",
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrends();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* 로고 + 히어로 섹션 */}
      <section className="relative bg-white pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            {/* 로고 */}
            <div className="text-5xl font-kanit tracking-tight text-foreground">
              DAMOA
            </div>

            {/* 히어로 텍스트 */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              새상품부터 중고까지
              <br />
              <span className="text-blue-600">한눈에 비교</span>하세요
            </h1>

            {/* 검색창 */}
            <div className="max-w-2xl mx-auto pt-4">
              <SearchInput />
            </div>

            {/* 인기 검색어 */}
            <div className="pt-2">
              <div className="text-sm text-gray-400 mb-3">
                {isLoading ? "인기 검색어 로딩중..." : "실시간 인기 검색어"}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {(isLoading ? Array(6).fill("") : trendingKeywords).map(
                  (keyword, index) => (
                    <Link
                      key={keyword || index}
                      href={`/search?q=${encodeURIComponent(keyword)}`}
                      className={`px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-all ${
                        isLoading
                          ? "animate-pulse bg-gray-100 min-w-[100px]"
                          : ""
                      }`}
                    >
                      {keyword || "　"}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 이미지 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              어떻게 사용하나요?
            </h2>
            <p className="text-gray-500 mb-12">
              새상품 최저가부터 중고 시세까지 한눈에 비교하고,
              <br />
              실시간 가격 변동 그래프로 최적의 구매 시점을 찾아보세요
            </p>
            <div className="rounded-2xl overflow-hidden shadow-xl border bg-white">
              <img
                src="/images/introduce.png"
                alt="주요 기능 미리보기"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
