export async function searchEnuriProducts(query) {
  try {
    const response = await fetch(
      `/api/enuri/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Search failed");
    return response.json();
  } catch (error) {
    console.error("Enuri search error:", error);
    throw error;
  }
}

export async function getEnuriProductDetail(modelNo) {
  try {
    const response = await fetch(`/api/enuri/detail?modelno=${modelNo}`);
    if (!response.ok) throw new Error("Failed to fetch product detail");
    return response.json();
  } catch (error) {
    console.error("Enuri detail error:", error);
    throw error;
  }
}
