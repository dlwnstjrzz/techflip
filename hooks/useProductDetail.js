import { useState, useEffect } from "react";
import { getEnuriProductDetail } from "@/lib/api/enuri";
import { cleanSearchQuery } from "@/lib/utils";
import { useUsedItems } from "./useUsedItems";
import { usePriceAnalysis } from "./usePriceAnalysis";

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    items: usedItems,
    pagination: usedItemsPagination,
    isLoading: usedItemsLoading,
    hasError: usedItemsError,
    setPage,
  } = useUsedItems(product?.name ? cleanSearchQuery(product.name) : null);

  const {
    data: priceHistory,
    loading: priceHistoryLoading,
    error: priceHistoryError,
  } = usePriceAnalysis(product?.name);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // 1. 먼저 기본 상품 정보 가져오기
        const savedProduct = localStorage.getItem(`product_${productId}`);
        const baseProduct = savedProduct ? JSON.parse(savedProduct) : null;

        // 2. 상세 정보 가져오기
        const detail = await getEnuriProductDetail(productId);
        console.log("detail", detail.data.shopPricelist);
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
            cardname: shop.cardname,
            cardPrice: shop.cardprice,
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
          link: `https://www.enuri.com/move/Redirect.jsp?cmd=move_link&vcode=${shop.shopcode}&modelno=${productId}&pl_no=${shop.plno}&showPrice=${shop.price}`,
        }));

        retailers.sort((a, b) => a.price - b.price);

        const productData = {
          ...baseProduct,
          retailers,
          detailInfo: detail.data,
        };

        if (isMounted) {
          setProduct(productData);
          setLoading(false);
        }
      } catch (error) {
        console.error("상품 정보 조회 실패:", error);
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return {
    product,
    usedItems,
    usedItemsPagination,
    loading,
    usedItemsLoading,
    error: error || usedItemsError,
    priceHistory,
    priceHistoryLoading,
    setUsedItemsPage: setPage,
  };
}
