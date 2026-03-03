import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const SERVICE_KEY = process.env.SERVICE_KEY;

    if (!SERVICE_KEY) {
      throw new Error("SERVICE_KEY 없음");
    }

    if (!start || !end) {
      throw new Error("start 또는 end 날짜가 없음");
    }

    const url = `https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoThng?serviceKey=${SERVICE_KEY}&inqryDiv=1&inqryBgnDt=${start}&inqryEndDt=${end}&pageNo=1&numOfRows=50&type=xml`;

    const response = await fetch(url);
    const xml = await response.text();

    const result = await parseStringPromise(xml);

    const items =
      result?.response?.body?.[0]?.items?.[0]?.item || [];

    return NextResponse.json(items);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
