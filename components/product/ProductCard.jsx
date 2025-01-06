import { cn } from "@/lib/utils";
import { Tag, ChevronRight, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAvgPrice } from "@/hooks/useAvgPrice";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [showSpec, setShowSpec] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const specRef = useRef(null);
  const toggleRef = useRef(null);
  const { avgPrice, loading } = useAvgPrice(product.koreanName);
  console.log(13222, avgPrice);
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
    <div className="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer bg-white relative overflow-hidden group">
      {/* 기존 상품 정보 */}
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="w-[140px] h-[140px] bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          {/* 브랜드 + 평점 */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{product.brand}</span>
            {product.rating?.score > 0 && (
              <div className="flex items-center text-yellow-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <span>{product.rating.score.toFixed(1)}</span>
                <span className="text-gray-400 text-xs">
                  ({product.rating.count.toLocaleString()})
                </span>
              </div>
            )}
          </div>

          {/* 제품명 */}
          <h3 className="font-medium text-lg mt-1 line-clamp-2">
            {product.koreanName}
          </h3>

          {/* 가격 정보 */}
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-red-500">최저</span>
              <span className="text-xl sm:text-2xl font-bold text-red-500">
                {parseInt(product.priceRange.min).toLocaleString()}
                <span className="text-sm font-normal ml-0.5">원</span>
              </span>
            </div>

            {/* 중고 평균가격 */}
            <div className="flex items-baseline gap-1 mt-1 truncate">
              <span className="text-sm text-gray-600">중고 평균</span>
              {loading ? (
                <span className="text-base text-gray-400 font-medium">
                  집계중...
                </span>
              ) : avgPrice ? (
                <span className="text-lg font-bold text-gray-600 truncate">
                  {parseInt(avgPrice).toLocaleString()}
                  <span className="text-sm font-normal ml-0.5">원</span>
                </span>
              ) : (
                <span className="text-sm text-gray-400">정보 없음</span>
              )}
            </div>
          </div>

          {/* 배송 정보 */}
          {product.delivery?.info && (
            <div className="mt-2 text-sm text-gray-600">
              {product.delivery.type === "today" && "🚚 오늘배송 "}
              {product.delivery.info}
            </div>
          )}
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="mt-4 pt-3 border-t">
        {/* PC 버전 그드 */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 판매처 정보 */}
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <div className="text-sm text-gray-500">판매처</div>
              <div className="mt-1 font-medium">
                {product.listings.new.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  곳에서 판매중
                </span>
              </div>
            </div>

            {/* PC 버전 가격변동 정보 */}
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="text-sm text-gray-500">가격변동</div>
                <div className="text-xs text-gray-400">최근 3개월 추이</div>
              </div>
              <div
                className={cn(
                  "mt-1 font-medium",
                  product.priceChange < 0
                    ? "text-red-500"
                    : product.priceChange > 0
                    ? "text-emerald-500"
                    : "text-gray-600"
                )}
              >
                {Math.abs(product.priceChange)}%
                <span className="text-sm font-normal ml-1">
                  {product.priceChange < 0
                    ? "하락"
                    : product.priceChange > 0
                    ? "상승"
                    : "변동없음"}
                </span>
              </div>
            </div>
          </div>

          {/* PC용 중고매물 안내 */}
          <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
            전체 판매처 및 중고시세 비교하기
          </button>
        </div>

        {/* 모바일 버전 */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {/* 판매처 정보 */}
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-500">판매처</div>
              <div className="mt-0.5 font-medium">
                {product.listings.new.toLocaleString()}
                <span className="text-xs font-normal text-gray-500 ml-1">
                  곳
                </span>
              </div>
            </div>

            {/* 모바일 버전 가격변동 정보 */}
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1">
                <div className="text-xs text-gray-500">가격변동</div>
                <div className="text-[10px] text-gray-400">최근 3개월</div>
              </div>
              <div
                className={cn(
                  "mt-0.5 font-medium",
                  product.priceChange < 0
                    ? "text-red-500"
                    : product.priceChange > 0
                    ? "text-emerald-500"
                    : "text-gray-600"
                )}
              >
                {Math.abs(product.priceChange)}%
                <span className="text-xs font-normal ml-1">
                  {product.priceChange < 0
                    ? "하락"
                    : product.priceChange > 0
                    ? "상승"
                    : "변동없음"}
                </span>
              </div>
            </div>
          </div>

          {/* 모바일 중고매물 안내 - 더 플한 디자인 */}
          <div className="mt-3 border-t pt-3">
            <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
              전체 판매처 및 중고시세 비교하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 링크로 감싸기
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem(
      `product_${product.id}`,
      JSON.stringify({ ...product, avgPrice })
    );
    router.push(`/compare/${product.id}`);
  };

  return (
    <div className="relative group">
      {/* 기존 카드 내용 */}
      <Link
        href={`/compare/${product.id}`}
        className="block hover:bg-gray-50"
        onClick={handleClick}
      >
        {content}
      </Link>
    </div>
  );
}
