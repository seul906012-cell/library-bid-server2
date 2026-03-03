export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
      return NextResponse.json([]);
    }

    const SERVICE_KEY = process.env.SERVICE_KEY;

    // 🔥 inqryDiv=2 로 변경
    const url = `https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoServc?serviceKey=${SERVICE_KEY}&inqryDiv=2&inqryBgnDt=${start}&inqryEndDt=${end}&pageNo=1&numOfRows=50&type=xml`;

    const response = await fetch(url);
    const xml = await response.text();

    const result = await parseStringPromise(xml);

    const items =
      result?.response?.body?.[0]?.items?.[0]?.item || [];

    return NextResponse.json(items);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}
