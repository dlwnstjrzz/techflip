import { NextResponse } from "next/server";

// 상품 상태 변환 함수
function getCondition(status) {
  switch (status) {
    case "새상품":
      return "new";
    default:
      return "used";
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log("query", query);
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.bunjang.co.kr/api/1/find_v2.json?order=score&n=96&page=0&req_ref=search&q=${encodeURIComponent(
        query
      )}&stat_device=w&version=5`,
      {
        headers: {
          Origin: "https://m.bunjang.co.kr",
          Referer: "https://m.bunjang.co.kr/",
          Priority: "u=1, i",
        },
      }
    );

    const data = await response.json();

    // 번개장터 데이터를 우리 서비스 형식으로 변환
    const usedItems = data.list.map((item) => ({
      ad: item.ad,
      id: item.pid,
      title: item.name,
      price: item.price,
      platform: "bunjang",
      condition: getCondition(item.status),
      date: new Date(item.update_time * 1000),
      url: `https://m.bunjang.co.kr/products/${item.pid}`,
      description: item.description || "",
      image: item.product_image,
      location: item.location,
      meta: {
        status: item.status,
        user: {
          id: item.seller_id,
          name: item.seller_name,
          verified: item.seller_verified,
        },
      },
    }));

    return NextResponse.json({
      items: usedItems,
      meta: {
        total: data.num_found,
        platform: {
          bunjang: usedItems.length,
        },
      },
    });
  } catch (error) {
    console.error("Bunjang API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
