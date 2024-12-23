import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";
  const pageSize = "10";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const url = "https://www.enuri.com/wide/api/listGoods.jsp";
  const encodedKeyword = encodeURIComponent(query);

  const headers = {
    authority: "www.enuri.com",
    accept: "application/json, text/javascript, */*; q=0.01",
    "accept-language": "ko,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    origin: "https://www.enuri.com",
    referer: `https://www.enuri.com/search.jsp?keyword=${encodedKeyword}`,
    "sec-ch-ua":
      '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
  };

  const data = new URLSearchParams({
    from: "search",
    device: "pc",
    category: "",
    tab: "0",
    isDelivery: "N",
    isRental: "N",
    pageNum: page,
    pageGap: pageSize,
    sort: "1",
    factory: "",
    factory_code: "",
    brand: "",
    brand_code: "",
    bf: "",
    shopcode: "",
    keyword: encodedKeyword,
    in_keyword: "",
    s_price: "0",
    e_price: "0",
    spec: "",
    spec_name: "",
    color: "",
    isReSearch: "Y",
    isTest: "N",
    prtmodelno: "",
    isMakeshop: "Y",
    discount: "",
    bbsscore: "",
    unit: "",
    decrease: "",
    benefits: "",
    card: "",
    isMatchPl: "",
    c_sort: "",
  });

  try {
    const response = await axios.post(url, data, {
      headers,
      withCredentials: true,
    });

    const { data: enuriData } = response;

    if (!enuriData?.data?.list) {
      console.error("Invalid response structure:", response.data);
      return NextResponse.json(
        { error: "Invalid response structure" },
        { status: 500 }
      );
    }

    const products = enuriData.data.list.map((item) => ({
      id: item.strModelNo,
      name: item.strModelName,
      koreanName: item.strModelName,
      brand: item.strBrand || "브랜드 정보 없음",
      image: item.strImageUrl,
      priceRange: {
        min: parseInt(item.strMinPrice.replace(/,/g, "")),
        max: parseInt(item.strMinPrice.replace(/,/g, "")),
        usedMin: null,
        usedMax: null,
        usedAverage: null,
      },
      listings: {
        new: parseInt(item.strMallCnt) || 0,
        used: 0,
      },
      priceChange: -parseInt(item.strDecreaseRate) || 0,
      spec: {
        summary: item.strSpec1,
        detail: item.strSpec2,
        accessories: item.strSpec3,
      },
      tip: item.strTip,
      delivery: item.deliveryObj,
      rating: {
        score: parseFloat(item.strBbsPoint) || 0,
        count: parseInt(item.strBbsNum) || 0,
      },
    }));

    const totalCount = parseInt(enuriData.data.total_cnt) || 0;
    const totalPages = Math.ceil(totalCount / parseInt(pageSize));

    return NextResponse.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        totalItems: totalCount,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error("Enuri API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
