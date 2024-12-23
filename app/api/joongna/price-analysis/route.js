import { NextResponse } from "next/server";
import { cleanSearchQuery } from "@/lib/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const cleanedQuery = cleanSearchQuery(body.keyword);
    const modelno = body.modelno;
    console.log("cleanedQuery", cleanedQuery);
    const [joongnaResponse, enuriResponse] = await Promise.all([
      // 중고나라 API - 30일
      fetch(
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
      ),
      // 에누리 API - 3개월
      fetch(
        `https://m.enuri.com/wide/api/prodPriceChart.jsp?modelno=${modelno}&showType=3M`
      ),
    ]);

    if (!joongnaResponse.ok || !enuriResponse.ok) {
      throw new Error("Failed to fetch price data");
    }

    const [joongnaData, enuriData] = await Promise.all([
      joongnaResponse.json(),
      enuriResponse.json(),
    ]);

    // 우리 서비스 형식으로 변환
    const formattedData = {
      // 중고나라 데이터 (30일)
      dates: joongnaData.data.productPrice?.linePrices?.map(
        (item) => item.date
      ),
      usedPrices: joongnaData.data.productPrice?.linePrices?.map(
        (item) => item.avgPrice
      ),
      // 에누리 데이터 (3개월)
      newDates: enuriData.data.graphDataList
        .map((item) => {
          const [month, day] = item.date_text.split(".");
          if (!month || !day) return null;
          return `2024-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        })
        .filter(Boolean),
      newPrices: enuriData.data.graphDataList.map((item) => item.price),
    };

    console.log("formattedData", formattedData);
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Price analysis error:", error);
    return NextResponse.json(
      { error: "Failed to fetch price analysis" },
      { status: error.status }
    );
  }
}
