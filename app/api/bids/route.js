export async function GET() {
  const SERVICE_KEY = process.env.SERVICE_KEY;

  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 30);

  const fmt = (d, end = false) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}${m}${day}${end ? "2359" : "0000"}`;
  };

  const base =
    `https://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoServcPPSSrch` +
    `?ServiceKey=${SERVICE_KEY}` +
    `&numOfRows=100&pageNo=1` +
    `&inqryDiv=1` +
    `&inqryBgnDt=${fmt(start)}` +
    `&inqryEndDt=${fmt(today, true)}`;

  const 기관목록 = [
    { code: "1371029", label: "국립중앙도서관" },
    { code: "9720000", label: "국회도서관" }
  ];

  let result = [];

  for (const 기관 of 기관목록) {
    const r = await fetch(`${base}&dminsttCd=${기관.code}`);
    const xml = await r.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    for (const item of items) {
      const get = (tag) => {
        const m = item[1].match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
        return m ? m[1] : "";
      };

      result.push({
        code: 기관.code,
        instLabel: 기관.label,
        title: get("bidNtceNm"),
        date: get("bidNtceDt"),
        detailUrl: get("bidNtceDtlUrl"), // 🔥 공식 상세 URL 사용
      });
    }
  }

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
