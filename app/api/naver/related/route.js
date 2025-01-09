import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

// Signature 생성 함수
function generateSignature(timestamp, method, uri, secretKey) {
  const message = `${timestamp}.${method}.${uri}`;
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}

// 헤더 생성 함수
function getHeaders(method, uri) {
  const timestamp = new Date().getTime().toString();
  const API_KEY = process.env.NAVER_API_KEY;
  const SECRET_KEY = process.env.NAVER_SECRET_KEY;
  const CUSTOMER_ID = process.env.NAVER_CUSTOMER_ID;

  const signature = generateSignature(timestamp, method, uri, SECRET_KEY);

  return {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Timestamp": timestamp,
    "X-API-KEY": API_KEY,
    "X-Customer": CUSTOMER_ID,
    "X-Signature": signature,
  };
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

  const BASE_URL = "https://api.naver.com";
  const uri = "/keywordstool";
  const method = "GET";

  try {
    const response = await fetch(
      `${BASE_URL}${uri}?hintKeywords=${encodeURIComponent(
        query.replace(/\s+/g, "").toUpperCase()
      )}&showDetail=1`,
      {
        method,
        headers: getHeaders(method, uri),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const suggestions = data.keywordList
      .filter((keyword) =>
        keyword.relKeyword
          .toLowerCase()
          .startsWith(query.replace(/\s+/g, "").toLowerCase())
      )
      .slice(0, 10)
      .map((keyword) => ({
        id: keyword.relKeyword,
        text: keyword.relKeyword,
        monthlyPcQcCnt: keyword.monthlyPcQcCnt,
        monthlyMobileQcCnt: keyword.monthlyMobileQcCnt,
        type: "related",
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
