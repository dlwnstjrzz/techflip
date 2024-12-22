import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceSummary from "./PriceSummary";
import RetailerList from "../RetailerList";
import UsedList from "../UsedList";
import PriceChart from "./PriceChart";
import ShareButton from "./ShareButton";
import { useRef } from "react";

export default function ProductInfo({ product, usedItems, priceHistory }) {
  const tabsRef = useRef(null);
  console.log("priceHistory3", priceHistory);
  const handleTabChange = (value) => {
    if (window.innerWidth < 768) {
      window.scrollTo({ top: tabsRef.current.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 min-w-0">
      {/* 제품 기본 정보 */}
      <div className="space-y-3 pb-6 border-b">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-sm font-medium text-blue-600">
              {product.brand}
            </span>
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-600">신상품</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {product.koreanName}
        </h1>
        <div className="text-sm text-gray-600">{product.name}</div>
      </div>

      {/* 핵심 가격 정보 */}
      <PriceSummary
        priceRange={product.priceRange}
        priceChange={product.priceChange}
      />

      {/* 탭 컨텐츠 - 모바일에서만 표시 */}
      <div className="md:hidden" ref={tabsRef}>
        <Tabs
          defaultValue="retailers"
          className="mt-8"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full grid grid-cols-3 p-1 bg-gray-100/80 rounded-xl">
            <TabsTrigger
              value="retailers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              판매처 ({product.retailers?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="used"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              중고매물 ({usedItems?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              실시간 시세
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retailers" className="mt-6">
            {product.retailers && (
              <RetailerList
                retailers={product.retailers}
                total={product.totalShops}
              />
            )}
          </TabsContent>

          <TabsContent value="used" className="mt-6">
            {usedItems && <UsedList items={usedItems} />}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {priceHistory && <PriceChart priceHistory={priceHistory} />}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6">
        <ShareButton />
      </div>
    </div>
  );
}
