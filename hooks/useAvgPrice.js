import { useState, useEffect } from "react";
import { cleanSearchQuery } from "@/lib/utils";

export function useAvgPrice(keyword) {
  const [avgPrice, setAvgPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvgPrice() {
      if (!keyword) return;

      try {
        setLoading(true);
        const cleanedQuery = cleanSearchQuery(keyword);

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
              searchWord: cleanedQuery,
              productPriceSize: 1,
              dateRange: 30,
              priceType: 1,
            }),
          }
        );

        const data = await response.json();
        const linePrices = data.data?.productPrice?.linePrices;
        const latestAvgPrice = linePrices?.[linePrices.length - 1]?.avgPrice;

        setAvgPrice(latestAvgPrice || null);
      } catch (err) {
        console.error("Error fetching avg price:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAvgPrice();
  }, [keyword]);

  return { avgPrice, loading, error };
}
