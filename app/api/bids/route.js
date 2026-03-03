import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const SERVICE_KEY = process.env.SERVICE_KEY;

    const url = `https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoServc?serviceKey=${SERVICE_KEY}&inqryDiv=1&inqryBgnDt=${start}&inqryEndDt=${end}&pageNo=1&numOfRows=10&type=xml`;

    const response = await fetch(url);
    const xml = await response.text();

    // 🔥 원본 XML 그대로 반환해서 확인
    return new Response(xml, {
      headers: { "Content-Type": "text/xml" },
    });

  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
