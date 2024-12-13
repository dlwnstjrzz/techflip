const STORAGE_KEY = "recent-searches";
const MAX_ITEMS = 10;

export function getRecentSearches() {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse recent searches:", e);
    return [];
  }
}

export function addRecentSearch(query) {
  if (typeof window === "undefined") return;

  const recent = getRecentSearches();

  // 이미 있는 검색어면 제거 (최신으로 업데이트하기 위해)
  const filtered = recent.filter((item) => item !== query);

  // 새 검색어를 앞에 추가
  const updated = [query, ...filtered].slice(0, MAX_ITEMS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save recent search:", e);
  }
}

export function removeRecentSearch(query) {
  if (typeof window === "undefined") return;

  const recent = getRecentSearches();
  const updated = recent.filter((item) => item !== query);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to remove recent search:", e);
  }
}

export function clearRecentSearches() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
