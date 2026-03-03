export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    const SERVICE_KEY = process.env.SERVICE_KEY;

    const url =
      `https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoServc` +
      `?serviceKey=${SERVICE_KEY}` +
      `&pageNo=1` +
      `&numOfRows=20` +
      `&type=xml`;

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
