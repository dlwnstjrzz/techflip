import { useState, useEffect } from "react";
import { getBaseSearchQuery } from "@/lib/utils";

export function useUsedItems(query) {
  const [state, setState] = useState({
    items: {
      joonggonara: [],
      bunjang: [],
    },
    pagination: {
      joonggonara: null,
      bunjang: null,
    },
    isLoading: false,
    error: null,
  });

  // 플랫폼별 페이지 상태 관리
  const [pages, setPages] = useState({
    joonggonara: 1,
    bunjang: 1,
  });

  useEffect(() => {
    if (!query) return;

    async function fetchItems(searchQuery) {
      try {
        const [naverResponse, bunjangResponse] = await Promise.all([
          fetch(
            `/api/naver/search?q=${encodeURIComponent(searchQuery)}&page=${
              pages.joonggonara
            }&pageSize=20`
          ).then((r) => r.json()),
          fetch(
            `/api/bunjang?q=${encodeURIComponent(searchQuery)}&page=${
              pages.bunjang
            }&pageSize=20`
          ).then((r) => r.json()),
        ]);

        if (naverResponse.error) throw new Error(naverResponse.error);
        if (bunjangResponse.error) throw new Error(bunjangResponse.error);

        return {
          naverItems: naverResponse.items,
          bunjangItems: bunjangResponse.items,
          naverMeta: naverResponse.meta,
          bunjangMeta: bunjangResponse.meta,
        };
      } catch (error) {
        console.error("API 호출 실패:", error);
        return null;
      }
    }

    async function getItems() {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // 첫 번째 시도
        let result = await fetchItems(query);

        // 결과가 없으면 모델명 제거 후 두 번째 시도
        if (
          !result ||
          (result.naverItems.length === 0 && result.bunjangItems.length === 0)
        ) {
          const baseQuery = getBaseSearchQuery(query);
          console.log("Second attempt with:", baseQuery);
          result = await fetchItems(baseQuery);
        }

        if (result) {
          setState((prev) => ({
            ...prev,
            items: {
              joonggonara: result.naverItems,
              bunjang: result.bunjangItems,
            },
            pagination: {
              joonggonara: result.naverMeta,
              bunjang: result.bunjangMeta,
            },
            isLoading: false,
            error: null,
          }));
        } else {
          throw new Error("중고매물을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("중고매물 조회 실패:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    }

    getItems();
  }, [query, pages.joonggonara, pages.bunjang]);

  // 플랫폼별 페이지 변경 함수
  const setPage = (platform, newPage) => {
    setPages((prev) => ({
      ...prev,
      [platform]: newPage,
    }));
  };

  return {
    items: state.items,
    pagination: state.pagination,
    isLoading: state.isLoading,
    error: state.error,
    setPage,
  };
}
