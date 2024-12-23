"use client";

import { useParams } from "next/navigation";
import ProductImage from "@/components/compare/ProductImage";
import ProductInfo from "@/components/compare/ProductInfo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RetailerList from "@/components/compare/RetailerList";
import UsedList from "@/components/compare/UsedList";
import PriceChart from "@/components/compare/ProductInfo/PriceChart";
import { useProductDetail } from "@/hooks/useProductDetail";
import { usePriceAnalysis } from "@/hooks/usePriceAnalysis";
import ProductInfoSkeleton from "@/components/compare/ProductInfo/ProductInfoSkeleton";
import { Loader2 } from "lucide-react";

export default function ComparePage() {
  const params = useParams();

  const {
    product,
    usedItems,
    usedItemsPagination,
    loading: productLoading,
    usedItemsLoading,
    error: productError,
    setUsedItemsPage,
  } = useProductDetail(params.id);
  console.log("usedItems", usedItems);
  const {
    data: priceHistory,
    loading: priceHistoryLoading,
    error: priceHistoryError,
  } = usePriceAnalysis(product?.name, params.id);
  if (productLoading) return <ProductInfoSkeleton />;
  if (productError || !product) return <div>상품 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="container mx-auto px-4">
        <div className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="w-full md:w-[370px] lg:w-[470px] flex-shrink-0">
                  <ProductImage image={product.image} name={product.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <ProductInfo
                    product={product}
                    usedItems={usedItems}
                    usedItemsPagination={usedItemsPagination}
                    setUsedItemsPage={setUsedItemsPage}
                    priceHistory={priceHistory}
                    usedItemsLoading={usedItemsLoading}
                  />
                </div>
              </div>
            </div>

            {/* 데스크탑 탭 */}
            <div className="hidden md:block mt-12">
              <Tabs defaultValue="retailers" className="animate-in fade-in-50">
                <div className="flex justify-center">
                  <TabsList className="w-full max-w-4xl grid grid-cols-3 p-1 bg-gray-100/80 rounded-xl">
                    <TabsTrigger value="retailers">
                      판매처 ({product.retailers?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="used">
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
                    <TabsTrigger value="history">실시간 시세</TabsTrigger>
                  </TabsList>
                </div>

                <div className="max-w-4xl mx-auto">
                  <TabsContent value="retailers" className="mt-6">
                    {product.retailers && (
                      <RetailerList
                        retailers={product.retailers}
                        total={
                          product.listings?.new || product.retailers.length
                        }
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="used" className="mt-6">
                    <UsedList
                      items={usedItems}
                      pagination={usedItemsPagination}
                      onPageChange={setUsedItemsPage}
                    />
                    {usedItemsLoading && " (로딩중)"}
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    {priceHistoryLoading ? (
                      <div>시세 정보를 불러오는 중...</div>
                    ) : (
                      <PriceChart priceHistory={priceHistory} />
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
