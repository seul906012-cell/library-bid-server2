export async function GET() {
  const SERVICE_KEY = process.env.SERVICE_KEY;

  if (!SERVICE_KEY) {
    return new Response("SERVICE_KEY not set", { status: 500 });
  }

  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 30);

  const fmt = (d, end = false) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}${m}${day}${end ? "2359" : "0000"}`;
  };

  const url =
    `https://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch` +
    `?ServiceKey=${SERVICE_KEY}` +
    `&numOfRows=100&pageNo=1` +
    `&inqryDiv=1` +
    `&inqryBgnDt=${fmt(start)}` +
    `&inqryEndDt=${fmt(today, true)}` +
    `&dminsttCd=1371029`;

  const res = await fetch(url);
  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
