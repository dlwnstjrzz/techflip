import { NextResponse } from "next/server";

export async function POST() {
  const api_url =
    "https://datalab.naver.com/shoppingInsight/getCategoryKeywordRank.naver";

  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        origin: "https://datalab.naver.com",
        referer: "https://datalab.naver.com/shoppingInsight/sCategory.naver",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
      },
      body: new URLSearchParams({
        cid: "50000003", // 디지털/가전 카테고리
        timeUnit: "date",
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10), // YYYY-MM-DD 형식
        endDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 형식
        age: "",
        gender: "",
        device: "",
        page: 1,
        count: 20,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // 데이터 구조 변환
    const results = data.ranks
      .slice(0, 10) // 상위 10개 선택
      .map((item) => ({
        title: item.keyword,
        rank: item.rank,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Naver Shopping Insight API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 }
    );
  }
}
