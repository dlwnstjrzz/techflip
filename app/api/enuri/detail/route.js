import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const modelno = searchParams.get("modelno");

  if (!modelno) {
    return NextResponse.json(
      { error: "Model number is required" },
      { status: 400 }
    );
  }

  const url = "https://www.enuri.com/wide/api/product/prodShopPrice.jsp";

  const headers = {
    authority: "www.enuri.com",
    accept: "application/json, text/javascript, */*; q=0.01",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    origin: "https://www.enuri.com",
    referer: `https://www.enuri.com/detail.jsp?modelno=${modelno}`,
  };

  const data = new URLSearchParams({
    modelno,
    delivery: "Y",
    card: "N",
    prono: "",
    callcnt: "0",
  });

  try {
    const response = await axios.post(url, data, { headers });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Enuri Detail API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
