"use client";
<h1 style={{ color: "red" }}>
  🔥 내가 수정한 코드 맞는지 테스트
</h1>
import { useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState("2026-02-01");
  const [endDate, setEndDate] = useState("2026-02-10");
  const [bids, setBids] = useState([]);

  const formatDate = (dateStr) => {
    return dateStr.replaceAll("-", "");
  };

  const fetchBids = async () => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const res = await fetch(
      `/api/bids?start=${start}&end=${end}`
    );

    const data = await res.json();
    setBids(data);
  };

  return (
    <div style={{ padding: 20 }}>

      <h1 style={{ color: "red" }}>
        🔥 재배포 테스트
      </h1>

      <h1>나라장터 공고 검색</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <span style={{ margin: "0 10px" }}>~</span>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={fetchBids}
          style={{ marginLeft: 10 }}
        >
          검색
        </button>
      </div>

      <div>
        {bids.length === 0 && <p>검색 결과 없음</p>}

        {bids.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.instLabel}</p>
            <p>{item.date}</p>
            <a href={item.detailUrl} target="_blank">
              상세보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
