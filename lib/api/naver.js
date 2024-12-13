export async function searchNaverProducts(query) {
  try {
    const response = await fetch(
      `/api/naver/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Search failed");
    return response.json();
  } catch (error) {
    console.error("Naver search error:", error);
    throw error;
  }
}
