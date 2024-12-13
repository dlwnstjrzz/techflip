"use client";

import { useRouter } from "next/navigation";
import SearchInput from "@/components/search/SearchInput";
import { ChevronRight, History, Sparkles, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white relative">
      {/* 배경 효과 개선 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
        <div className="absolute -top-24 -right-24 w-[40rem] h-[40rem] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      {/* 헤더 */}
      <header className="relative z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-gray-900">
                TechFlip
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <button
                onClick={() => router.push("/search")}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                제품 검색
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero 섹션 */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="relative py-20 flex flex-col items-center text-center">
            <div className="inline-block mb-8">
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                  새상품·중고 가격
                  <br />
                  한눈에 비교
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-800 font-medium mb-12 max-w-3xl">
              새상품과 중고 가격을 한눈에 비교하고,
              <br />
              최적의 구매 시점을 찾아보세요.
            </p>

            {/* 검색 섹션 */}
            <div className="w-full max-w-2xl">
              <div className="relative">
                <SearchInput className="shadow-lg !py-6 !text-lg !bg-gray-50 hover:!bg-gray-100/80 !rounded-2xl focus-within:!shadow-xl transition-all" />
              </div>
            </div>

            {/* 인기 검색어 - 간격 조정 */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["iPhone 15", "Galaxy S24", "MacBook Pro"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(item)}`)
                  }
                  className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md text-sm text-gray-600 hover:text-gray-900 transition-all border border-gray-200/50 hover:border-gray-300 flex items-center gap-1 group"
                >
                  {item}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 브랜드 로고 슬라이더 - 무한 스크롤 수정 */}
      <div className="w-full overflow-hidden bg-white/30 backdrop-blur-sm py-16">
        <p className="text-center text-gray-500 mb-10 text-lg">
          다양한 브랜드의 제품을 비교해보세요!
        </p>
        <div className="flex flex-col gap-8">
          {/* 첫 번째 줄 */}
          <div className="flex animate-scroll">
            <div className="flex items-center gap-12 mx-8">
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={`${logo.alt}-${i}`}
                  src={logo.src}
                  alt={logo.alt}
                  className={`grayscale hover:grayscale-0 transition-all ${
                    logo.height === 6 ? "h-6" : "h-8"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 두 번째 줄 */}
          <div className="flex animate-scroll-reverse">
            <div className="flex items-center gap-12 mx-8">
              {[...logos.reverse(), ...logos].map((logo, i) => (
                <img
                  key={`${logo.alt}-reverse-${i}`}
                  src={logo.src}
                  alt={logo.alt}
                  className={`grayscale hover:grayscale-0 transition-all ${
                    logo.height === 6 ? "h-6" : "h-8"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 기능 소개 - 제목 수정 */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              주요 기능 살펴보기
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              TechFlip의 스마트한 기능을 확인해보세요
            </p>
          </div>

          {/* 기능 카개 이미지 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 가격 변동 추적 */}
            <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* 모바일 버전 */}
              <div className="md:hidden">
                <div className="overflow-hidden">
                  <img
                    src="/images/price-history.png"
                    alt="가격 변동 그래프 예시"
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <History className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      가격 변동 추적
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    시간에 따른 가격 변화를 확인하고 최적의 구매 시점을
                    찾아보세요
                  </p>
                </div>
              </div>

              {/* 데스크톱 버전 */}
              <div className="hidden md:block">
                <div className="p-8 bg-gradient-to-b from-white to-purple-50/50 border-b border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <History className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      가격 변동 추적
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-medium text-purple-900/80">
                      시간에 따른 가격 변화
                    </span>
                    를 확인하고
                    <br />
                    <span className="font-medium text-purple-900/80">
                      최적의 구매 시점
                    </span>
                    을 찾아보세요
                  </p>
                </div>
                <div className="relative p-4 bg-white/80">
                  <div className="rounded-xl overflow-hidden border border-purple-100 shadow-sm">
                    <img
                      src="/images/price-history.png"
                      alt="가격 변동 그래프 예시"
                      className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 실시간 가격 비교 */}
            <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* 모바일 버전 */}
              <div className="md:hidden">
                <div className="overflow-hidden">
                  <img
                    src="/images/price-comparison.png"
                    alt="가격 비교 화면 예시"
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      실시간 가격 비교
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    다양한 쇼핑몰의 가격을 한눈에 비교하고 최저가를 찾아보세요
                  </p>
                </div>
              </div>

              {/* 데스크톱 버전 */}
              <div className="hidden md:block">
                <div className="p-8 bg-gradient-to-b from-white to-blue-50/50 border-b border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      실시간 가격 비교
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-medium text-blue-900/80">
                      다양한 쇼핑몰의 가격
                    </span>
                    을 한눈에
                    <br />
                    비교하고{" "}
                    <span className="font-medium text-blue-900/80">최저가</span>
                    를 찾아보세요
                  </p>
                </div>
                <div className="relative p-4 bg-white/80">
                  <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm">
                    <img
                      src="/images/price-comparison.png"
                      alt="가격 비교 화면 예시"
                      className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 중고 시세 확인 */}
            <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* 모바일 버전 */}
              <div className="md:hidden">
                <div className="overflow-hidden">
                  <img
                    src="/images/used-price.png"
                    alt="중고 시세 화면 예시"
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      중고 시세 확인
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    실시간 중고 매물 가격으로 정확한 시세를 파악하세요
                  </p>
                </div>
              </div>

              {/* 데스크톱 버전 */}
              <div className="hidden md:block">
                <div className="p-8 bg-gradient-to-b from-white to-green-50/50 border-b border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                      중고 시세 확인
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-medium text-green-900/80">
                      실시간 중고 매물 가격
                    </span>
                    으로
                    <br />
                    <span className="font-medium text-green-900/80">
                      정확한 시세
                    </span>
                    를 파악하세요
                  </p>
                </div>
                <div className="relative p-4 bg-white/80">
                  <div className="rounded-xl overflow-hidden border border-green-100 shadow-sm">
                    <img
                      src="/images/used-price.png"
                      alt="중고 시세 화면 예시"
                      className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// 로고 데이터
const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple",
    height: 8,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/2880px-Samsung_wordmark.svg.png",
    alt: "Samsung",
    height: 6,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/400px-LG_logo_%282014%29.svg.png",
    alt: "LG",
    height: 8,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2880px-Sony_logo.svg.png",
    alt: "Sony",
    height: 6,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    alt: "Microsoft",
    height: 8,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
    height: 8,
  },
];
