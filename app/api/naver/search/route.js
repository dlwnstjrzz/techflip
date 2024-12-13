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
      `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    if (!response.ok) throw new Error("Naver API error");
    const data = await response.json();

    // 네이버 데이터를 우리 앱의 형식으로 변환
    const products = data.items.map((item) => ({
      id: item.productId,
      name: item.title.replace(/<[^>]*>?/gm, ""),
      koreanName: item.title.replace(/<[^>]*>?/gm, ""),
      brand: item.brand || "브랜드 정보 없음",
      image: item.image,
      priceRange: {
        min: parseInt(item.lprice),
        max: parseInt(item.hprice) || parseInt(item.lprice),
        usedMin: null,
        usedMax: null,
        usedAverage: null,
      },
      listings: {
        new: 15,
        used: 370,
      },
      priceChange: -5, // 임시 데이터
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Naver API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
