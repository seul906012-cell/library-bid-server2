export const dynamic = "force-dynamic";

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

    const result = await parseStringPromise(xml);

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
