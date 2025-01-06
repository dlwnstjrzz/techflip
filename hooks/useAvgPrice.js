import { useState, useEffect } from "react";
import { cleanSearchQuery, getBaseSearchQuery } from "@/lib/utils";

export function useAvgPrice(keyword) {
  const [avgPrice, setAvgPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvgPrice(searchQuery) {
      try {
        const response = await fetch(
          "https://search-api.joongna.com/v4/analysis/product-price/scatter-plot",
          {
            method: "POST",
            headers: {
              accept: "application/json, text/plain, */*",
              "content-type": "application/json",
              origin: "https://web.joongna.com",
              referer: "https://web.joongna.com/",
              "os-type": "2",
              "sec-fetch-site": "same-site",
              "sec-fetch-mode": "cors",
              "sec-fetch-dest": "empty",
              "user-agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
            body: JSON.stringify({
              searchWord: searchQuery,
              productPriceSize: 1,
              dateRange: 30,
              priceType: 1,
            }),
          }
        );

        const data = await response.json();
        const linePrices = data.data?.productPrice?.linePrices;
        return linePrices?.[linePrices.length - 1]?.avgPrice || null;
      } catch (err) {
        console.error("Error fetching avg price:", err);
        return null;
      }
    }

    async function getAvgPrice() {
      if (!keyword) return;

      setLoading(true);
      setError(null);

      try {
        // 첫 번째 시도: 기본 정제된 검색어로 시도
        const cleanedQuery = cleanSearchQuery(keyword);
        console.log("First attempt with:", cleanedQuery);
        let price = await fetchAvgPrice(cleanedQuery);

        // 두 번째 시도: 모델명까지 제거한 검색어로 시도
        if (!price) {
          const baseQuery = getBaseSearchQuery(keyword);
          console.log("Second attempt with:", baseQuery);
          price = await fetchAvgPrice(baseQuery);
        }

        setAvgPrice(price);
      } catch (err) {
        console.error("Error in getAvgPrice:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getAvgPrice();
  }, [keyword]);

  return { avgPrice, loading, error };
}
