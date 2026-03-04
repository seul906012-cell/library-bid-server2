"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  RefreshCw,
  ExternalLink,
  Calendar,
  Library,
  Landmark,
} from "lucide-react";

const formatDate = (date) =>
  date.toISOString().slice(0, 10).replace(/-/g, "");

const getRange = (days) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};

export default function App() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rangeType, setRangeType] = useState("30");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const fetchData = async (start, end) => {
    setLoading(true);
    const res = await fetch(`/api/bids?start=${start}&end=${end}`);
    const data = await res.json();
    setBids(data);
    setLoading(false);
  };

  useEffect(() => {
    const { start, end } = getRange(30);
    fetchData(start, end);
  }, []);

  const handleRange = (days) => {
    setRangeType(days);
    const { start, end } = getRange(parseInt(days));
    fetchData(start, end);
  };

  const handleCustomSearch = () => {
    if (!customStart || !customEnd) return;
    fetchData(
      customStart.replace(/-/g, ""),
      customEnd.replace(/-/g, "")
    );
  };

  const nationalCount = bids.filter((b) => b.code === "1371029").length;
  const assemblyCount = bids.filter((b) => b.code === "9720000").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen />
          <h1 className="font-bold text-lg">
            국립중앙도서관 · 국회도서관 공고 정보
          </h1>
        </div>

        <RefreshCw
          onClick={() => {
            const { start, end } =
              rangeType === "custom"
                ? {
                    start: customStart.replace(/-/g, ""),
                    end: customEnd.replace(/-/g, ""),
                  }
                : getRange(parseInt(rangeType));
            fetchData(start, end);
          }}
          className={`cursor-pointer ${
            loading ? "animate-spin" : ""
          }`}
        />
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* 🔥 기간 선택 */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3 items-center">
          <button onClick={() => handleRange("7")} className="px-3 py-1 bg-blue-100 rounded">
            최근 7일
          </button>
          <button onClick={() => handleRange("14")} className="px-3 py-1 bg-blue-100 rounded">
            최근 2주
          </button>
          <button onClick={() => handleRange("30")} className="px-3 py-1 bg-blue-100 rounded">
            최근 1개월
          </button>
          <button onClick={() => setRangeType("custom")} className="px-3 py-1 bg-blue-100 rounded">
            날짜 지정
          </button>

          {rangeType === "custom" && (
            <>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={handleCustomSearch}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                검색
              </button>
            </>
          )}
        </div>

        {/* 🔥 통계 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="전체 공고" value={bids.length} />
          <StatCard title="국립중앙도서관" value={nationalCount} icon={<Library />} />
          <StatCard title="국회도서관" value={assemblyCount} icon={<Landmark />} />
        </div>

        {/* 🔥 리스트 */}
        <div className="grid gap-4">
          {loading && <div>불러오는 중...</div>}

          {bids.map((b, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow">
              <div className="font-bold">{b.title}</div>
              <div className="text-sm text-gray-600">
                {b.instLabel} | {b.date}
              </div>
              <a
                href={b.detailUrl}
                target="_blank"
                className="text-blue-600 flex items-center gap-1 mt-2"
              >
                공고문 보기 <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold text-blue-600">{value}</div>
      </div>
      {icon}
    </div>
  );
}
