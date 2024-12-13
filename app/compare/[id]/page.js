"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEnuriProductDetail } from "@/lib/api/enuri";
import ProductImage from "@/components/compare/ProductImage";
import ProductInfo from "@/components/compare/ProductInfo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RetailerList from "@/components/compare/RetailerList";
import UsedList from "@/components/compare/UsedList";
import PriceChart from "@/components/compare/ProductInfo/PriceChart";

export default function ComparePage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 기본 상품 정보 가져오기
        const savedProduct = localStorage.getItem(`product_${params.id}`);
        const baseProduct = savedProduct ? JSON.parse(savedProduct) : null;

        // 상세 정보 가져오기
        const detail = await getEnuriProductDetail(params.id);

        // 판매처 데이터 가공
        const retailers = detail.data.shopPricelist.map((shop) => ({
          id: shop.shopcode,
          name: shop.shopname,
          price: shop.price,
          logo: shop.shoplogo_check ? shop.shoplogo_image : null,
          delivery: {
            price: shop.delivery_price,
            info: shop.delivery_text,
            quick: shop.quick_delivery_text || null,
          },
          benefits: {
            cardInfo: shop.cardinfo,
            emoney: shop.emoney_reward,
            npoint: shop.npoint_reward,
            coupon: shop.coupon,
          },
          badges: {
            official: shop.official_check,
            minPrice: shop.minprice_check,
            npay: shop.npay_check,
            overseas: shop.oversea_check,
          },
          link: `https://www.enuri.com/move/Redirect.jsp?cmd=move_link&vcode=${shop.goodscode}&modelno=${params.id}&pl_no=${shop.plno}`,
        }));

        // 정렬: 최저가 순
        retailers.sort((a, b) => a.price - b.price);

        // 모든 데이터를 product에 통합
        setProduct({
          ...baseProduct,
          retailers,
          totalShops: detail.data.total,
          detailInfo: detail.data,
        });
      } catch (error) {
        console.error("상품 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품 정보를 찾을 수 없습니다.</div>;

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
                  <ProductInfo product={product} />
                </div>
              </div>
            </div>

            {/* 데스크탑 탭 */}
            <div className="hidden md:block mt-12">
              <Tabs defaultValue="retailers" className="animate-in fade-in-50">
                <div className="flex justify-center">
                  <TabsList className="w-full max-w-4xl grid grid-cols-3 p-1 bg-gray-100/80 rounded-xl">
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
                      중고매물 ({product.listings?.used || 0})
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                    >
                      실시간 시세
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="max-w-4xl mx-auto">
                  <TabsContent value="retailers" className="mt-6">
                    {product.retailers && (
                      <RetailerList
                        retailers={product.retailers}
                        total={product.totalShops}
                      />
                    )}
                  </TabsContent>

                  <TabsContent
                    value="used"
                    className="mt-6 animate-in fade-in-50 slide-in-from-right-5"
                  >
                    {product.usedItems && (
                      <UsedList items={product.usedItems} />
                    )}
                  </TabsContent>

                  <TabsContent
                    value="history"
                    className="mt-6 animate-in fade-in-50 slide-in-from-right-5"
                  >
                    {product.priceHistory && (
                      <PriceChart priceHistory={product.priceHistory} />
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
