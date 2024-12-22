import { NextResponse } from "next/server";

// HTML 태그 제거 및 텍스트 정제 함수
function cleanText(text) {
  return text
    .replace(/<[^>]*>?/gm, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

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
      `https://apis.naver.com/cafe-web/cafe-search-api/v5.0/trade-search/all?recommendKeyword=true&query=${encodeURIComponent(
        query
      )}&searchOrderParamType=DEFAULT&page=1&size=50`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "ko,en-US;q=0.9,en;q=0.8",
          origin: "https://section.cafe.naver.com",
          referer: "https://section.cafe.naver.com",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-cafe-product": "mweb",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );

    if (!response.ok) throw new Error("Naver API error");
    const data = await response.json();

    // 중고 상품 형식으로 변환
    const usedItems = data.result.tradeArticleList.map((article) => {
      const item = article.item;
      return {
        id: item.articleId,
        title: cleanText(item.subject),
        price: item.productSale?.cost || null,
        platform: "joonggonara",
        condition:
          item.productSale?.productCondition === "NEW" ? "new" : "used",
        date: new Date(item.writeTime),
        url: `https://cafe.naver.com/joonggonara/${item.articleId}`,
        description: cleanText(item.content),
        image: item.thumbnailImageUrl,
        location: item.productSale?.regionList?.[0]?.regionName2 || null,
        meta: {
          cafeName: item.cafeName,
          cafeThumbnail: item.cafeThumbnailImageUrl,
          cafeUrl: `https://cafe.naver.com/${item.cafeUrl}`,
          authorNickName: item.authorNickName,
          escrow: item.productSale?.escrow || false,
          deliveryType: item.productSale?.deliveryTypeList || [],
        },
      };
    });

    return NextResponse.json({
      items: usedItems,
      meta: {
        total: data.result.totalCount,
        platform: {
          joonggonara: usedItems.length,
        },
      },
    });
  } catch (error) {
    console.error("Naver API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
