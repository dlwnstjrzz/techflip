import { useState, useEffect, useMemo } from "react";

export function useUsedItems(query) {
  const [items, setItems] = useState({
    naver: [],
    bunjang: [],
    loading: {
      naver: false,
      bunjang: false,
    },
    error: {
      naver: null,
      bunjang: null,
    },
  });

  useEffect(() => {
    if (!query) return;

    async function fetchItems() {
      setItems((prev) => ({
        ...prev,
        loading: { naver: true, bunjang: true },
      }));

      try {
        const [naverData, bunjangData] = await Promise.all([
          fetch(`/api/naver/search?q=${encodeURIComponent(query)}`).then((r) =>
            r.json()
          ),
          fetch(`/api/bunjang?query=${encodeURIComponent(query)}`).then((r) =>
            r.json()
          ),
        ]);

        setItems({
          naver: naverData.items,
          bunjang: bunjangData.items.filter((item) => item.ad === false),
          loading: { naver: false, bunjang: false },
          error: { naver: null, bunjang: null },
        });
      } catch (error) {
        console.error("중고매물 조회 실패:", error);
        setItems((prev) => ({
          ...prev,
          loading: { naver: false, bunjang: false },
          error: { naver: error.message, bunjang: error.message },
        }));
      }
    }

    fetchItems();
  }, [query]);

  const sortedItems = useMemo(() => {
    return [...items.naver, ...items.bunjang].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [items.naver, items.bunjang]);

  const isLoading = items.loading.naver || items.loading.bunjang;
  const hasError = items.error.naver || items.error.bunjang;

  return {
    items: sortedItems,
    platformData: items,
    isLoading,
    hasError,
  };
}
