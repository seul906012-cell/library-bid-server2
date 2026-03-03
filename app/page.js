"use client";

import React, { useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 나라장터 날짜 형식 변환 (YYYY-MM-DD → YYYYMMDD)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return parts[0] + parts[1] + parts[2];
  };

  const fetchBids = async () => {
    if (!startDate || !endDate) {
      alert("기간을 선택해주세요");
      return;
    }

    setLoading(true);

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    try {
      const res = await fetch(
        `/api/bids?start=${start}&end=${end}`
      );

      const data = await res.json();
      setBids(data);

    } catch (error) {
      console.error(error);
      alert("조회 실패");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>📚 나라장터 공고 검색</h1>

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

      {loading && <p>불러오는 중...</p>}

      {!loading && bids.length === 0 && (
        <p>검색 결과 없음</p>
      )}

      {!loading &&
        bids.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
            }}
          >
            <h3>
              {item.bidNtceNm?.[0]}
            </h3>

            <p>
              기관: {item.ntceInsttNm?.[0]}
            </p>

            <p>
              공고일: {item.bidNtceDate?.[0]}
            </p>
          </div>
        ))}
    </div>
  );
}
