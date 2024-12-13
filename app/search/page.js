"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { searchNaverProducts } from "@/lib/api/naver";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [enuriInfo, setEnuriInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // 네이버 검색 결과 가져오기
        // const naverProducts = await searchNaverProducts(query);
        // setProducts(naverProducts);
        // 에누리 API 호출
        const response = await fetch(
          `/api/enuri/search?q=${encodeURIComponent(query)}`
        );
        const enuriData = await response.json();
        console.log("Enuri Data:", enuriData);
        setProducts(enuriData);

        if (enuriData.data?.list?.[0]) {
          setEnuriInfo({
            modelNo: enuriData.data.list[0].strModelNo,
            decreaseRate: enuriData.data.list[0].strDecreaseRate,
          });
        }
        console.log("Enuri Data:", enuriData);
        console.log("Model No:", enuriData.data?.list?.[0]?.strModelNo);
        console.log(
          "Decrease Rate:",
          enuriData.data?.list?.[0]?.strDecreaseRate
        );
      } catch (err) {
        console.error("Search error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      fetchData();
    }
  }, [query]);

  if (isLoading) {
    return <div>검색 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
