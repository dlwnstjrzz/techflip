"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function RetailerList({ retailers, total }) {
  const [includeDelivery, setIncludeDelivery] = useState(false);

  // 상위 10개만 필터링

  const sortedRetailers = retailers
    .map((retailer) => ({
      ...retailer,
      displayPrice: includeDelivery
        ? retailer.price // 배송비 포함 (원래 price가 이미 배송비 포함)
        : retailer.price - retailer.delivery.price, // 배송비 미포함
    }))
    .sort((a, b) => a.displayPrice - b.displayPrice)
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          가격이 낮은 상위 {retailers.length}개 판매처
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="delivery-toggle"
            checked={includeDelivery}
            onCheckedChange={setIncludeDelivery}
          />
          <Label htmlFor="delivery-toggle" className="text-sm text-gray-600">
            배송비 포함
          </Label>
        </div>
      </div>

      <div className="space-y-3">
        {sortedRetailers.map((retailer) => (
          <a
            key={retailer.id}
            href={retailer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-white rounded-lg border hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* 로고 또는 이름 */}
              <div className="flex-shrink-0 w-[80px] flex justify-start">
                {retailer.logo ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 relative">
                      {retailer.logo && (
                        <div
                          className="h-full bg-no-repeat bg-contain bg-left"
                          style={{
                            backgroundImage: `url(${retailer.logo})`,
                            width: "auto",
                            minWidth: "60px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="font-medium text-[0.9375rem]">
                    {retailer.name}
                  </span>
                )}
              </div>

              {/* 배지와 배송 정보 */}
              <div className="flex-1 min-w-0 flex">
                {/* 배송 정보 영역 */}
                <div className="">
                  {retailer.delivery.price === 0 ? (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      무료배송
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {retailer.delivery.price.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>

              {/* 가격 정보 */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-2">
                  {retailer.badges.minPrice && (
                    <span className="text-xs font-medium text-red-600">
                      최저가
                    </span>
                  )}
                  <div
                    className={`text-[18px] font-bold ${
                      retailer.badges.minPrice
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {retailer.displayPrice.toLocaleString()}원
                  </div>
                </div>
                {includeDelivery && retailer.delivery.price > 0 && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    (배송비 {retailer.delivery.price.toLocaleString()}원 포함)
                  </div>
                )}
                <div className="space-y-0.5 mt-1">
                  {retailer.benefits.cardInfo?.length > 0 && (
                    <div className="text-sm text-gray-700">
                      {retailer.benefits.cardname}&nbsp;
                      {retailer.benefits.cardPrice.toLocaleString()}원
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
