import { useState, useEffect } from "react";

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

    async function fetchItems() {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // 각 플랫폼의 현재 페이지로 API 호출
        const [naverResponse, bunjangResponse] = await Promise.all([
          fetch(
            `/api/naver/search?q=${encodeURIComponent(query)}&page=${
              pages.joonggonara
            }&pageSize=20`
          ).then((r) => r.json()),
          fetch(
            `/api/bunjang?q=${encodeURIComponent(query)}&page=${
              pages.bunjang
            }&pageSize=20`
          ).then((r) => r.json()),
        ]);

        if (naverResponse.error) throw new Error(naverResponse.error);
        if (bunjangResponse.error) throw new Error(bunjangResponse.error);

        setState((prev) => ({
          ...prev,
          items: {
            joonggonara: naverResponse.items,
            bunjang: bunjangResponse.items,
          },
          pagination: {
            joonggonara: naverResponse.meta,
            bunjang: bunjangResponse.meta,
          },
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        console.error("중고매물 조회 실패:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    }

    fetchItems();
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
