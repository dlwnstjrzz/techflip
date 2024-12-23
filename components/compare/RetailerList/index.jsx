export default function RetailerList({ retailers, total }) {
  // 상위 10개만 필터링
  console.log("retailers", retailers);
  const topRetailers = retailers.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          가격이 낮은 상위 {retailers.length}개 판매처
        </div>
        <div className="text-xs text-gray-400">최근 30일 기준</div>
      </div>

      <div className="space-y-3">
        {topRetailers.map((retailer) => (
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
                  {retailer.delivery.price === 0 && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      무료배송
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
                    {retailer.price.toLocaleString()}원
                  </div>
                </div>
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
