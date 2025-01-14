import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const modelno = searchParams.get("modelno");

  if (!modelno) {
    return NextResponse.json(
      { error: "Model number is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://m.enuri.com/m/vip.jsp?modelno=${modelno}&delivery=N`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    const html = response.data;
    console.log("html데이터", html);
    const $ = cheerio.load(html);

    // JSON-LD 데이터 추출 (더 정확한 정보를 위해)
    const jsonLd = JSON.parse(
      $('script[type="application/ld+json"]').html() || "{}"
    );

    const data = {
      name: jsonLd.name || $('meta[property="og:title"]').attr("content"),
      brand:
        jsonLd.brand?.name ||
        $('meta[property="og:title"]').attr("content").split(" ")[0],
      image:
        jsonLd.image?.[0] || $('meta[property="og:image"]').attr("content"),
      description:
        jsonLd.description ||
        $('meta[property="og:description"]').attr("content"),
      price: {
        low: parseInt(jsonLd.offers?.lowPrice || "0", 10),
        high: parseInt(jsonLd.offers?.highPrice || "0", 10),
      },
      rating: {
        value: parseFloat(jsonLd.aggregateRating?.ratingValue || "0"),
        count: parseInt(jsonLd.aggregateRating?.reviewCount || "0", 10),
      },
      sku: jsonLd.sku,
      modelNo: modelno,
    };
    console.log("개별상품 데이터", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product info:", error);
    return NextResponse.json(
      { error: "Failed to fetch product info" },
      { status: 500 }
    );
  }
}
