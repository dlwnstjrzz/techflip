import { useState, useEffect } from "react";

export function usePriceAnalysis(productName, modelno) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productName || !modelno) return;

    async function fetchAnalysis() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/joongna/price-analysis", {
          method: "POST",
          body: JSON.stringify({
            keyword: productName,
            modelno: modelno,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch price analysis");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Price analysis error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [productName, modelno]);

  return {
    data,
    loading,
    error,
  };
}
