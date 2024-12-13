import { cn } from "@/lib/utils";
import { Tag, ChevronRight, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [showSpec, setShowSpec] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const specRef = useRef(null);
  const toggleRef = useRef(null);

  // 모바일 여부 체크
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // 스펙 표시 상태 체크
  const checkSpecVisibility = useCallback(() => {
    if (!specRef.current || !toggleRef.current) return;

    const lineHeight = 12 * 1.5;
    const isMultiline = specRef.current.scrollHeight > lineHeight;

    if (isMobile) {
      if (isMultiline && !showSpec) {
        specRef.current.classList.add("line-clamp-1");
      } else {
        specRef.current.classList.remove("line-clamp-1");
      }
      toggleRef.current.style.display = isMultiline ? "flex" : "none";
    } else {
      specRef.current.classList.remove("line-clamp-1");
      toggleRef.current.style.display = "none";
    }
  }, [isMobile, showSpec]);

  // 초기화 및 리사이즈 이벤트 리스너
  useEffect(() => {
    checkMobile();
    checkSpecVisibility();

    const handleResize = () => {
      checkMobile();
      checkSpecVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkMobile, checkSpecVisibility]);

  // showSpec 변경 시 visibility 재체크
  useEffect(() => {
    checkSpecVisibility();
  }, [showSpec, checkSpecVisibility]);

  const content = (
    <div className="border rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer bg-white">
      {/* 제품 정보 */}
      <div className="flex-1 min-w-0 flex gap-3 sm:gap-4 relative">
        <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          {product.image ? (
            <div className="w-full h-full bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* 상단 정보 */}
        <div>
          <div className="min-w-0 pr-8">
            <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
              {product.brand}
              {product.rating && product.rating.score > 0 && (
                <div className="flex items-center text-yellow-500">
                  <svg
                    className="w-3.5 h-3.5 fill-current translate-y-[-0.5px]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <span className="text-gray-600">
                    {product.rating.score.toFixed(1)}
                    <span className="text-gray-400 ml-0.5">
                      ({product.rating.count.toLocaleString()})
                    </span>
                  </span>
                </div>
              )}
            </div>
            <h3 className="font-medium text-base sm:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
              {product.koreanName}
            </h3>
          </div>
          {/* 배송 정보 */}
          {product.delivery?.info && (
            <div className="text-xs text-gray-600 mt-1">
              {product.delivery.type === "today" && "🚚 오늘배송 "}
              {product.delivery.info}
              {product.delivery.option && ` (${product.delivery.option})`}
            </div>
          )}

          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground absolute right-0 top-0" />
          {/* 가격 범위 */}
          <div className="mt-1 sm:mt-2 space-y-2">
            {/* 새상품 최저가 */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-blue-600">최저</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                {parseInt(product.priceRange.min).toLocaleString()}
                <span className="text-sm font-normal ml-0.5">원</span>
              </span>
            </div>

            {/* 중고 평균가 */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-gray-500">
                중고 평균
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-600">
                {Math.floor(
                  parseInt(product.priceRange.min) * 0.8
                ).toLocaleString()}
                <span className="text-sm font-normal"> 원</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 가격 정보와 등록 건수 */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>최근 30일 기준</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-4 h-4" />
          <span>
            총 {parseInt(product.listings.new).toLocaleString()}개 매물
          </span>
        </div>
      </div>

      {/* 하단 정보 카드들 */}
      <div className="mt-4 flex gap-2">
        {/* 새상품 */}
        <div className="flex-1 px-3 py-2 rounded-lg bg-blue-50/50">
          <div className="text-center">
            <span className="text-lg font-bold text-blue-600">
              {parseInt(product.listings.new).toLocaleString()}개
            </span>
            <div className="text-xs text-blue-600/70">새상품 판매처</div>
          </div>
        </div>

        {/* 중고상품 */}
        <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50">
          <div className="text-center">
            <span className="text-lg font-bold text-gray-600">
              {parseInt(product.listings.used || 0).toLocaleString()}개
            </span>
            <div className="text-xs text-gray-600/70">중고 매물</div>
          </div>
        </div>

        {/* 가격 변동 */}
        <div
          className={cn(
            "flex-1 px-3 py-2 rounded-lg",
            product.priceChange < 0
              ? "bg-red-50/50"
              : product.priceChange > 0
              ? "bg-emerald-50/50"
              : "bg-gray-50"
          )}
        >
          <div className="text-center">
            <span
              className={cn(
                "text-lg font-bold",
                product.priceChange < 0
                  ? "text-red-600"
                  : product.priceChange > 0
                  ? "text-emerald-600"
                  : "text-gray-600"
              )}
            >
              {Math.abs(product.priceChange)}%
              {product.priceChange < 0
                ? "↓"
                : product.priceChange > 0
                ? "↑"
                : "-"}
            </span>
            <div
              className={cn(
                "text-xs",
                product.priceChange < 0
                  ? "text-red-600/70"
                  : product.priceChange > 0
                  ? "text-emerald-600/70"
                  : "text-gray-600/70"
              )}
            >
              가격{" "}
              {product.priceChange < 0
                ? "하락"
                : product.priceChange > 0
                ? "상승"
                : "변동없음"}
            </div>
          </div>
        </div>
      </div>

      {/* 상세 스펙 정보 */}
      {product.spec && (
        <div className="pt-3">
          <div className="relative">
            <div
              ref={specRef}
              className={cn(
                "text-xs text-gray-500 leading-relaxed",
                "md:line-clamp-none",
                !showSpec && "md:line-clamp-none line-clamp-1"
              )}
            >
              {product.spec.summary
                .replace(/\$TAG\$[^$]*\$END\$/g, "")
                .replace(/<[^>]*>/g, "")
                .split("/")
                .filter((spec) => spec.trim())
                .map((spec, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="mx-1 text-gray-300">•</span>
                    {spec.trim()}
                  </span>
                ))}
            </div>

            <button
              ref={toggleRef}
              onClick={(e) => {
                e.preventDefault();
                setShowSpec(!showSpec);
              }}
              className={cn(
                "md:hidden",
                "absolute -right-1 -top-1",
                "p-1 rounded-full",
                "text-gray-400 hover:text-gray-600 transition-colors"
              )}
            >
              {showSpec ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // 링크로 감싸기
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
    router.push(`/compare/${product.id}`);
  };

  return (
    <Link
      href={`/compare/${product.id}`}
      className="block hover:bg-gray-50"
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}
