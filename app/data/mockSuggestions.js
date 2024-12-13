// 실제 API 응답을 시뮬레이션하는 mock 데이터
export const mockSuggestions = [
  // 제품명 기반 추천
  {
    id: "p1",
    text: "아이폰 15 프로",
    type: "product",
    brand: "Apple",
  },
  {
    id: "p2",
    text: "아이폰 15 프로 맥스",
    type: "product",
    brand: "Apple",
  },
  {
    id: "p3",
    text: "아이폰 14 프로",
    type: "product",
    brand: "Apple",
  },
  // 브랜드 기반 추천
  {
    id: "b1",
    text: "애플",
    type: "brand",
    brand: "Apple",
  },
  // 인기 검색어
  {
    id: "t1",
    text: "갤럭시 s24",
    type: "trending",
    brand: "Samsung",
  },
];

// 검색어 자동완성 API를 시뮬레이션하는 함수
export async function fetchSuggestions(query) {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!query) return [];

  const normalizedQuery = query.toLowerCase();
  return mockSuggestions.filter(
    (item) =>
      item.text.toLowerCase().includes(normalizedQuery) ||
      item.brand.toLowerCase().includes(normalizedQuery)
  );
}
