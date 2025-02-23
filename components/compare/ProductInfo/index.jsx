import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceSummary from "./PriceSummary";
import RetailerList from "../RetailerList";
import UsedList from "../UsedList";
import PriceChart from "./PriceChart";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import ShareButton from "@/components/share/ShareButton";
export default function ProductInfo({
  product,
  usedItems,
  usedItemsPagination,
  setUsedItemsPage,
  priceHistory,
  usedItemsLoading,
}) {
  const tabsRef = useRef(null);
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
          <ShareButton
            url={`https://moaba.it/compare/${product.id}`}
            title={`${product.koreanName} - ${
              product.brand
            } | 새상품 ${product.priceRange.min.toLocaleString()}원부터`}
          />
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
        avgPrice={product.avgPrice || priceHistory?.usedPrices?.at(-1)}
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
              중고매물{" "}
              {usedItemsLoading ? (
                <Loader2 className="ml-1 h-3 w-3 animate-spin inline" />
              ) : (
                `(${
                  (usedItemsPagination?.joonggonara?.total || 0) +
                  (usedItemsPagination?.bunjang?.total || 0)
                })`
              )}
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
            {usedItems && (
              <UsedList
                items={usedItems}
                pagination={usedItemsPagination}
                onPageChange={setUsedItemsPage}
              />
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {priceHistory && <PriceChart priceHistory={priceHistory} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
