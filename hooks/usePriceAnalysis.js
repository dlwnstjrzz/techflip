import { useState, useEffect } from "react";
import { cleanSearchQuery, getBaseSearchQuery } from "@/lib/utils";

export function usePriceAnalysis(productName, modelno) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productName || !modelno) return;

    async function fetchAnalysis(searchQuery) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/joongna/price-analysis", {
          method: "POST",
          body: JSON.stringify({
            keyword: searchQuery,
            modelno: modelno,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch price analysis");
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.error("Price analysis error:", err);
        return null;
      }
    }

    async function getPriceAnalysis() {
      try {
        const cleanedQuery = cleanSearchQuery(productName);
        console.log("First attempt with:", cleanedQuery);
        let result = await fetchAnalysis(cleanedQuery);

        if (!result || !result.usedPrices) {
          const baseQuery = getBaseSearchQuery(productName);
          console.log("Second attempt with:", baseQuery);
          result = await fetchAnalysis(baseQuery);
        }

        if (result && result.usedPrices) {
          setData(result);
        } else {
          throw new Error("가격 분석 데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Price analysis error:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    getPriceAnalysis();
  }, [productName, modelno]);

  return {
    data,
    loading,
    error,
  };
}
