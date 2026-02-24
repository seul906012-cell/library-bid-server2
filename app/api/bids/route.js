import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const SERVICE_KEY = process.env.SERVICE_KEY;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const baseUrl =
    "https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoServcPPSSrch";

  let pageNo = 1;
  let allItems = [];
  let hasMore = true;

  while (hasMore) {
    const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&numOfRows=100&pageNo=${pageNo}&inqryDiv=1&inqryBgnDt=${start}&inqryEndDt=${end}&type=json`;

    const res = await fetch(url);
    const data = await res.json();

    const items = data?.response?.body?.items || [];
    const totalCount = data?.response?.body?.totalCount || 0;

    if (items.length === 0) {
      hasMore = false;
    } else {
      allItems = [...allItems, ...items];

      if (allItems.length >= totalCount) {
        hasMore = false;
      } else {
        pageNo++;
      }
    }
  }

  const filtered = allItems
    .filter(
      (item) =>
        item.dmndInsttCd === "1371029" ||
        item.dmndInsttCd === "9720000"
    )
    .map((item) => ({
      title: item.bidNtceNm,
      instLabel: item.dmndInsttNm,
      code: item.dmndInsttCd,
      date: item.bidNtceDt?.replace(/[-: ]/g, "").slice(0, 8),
      detailUrl: item.bidNtceUrl,
    }));

  return NextResponse.json(filtered);
}
