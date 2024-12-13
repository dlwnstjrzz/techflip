export default function PriceSummary({ priceRange, priceChange }) {
  const { min, max, usedMin, usedMax, usedAverage } = priceRange;

  return (
    <div className="mt-4 space-y-3">
      {/* 새상품 가격 카드 */}
      <div className="p-3 bg-blue-100/90 rounded-md">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-sm font-medium text-blue-600">새상품</span>
          {priceChange && (
            <div className="flex items-center gap-1 text-xs">
              <span className="text-gray-500">전월대비</span>
              <span
                className={
                  priceChange > 0
                    ? "text-emerald-600"
                    : priceChange < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {priceChange > 0 ? "+" : ""}
                {priceChange}%
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-blue-700">
            {min.toLocaleString()}원
          </div>
          <span className="text-gray-400">~</span>
          <div className="text-lg font-bold text-blue-700">
            {max.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 중고매물 가격 카드 */}
      {usedAverage && (
        <div className="p-3 bg-gray-100/90 rounded-md">
          <div className="mb-1.5">
            <span className="text-sm font-medium text-gray-600">중고매물</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-gray-700">
                {usedMin.toLocaleString()}원
              </div>
              <span className="text-gray-400">~</span>
              <div className="text-lg font-bold text-gray-700">
                {usedMax.toLocaleString()}원
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-gray-700">
                {usedAverage.toLocaleString()}원
              </div>
              <span className="text-sm font-medium text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
                평균가
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
