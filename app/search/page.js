"use client";

import { useEffect, useState, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchResultSkeleton from "@/components/search/SearchResultSkeleton";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/enuri/search?q=${encodeURIComponent(query)}&page=${currentPage}`
        );
        const data = await response.json();

        setProducts(data.products);
        setPagination(data.pagination);
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
  }, [query, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set("page", newPage);
    window.history.pushState({}, "", url);
    // Next.js의 client-side navigation을 사용하여 페이지 업데이트
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (isLoading) {
    return <SearchResultSkeleton />;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 새 상품 섹션 */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 페이지네이션 */}
        {pagination && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* 페이지 번호 */}
            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(
                  (pageNum) =>
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    Math.abs(pageNum - pagination.currentPage) <= 2
                )
                .map((pageNum, index, array) => (
                  <Fragment key={pageNum}>
                    {index > 0 && array[index - 1] !== pageNum - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={
                        pageNum === pagination.currentPage
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  </Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
