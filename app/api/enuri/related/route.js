import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.enuri.com/search/ajax/AjaxAutoMake.jsp?_q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept: "application/json, text/javascript, */*; q=0.01",
          Referer: "https://www.enuri.com/",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const suggestions = data.auto
      .filter((item) => item.type === "W" || item.type === "H") // 연관검색어와 최근검색어만 필터링
      .map((item) => ({
        id: item.keyword,
        text: item.keyword,
        type: item.type === "H" ? "history" : "related", // 타입 구분
        date: item.keywordDate || null, // 최근검색어의 경우 날짜 포함
        isPopular: item.popular_yn === "Y", // 인기검색어 여부
      }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Related search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch related searches" },
      { status: 500 }
    );
  }
}
