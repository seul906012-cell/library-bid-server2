"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  RefreshCw,
  ExternalLink,
  Calendar,
} from "lucide-react";

const formatDate = (date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};

const getRange = (type) => {
  const end = new Date();
  let start = new Date();

  if (type === "7") start.setDate(end.getDate() - 7);
  if (type === "14") start.setDate(end.getDate() - 14);
  if (type === "30") start.setDate(end.getDate() - 30);

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};

export default function App() {
  const [bids, setBids] = useState([]);
  const [rangeType, setRangeType] = useState("30");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (start, end) => {
    setLoading(true);
    const res = await fetch(
      `/api/bids?start=${start}&end=${end}`
    );
    const data = await res.json();
    setBids(data);
    setLoading(false);
  };

  useEffect(() => {
    const { start, end } = getRange("30");
    fetchData(start, end);
  }, []);

  const handleRangeChange = (type) => {
    setRangeType(type);

    if (type !== "custom") {
      const { start, end } = getRange(type);
      fetchData(start, end);
    }
  };

  const handleCustomSearch = () => {
    if (!customStart || !customEnd) return;

    fetchData(
      customStart.replace(/-/g, ""),
      customEnd.replace(/-/g, "")
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <h1 className="font-bold text-lg">
          국립중앙도서관 · 국회도서관 공고 정보
        </h1>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* 🔥 기간 선택 UI */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
          <button onClick={() => handleRangeChange("7")}>최근 7일</button>
          <button onClick={() => handleRangeChange("14")}>최근 2주</button>
          <button onClick={() => handleRangeChange("30")}>최근 1개월</button>
          <button onClick={() => setRangeType("custom")}>날짜 지정</button>

          {rangeType === "custom" && (
            <>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
              <button
                onClick={handleCustomSearch}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                검색
              </button>
            </>
          )}
        </div>

        {/* 🔥 리스트 */}
        <div className="grid gap-4">
          {loading && <div>불러오는 중...</div>}

          {bids.map((b, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <div className="font-bold">{b.title}</div>
              <div className="text-sm text-gray-600">
                {b.instLabel} | {b.date}
              </div>
              <a
                href={b.detailUrl}
                target="_blank"
                className="text-blue-600"
              >
                공고문 보기
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
