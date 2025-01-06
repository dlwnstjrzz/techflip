"use client";

import MainSearchInput from "@/components/search/MainSearchInput";
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
            <div className="max-w-2xl mx-auto pt-8 px-4">
              <div className="relative group">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 
                  rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"
                />
                <MainSearchInput />
              </div>
              <p className="mt-3 text-center text-sm text-gray-500">
                전자제품의 새상품부터 중고까지 한 번에 검색해보세요
              </p>
            </div>

            {/* 인기 검색어 */}
            <div className="pt-12">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                {isLoading ? "인기 검색어 로딩중..." : "실시간 인기 검색어"}
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 max-w-4xl mx-auto px-4">
                {(isLoading ? Array(10).fill("") : trendingKeywords).map(
                  (keyword, index) => (
                    <Link
                      key={keyword || index}
                      href={`/search?q=${encodeURIComponent(keyword)}`}
                      className={`group relative px-5 py-2.5 bg-white border hover:border-blue-500 hover:text-blue-600 
                        rounded-full text-sm text-gray-600 transition-all duration-200 
                        hover:shadow-md hover:-translate-y-0.5 ${
                          isLoading
                            ? "animate-pulse bg-gray-50 min-w-[120px]"
                            : ""
                        }`}
                    >
                      {!isLoading && (
                        <span
                          className="absolute -top-2 -left-1 flex items-center justify-center 
                          w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-medium"
                        >
                          {index + 1}
                        </span>
                      )}
                      <span className="truncate block text-center">
                        {keyword || "　"}
                      </span>
                      {!isLoading && (
                        <span
                          className="absolute inset-0 rounded-full bg-blue-50 opacity-0 
                          group-hover:opacity-10 transition-opacity duration-200"
                        />
                      )}
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
