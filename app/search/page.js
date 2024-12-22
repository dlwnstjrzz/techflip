"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // 에누리 API 호출
        const enuriResponse = await fetch(
          `/api/enuri/search?q=${encodeURIComponent(query)}`
        );
        const enuriData = await enuriResponse.json();
        setProducts(enuriData);

        // 중고나라 데이터 가져오기
        // const naverResponse = await fetch(
        //   `/api/naver/search?q=${encodeURIComponent(query)}`
        // );
        // const naverData = await naverResponse.json();
        // setUsedItems(naverData.items);

        // console.log("중고나라 데이터:", naverData);
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
    <div className="container mx-auto px-4 py-8">
      {/* 새 상품 섹션 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">새 상품</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
