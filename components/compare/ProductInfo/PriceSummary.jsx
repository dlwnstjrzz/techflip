import React from "react";
import { cn } from "@/lib/utils";

export default function PriceSummary({ priceRange, priceChange, avgPrice }) {
  const { min } = priceRange;

  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* 새상품 최저가 */}
      <div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            새상품
            {priceChange !== undefined && (
              <div
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded",
                  priceChange > 0
                    ? "text-red-600 bg-red-50"
                    : priceChange < 0
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 bg-gray-50"
                )}
              >
                {priceChange > 0 ? "▲" : priceChange < 0 ? "▼" : "-"}
                {Math.abs(priceChange)}%
              </div>
            )}
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm text-red-500">최저</span>
            <span className="text-3xl font-bold text-red-500">
              {parseInt(min).toLocaleString()}
            </span>
            <span className="text-red-500">원</span>
          </div>
        </div>
      </div>

      {/* 중고 평균가 */}
      <div className="pt-6 border-t">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            중고시세
            <span className="text-xs text-gray-400">실시간</span>
          </div>
          <div className="flex items-baseline gap-1">
            {avgPrice ? (
              <>
                <span className="text-sm text-gray-900">평균</span>
                <span className="text-3xl font-bold text-gray-900 mt-1">
                  {parseInt(avgPrice).toLocaleString()}
                </span>
                <span className="text-gray-600">원</span>
              </>
            ) : (
              <span className="text-lg text-gray-400 mt-1">정보 없음</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
