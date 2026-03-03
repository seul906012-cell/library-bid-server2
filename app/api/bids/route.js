import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export const dynamic = "force-dynamic";

const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(d.getDate()).padStart(2, "0")}`;
}

export async function GET() {
  try {
    const today = getToday();

    const url = `https://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServcPPSSrch?
      serviceKey=${SERVICE_KEY}
      &numOfRows=30
      &pageNo=1
      &inqryDiv=1
      &inqryBgnDt=${today}
      &inqryEndDt=${today}`;

    const response = await fetch(url.replace(/\s/g, ""));
    const xml = await response.text();

    const json = await parseStringPromise(xml, {
      explicitArray: false,
    });

    const items =
      json?.response?.body?.items?.item || [];

    // ✅ 용역만 필터
    const serviceOnly = Array.isArray(items)
      ? items.filter((i) => i.bidNtceNm?.includes("용역"))
      : [];

    return NextResponse.json(serviceOnly);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
